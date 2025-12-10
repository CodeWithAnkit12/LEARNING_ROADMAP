import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  taskId: string;
};

// ✅ PATCH update task
export async function PATCH(
  req: Request,
  context: { params: Promise<Params> }
) {
  try {
    const { taskId } = await context.params;
    const body = await req.json();

    const task = await prisma.task.update({
      where: { id: taskId },
      data: body,
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// ✅ DELETE task
export async function DELETE(
  _req: Request,
  context: { params: Promise<Params> }
) {
  try {
    const { taskId } = await context.params;

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
