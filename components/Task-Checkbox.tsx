"use client"

import { completeTask } from "@/app/workspaces/actions"

export default function TaskCheckbox({taskId, completed}: {taskId: string, completed: boolean}) {
    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        await completeTask(taskId, e.target.checked)
    }
    return (
        <input type="checkbox" checked={completed} onChange={handleChange}/>
    )
} 
