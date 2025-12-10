import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  goalId: string;
};

// ✅ GET tasks for a goal
export async function GET(
  _req: Request,
  context: { params: Promise<Params> }
) {
  const { goalId } = await context.params;

  const tasks = await prisma.task.findMany({
    where: { goalId },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(tasks);
}

// ✅ CREATE task
export async function POST(
  req: Request,
  context: { params: Promise<Params> }
) {
  const { goalId } = await context.params;
  const body = await req.json();

  if (!body.title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: {
      title: body.title,
      goalId,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
