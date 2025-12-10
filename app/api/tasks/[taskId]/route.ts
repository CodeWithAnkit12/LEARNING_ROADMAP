import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ PATCH update task
export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const body = await req.json();

    const task = await prisma.task.update({
      where: { id: params.taskId },
      data: body,
    });

    return NextResponse.json(task);
  } catch {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// ✅ DELETE task
export async function DELETE(
  _req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    await prisma.task.delete({
      where: { id: params.taskId },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
