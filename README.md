# 📚 Learning Roadmap Manager

A full-stack web application that helps users plan, track, and manage their learning goals by breaking them into actionable tasks.

Built as part of a full-stack developer assignment using modern web technologies and clean architecture.

---

## 🚀 Features

- ✅ Create learning goals
- ✅ View all goals in one place
- ✅ View goal details on a separate page
- ✅ Add tasks under a goal
- ✅ Mark tasks as completed
- ✅ Persistent data storage using PostgreSQL
- ✅ Clean and responsive UI

---

## 🛠 Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Backend
- **Next.js API Routes**
- **Prisma ORM**

### Database
- **PostgreSQL**

---

## 🗂 Database Design

### User
- `id`
- `name`
- `email`

### Goal
- `id`
- `title`
- `description`
- `status`
- `userId` (FK → User)

### Task
- `id`
- `title`
- `status`
- `goalId` (FK → Goal)

**Relationships**
- One User → Many Goals
- One Goal → Many Tasks

---

## 🔌 API Endpoints

### Goals
- `GET /api/goals` → Fetch all goals
- `POST /api/goals` → Create a new goal

### Tasks
- `GET /api/goals/:goalId/tasks` → Get tasks for a goal
- `POST /api/goals/:goalId/tasks` → Create a task
- `PATCH /api/tasks/:taskId` → Update task status
- `DELETE /api/tasks/:taskId` → Delete a task

---

## 🧭 Application Routes

- `/goals` → List & create learning goals
- `/goals/[goalId]` → Goal details with tasks

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd learning-roadmap
