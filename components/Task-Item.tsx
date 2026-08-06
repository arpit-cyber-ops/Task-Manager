import type { Task } from "@/types/Task";
import TaskActions from "./Task-Actions";
import TaskCheckbox from "./Task-Checkbox";

export default function TaskItem({ task }: { task: Task }) {
    return (
        <div className="flex gap-4 border-t rounded-md p-4">
            <TaskCheckbox taskId={task.id} completed={task.completed}/>
            <p>{task.title}</p>
            <TaskActions taskId={task.id} title={task.title}/>
        </div>
    )
}

