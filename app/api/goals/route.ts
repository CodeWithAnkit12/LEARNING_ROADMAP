import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/goals
export async function GET() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(goals);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}

// ✅ POST /api/goals
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, userId, targetDate } = body;

    if (!title || !userId) {
      return NextResponse.json(
        { error: "Title and userId are required" },
        { status: 400 }
      );
    }

    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        userId,
        targetDate: targetDate ? new Date(targetDate) : null,
      },
    });

    return NextResponse.json(goal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create goal" },
      { status: 500 }
    );
  }
}
