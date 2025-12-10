import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET tasks for a goal
export async function GET(
  _req: Request,
  { params }: { params: { goalId: string } }
) {
  try {
    const tasks = await prisma.task.findMany({
      where: { goalId: params.goalId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// ✅ POST create task
export async function POST(
  req: Request,
  { params }: { params: { goalId: string } }
) {
  try {
    const body = await req.json();
    const { title, description, difficulty, dueDate } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Task title required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        difficulty,
        dueDate: dueDate ? new Date(dueDate) : null,
        goalId: params.goalId,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
