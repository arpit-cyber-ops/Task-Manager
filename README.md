# Task Manager

A collaborative task management app where users can create workspaces, invite members, and work together on tasks.

I built this project to get more comfortable with Next.js App Router and to practice building a full-stack application with authentication, authorization, database operations, Server Actions, and role-based access control.

## Live Demo

[View the live application](https://task-manager-three-omega-27.vercel.app/)

## What can you do?

### Workspaces

- Create, rename, and delete workspaces
- See how many tasks and members each workspace has
- Owners can rename and delete workspaces
- Members can leave a workspace

### Members

- Invite existing users to a workspace
- View workspace members
- Owners can remove members
- Different permissions for workspace owners and members

### Tasks

- Create tasks
- Rename tasks
- Delete tasks
- Mark tasks as completed
- See when tasks were created or updated

### Other

- Authentication with Clerk
- Responsive layout
- Loading states
- Empty states
- Error handling
- Dynamic page titles based on the current workspace
- Keyboard-accessible interactions

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Clerk
- Prisma
- PostgreSQL
- Neon
- Zod

## How it works

The application uses the Next.js App Router with a server-first approach.

Most of the data fetching is done in Server Components. Client Components are used where interactivity is actually needed, such as forms, dialogs, dropdown menus, and the task completion checkbox.

Database mutations are handled using Next.js Server Actions. The actions validate their input with Zod and perform authentication and authorization checks on the server before making changes to the database.

The application has two workspace roles:

- **OWNER** — Can manage the workspace and its members.
- **MEMBER** — Can access the workspace and work with its tasks.

The UI hides actions that a user doesn't have permission to use, but the actual permission checks are performed on the server as well.

## Project Structure

```text
app/
├── sign-in/
├── sign-up/
├── workspaces/
│   ├── [workspaceId]/
│   │   ├── members/
│   │   └── tasks/
│   ├── actions.ts
│   └── page.tsx
├── error.tsx
├── not-found.tsx
└── layout.tsx

components/
├── members/
├── tasks/
├── ui/
└── workspace/

lib/
├── prisma.ts
├── workspace.ts
└── validations/

types/
├── Task.ts
└── workspace.ts

prisma/
└── schema.prisma
```

## Running Locally

### Prerequisites

You'll need:

- Node.js
- npm
- A PostgreSQL database
- A Clerk application

### 1. Clone the repository

```bash
git clone https://github.com/arpit-cyber-ops/Task-Manager.git
cd Task-Manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="your_postgresql_connection_string"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
```

Use your own database and Clerk credentials. Never commit your `.env` file.

### 4. Set up the database

Generate the Prisma client:

```bash
npx prisma generate
```

Apply the database migrations:

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the application in production mode.

```bash
npm run lint
```

Runs ESLint.

## Future Improvements

Some things I'd like to explore in future versions:

- Task search
- Categories or tags
- Task filtering
- More advanced task organization
- Optimistic task updates

## About the Project

This is a personal learning and portfolio project. The main goal was to go beyond simply building CRUD features and understand how the different parts of a modern Next.js application fit together — from authentication and database access to Server Components, Server Actions, validation, authorization, and route-level loading and error handling.