import type { Task } from "@/types/Task";
import TaskActions from "./Task-Actions";
import TaskCheckbox from "./Task-Checkbox";

export default function TaskItem({ task }: { task: Task }) {
    return (
        <div className="group flex min-w-0 items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-muted/40">
            <TaskCheckbox
                taskId={task.id}
                completed={task.completed}
            />

            <p
                className={`min-w-0 flex-1 truncate text-sm font-medium ${task.completed
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                title={task.title}
            >
                {task.title}
            </p>

            <TaskActions
                taskId={task.id}
                title={task.title}
            />
        </div>
    )
}

