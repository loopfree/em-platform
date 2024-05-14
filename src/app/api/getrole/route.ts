import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    if (decoded !== null) {
      return NextResponse.json({
        role: (decoded as JwtPayload).role,
        id: (decoded as JwtPayload).id,
      });
    } else {
      return NextResponse.json({
        role: null,
        id: null,
      });
    }
  } catch {
    return NextResponse.json({
      role: null,
      id: null,
    });
  }
}
