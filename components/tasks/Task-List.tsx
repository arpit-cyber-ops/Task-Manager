import type { Task } from "@/types/Task"
import TaskItem from "./Task-Item"

export default function TaskList({ tasks }: { tasks: Task[] }) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            {tasks.length > 0 ?

                tasks.map(task => (
                    <TaskItem task={task} key={task.id} />
                ))
                : 
                <div className="flex flex-col gap-2 items-center text-center text-xl text-muted-foreground p-4">
                <p>No tasks yet.</p>
                <p>Create your first task to get started.</p>
                </div>
            }
        </div>
    )
}
