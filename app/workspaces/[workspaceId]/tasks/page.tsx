import CreateTaskDialog from "@/components/Create-Task-Dialog";
import TaskList from "@/components/Task-List";
import prisma from "@/lib/prisma";

export default async function Tasks({params}: {params: Promise<{workspaceId: string}>}) {
    
    const {workspaceId} = await params;

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
        <div>
            <div className="flex justify-between py-4 items-center w-295">
                <h2 className="text-3xl">Task List</h2>
                <CreateTaskDialog workspaceId={workspaceId}/>
            </div>
            
            <TaskList tasks={tasks}/>
        </div>
    )
}