import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
/**
 * {Parameters}
 * Event Organizer id (int)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const mostSoldEvent = ["-", "-", "-"];

  const events = await prisma.event.findMany({
    where: {
      organizer_id: parseInt(id),
      date: {
        lt: new Date(),
      },
    },
    select: {
      name: true,
      seat: true,
    },
    orderBy: {
      seat: "desc",
    },
  });

  let idx = 0;

  for (const event of events) {
    mostSoldEvent[idx] = event.name + " - " + event.seat + " ticket sold";
    idx += 1;
    if (idx == 3) {
      break;
    }
  }

  return NextResponse.json(
    {
      status: "succeed",
      events: mostSoldEvent,
    },
    {
      status: 200,
    }
  );
}
