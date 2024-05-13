import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: "wkwkw",
    },
    {
      status: 200,
    }
  );
}
