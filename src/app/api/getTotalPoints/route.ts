import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { id } = await req.json();

  try {
    const totalPoints = await prisma.points.findMany({
      where: {
        user_id: id,
      },
      select: {
        point: true,
      },
    });

    const userTotalPoints = totalPoints.reduce(
      (sum, point) => sum + point.point,
      0
    );

    return NextResponse.json({ totalPoints: userTotalPoints }, { status: 200 });
  } catch (e) {
    console.log(error);

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
