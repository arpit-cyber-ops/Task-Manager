"use client"

import { completeTask } from "@/app/workspaces/actions/taskAction"

export default function TaskCheckbox({taskId, completed}: {taskId: string, completed: boolean}) {
    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        await completeTask(taskId, e.target.checked)
    }
    return (
        <input type="checkbox" checked={completed} onChange={handleChange} className="size-4 shrink-0 cursor-pointer accent-primary"/>
    )
} 
