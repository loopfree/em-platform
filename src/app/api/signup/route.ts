import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const crypto = require("crypto");

// have a chance to collide but if the input is < sqrt(16^8), the odds of collision are very low
function generateReferralCode(email: string) {
  return crypto.createHash("sha256").update(email).digest("hex").slice(0, 8);
}

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password, referralCode } = await req.json();

  const checkUniqueEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (checkUniqueEmail) {
    return NextResponse.json(
      {
        status: "failed",
        message: "This email has been used",
      },
      {
        status: 409,
      }
    );
  }

  if (referralCode !== "") {
    try {
      const findReferrer = await prisma.user.findFirst({
        where: {
          referral_code: referralCode,
        },
        select: {
          id: true,
        },
      });

      if (findReferrer === null) {
        return NextResponse.json(
          {
            status: "failed",
            message: "Referral Code Invalid",
          },
          {
            status: 404,
          }
        );
      }

      const expiredDate = new Date();
      expiredDate.setMonth(expiredDate.getMonth() + 3);
      expiredDate.setHours(0, 0, 0, 0);

      await prisma.$transaction(async (prisma) => {
        const createPointResult = await prisma.points.create({
          data: {
            user_id: findReferrer!.id,
            point: 10000,
            expired_date: expiredDate,
          },
        });

        const createUserResult = await prisma.user.create({
          data: {
            email: email,
            password: password,
            role: "Customer",
            referral_code: generateReferralCode(email),
            referred_by: findReferrer!.id,
            expired_date: expiredDate,
          },
        });
      });
    } catch (e) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Server Error",
        },
        {
          status: 401,
        }
      );
    }
  } else {
    await prisma.user.create({
      data: {
        email: email,
        password: password,
        role: "Customer",
        referral_code: generateReferralCode(email),
        referred_by: null,
      },
    });
  }

  return NextResponse.json(
    {
      status: "succeed",
      message: "account created",
    },
    {
      status: 201,
    }
  );
}
