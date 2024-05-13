import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import verifyjwt from "@/util/verifyjwt";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const decoded = verifyjwt(token, process.env.JWT_KEY as string);

  return NextResponse.json(
    {
      message: "Succeed",
      decoded: decoded,
    },
    {
      status: 200,
    }
  );
}
