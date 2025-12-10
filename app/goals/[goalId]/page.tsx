"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Task = {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
};

type Goal = {
  id: string;
  title: string;
  description?: string | null;
};

export default function GoalDetailsPage() {
  const { goalId } = useParams<{ goalId: string }>();

  const [goal, setGoal] = useState<Goal | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch goal + tasks
  async function fetchData() {
    setLoading(true);

    const goalsRes = await fetch("/api/goals");
    const allGoals = await goalsRes.json();
    const currentGoal = allGoals.find(
      (g: Goal) => g.id === goalId
    );

    const tasksRes = await fetch(
      `/api/goals/${goalId}/tasks`
    );

    setGoal(currentGoal || null);
    setTasks(await tasksRes.json());
    setLoading(false);
  }

  useEffect(() => {
    if (goalId) fetchData();
  }, [goalId]);

  // ✅ Create task
  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    await fetch(`/api/goals/${goalId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskTitle }),
    });

    setTaskTitle("");
    fetchData();
  }

  // ✅ Mark task as DONE
  async function markDone(taskId: string) {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "DONE" }),
    });

    fetchData();
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (!goal) return <p className="p-6">Goal not found</p>;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">{goal.title}</h1>

        {goal.description && (
          <p className="text-slate-400 mt-2">
            {goal.description}
          </p>
        )}

        {/* ✅ Add Task */}
        <form
          onSubmit={handleCreateTask}
          className="mt-6 flex gap-2"
        >
          <input
            className="flex-1 p-2 rounded bg-slate-900 border border-slate-700"
            placeholder="New task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <button
            type="submit"
            className="px-4 bg-blue-600 rounded hover:bg-blue-500"
          >
            Add
          </button>
        </form>

        {/* ✅ Tasks list */}
        <ul className="mt-6 space-y-3">
          {tasks.length === 0 && (
            <p className="text-slate-400">No tasks yet</p>
          )}

          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-3 border border-slate-800 rounded flex justify-between items-center"
            >
              <div>
                <p
                  className={`font-medium ${
                    task.status === "DONE"
                      ? "line-through text-slate-500"
                      : ""
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-sm text-slate-500">
                  Status: {task.status}
                </p>
              </div>

              {task.status !== "DONE" && (
                <button
                  onClick={() => markDone(task.id)}
                  className="text-sm px-3 py-1 bg-green-600 rounded hover:bg-green-500"
                >
                  Mark Done
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

