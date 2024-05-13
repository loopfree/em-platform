import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // based GMT, bukan GMT+7

    console.log(today);
    const deletedPoints = await prisma.points.deleteMany({
      where: {
        expired_date: {
          lt: today,
        },
      },
    });

    return NextResponse.json(
      {
        message: `${deletedPoints.count} people point expired and deleted`,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
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
}
