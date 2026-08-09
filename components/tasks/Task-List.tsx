import type { Task } from "@/types/Task"
import TaskItem from "./Task-Item"

export default function TaskList({ tasks }: { tasks: Task[] }) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            {tasks.map(task => (
                <TaskItem task={task} key={task.id} />
            ))}
        </div>
    )
}
