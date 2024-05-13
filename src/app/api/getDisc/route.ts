import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { id } = await req.json();

  try {
    const checkUserReferrer = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        referred_by: true,
      },
    });

    if (checkUserReferrer !== null) {
      if (checkUserReferrer.referred_by !== null) {
        return NextResponse.json(
          {
            status: "succeed",
            message: "Able to get 10% disc",
            discount: true,
          },
          {
            status: 201,
          }
        );
      }
    }

    return NextResponse.json(
      {
        status: "succeed",
        message: "Unable to get 10% disc",
        discount: false,
      },
      {
        status: 201,
      }
    );
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      {
        status: "failed",
        message: "Server Error",
        discount: false,
      },
      {
        status: 401,
      }
    );
  }
}
