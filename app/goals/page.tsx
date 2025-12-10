"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Goal = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ⚠️ IMPORTANT: replace with real userId from Prisma Studio
  const TEST_USER_ID = "1";

  // ✅ Fetch goals
  async function fetchGoals() {
    setLoading(true);
    const res = await fetch("/api/goals");
    const data = await res.json();
    setGoals(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGoals();
  }, []);

  // ✅ Create new goal
  async function handleCreateGoal(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        userId: TEST_USER_ID,
      }),
    });

    setTitle("");
    setDescription("");
    fetchGoals();
  }

  if (loading) {
    return <p className="p-6 text-slate-400">Loading goals...</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Learning Goals</h1>

        {/* ✅ Create Goal Form */}
        <form
          onSubmit={handleCreateGoal}
          className="mb-8 p-4 border border-slate-800 rounded-lg space-y-3"
        >
          <input
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
            placeholder="Goal title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
          >
            Add Goal
          </button>
        </form>

        {/* ✅ Goals List */}
        {goals.length === 0 ? (
          <p className="text-slate-400">No goals created yet.</p>
        ) : (
          <ul className="space-y-3">
            {goals.map((goal) => (
              <li
                key={goal.id}
                className="p-4 border border-slate-800 rounded-lg hover:bg-slate-900"
              >
                {/* ✅ LINK TO GOAL DETAILS PAGE */}
                <Link href={`/goals/${goal.id}`}>
                  <h2 className="font-semibold text-lg hover:underline cursor-pointer">
                    {goal.title}
                  </h2>
                </Link>

                {goal.description && (
                  <p className="text-slate-400 mt-1">
                    {goal.description}
                  </p>
                )}

                <p className="text-sm mt-2 text-slate-500">
                  Status: {goal.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
