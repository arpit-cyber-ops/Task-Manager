import type { Task } from "@/types/Task"
import TaskItem from "./Task-Item"

export default function TaskList({ tasks }: { tasks: Task[] }) {
    return (
        <div className="flex flex-col w-290 border rounded-sm border-t-0">
            {tasks.map(task => (
                <TaskItem task={task} key={task.id} />
            ))}
        </div>
    )
}
