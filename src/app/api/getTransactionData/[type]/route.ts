import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { type: string } }
) {
  const { type } = params;
  let transactionData;
  try {
    transactionData = await prisma.transactionData.findMany({
      where: {
        type: type,
      },
      select: {
        id: true,
        count: true,
      },
    });

    if (type == "year") {
      transactionData.sort((a, b) => {
        if (a.id < b.id) {
          return 1;
        } else if (a.id > b.id) {
          return -1;
        } else {
          return 0;
        }
      });

      transactionData = transactionData.slice(0, 3);
    }
  } catch (e) {
    return NextResponse.json(
      {
        status: "failed",
        message: e,
        transactionData: null,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      status: "succeed",
      message: "successfully obtained transaction data",
      transactionData: transactionData,
    },
    {
      status: 200,
    }
  );
}
