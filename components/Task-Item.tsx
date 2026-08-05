import type { Task } from "@/types/Task";
import TaskActions from "./Task-Actions";

export default function TaskItem({ task }: { task: Task }) {
    return (
        <div className="flex gap-4 border-t rounded-md p-4">
            <input type="checkbox" />
            <p>{task.title}</p>
            <TaskActions />
        </div>
    )
}
