import CreateTaskDialog from "@/components/tasks/Create-Task-Dialog";
import TaskList from "@/components/tasks/Task-List";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tasks",
};

export default async function Tasks({ params }: { params: Promise<{ workspaceId: string }> }) {

    const { workspaceId } = await params;

    const tasks = await prisma.task.findMany({
        where: {
            workspaceId,
        },
        select: {
            id: true,
            title: true,
            completed: true,
            updatedAt: true,
        },
    });

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Tasks</h2>
                <CreateTaskDialog workspaceId={workspaceId} />
            </div>

            <TaskList tasks={tasks} />
        </div>
    )
}