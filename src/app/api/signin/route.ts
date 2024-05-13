import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        status: "error",
        message: "Both email and password are required",
      },
      {
        status: 400,
      }
    );
  }

  let token: string = "";
  let role: string = "";

  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (checkUser === null) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid Credentials",
        },
        {
          status: 401,
        }
      );
    }

    role = checkUser.role!;

    token = jwt.sign(
      {
        id: checkUser.id,
        role: checkUser.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: "4h",
      }
    );
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json(
    {
      status: "success",
      message: "Login Success",
      token: token,
      role: role,
    },
    {
      status: 200,
    }
  );
}
