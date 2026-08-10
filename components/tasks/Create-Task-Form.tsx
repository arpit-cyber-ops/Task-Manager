"use client"

import { createTask } from "@/app/workspaces/actions/taskAction"
import { useActionState, useEffect } from "react"

export default function CreateTaskForm({ workspaceId, onClose }: { workspaceId: string, onClose: () => void }) {
    const [state, formAction, isPending] = useActionState(createTask, null);
    useEffect(() => {
        if (state?.success) {
            onClose();
        }
    }, [state?.success, onClose]);
    return (
        <form action={formAction}>

            <div className="flex flex-col gap-4 p-2">

                <h2 className="text-lg font-semibold">Create Task</h2>

                <div className="flex flex-col gap-2">

                    <label htmlFor="title" className="text-sm font-medium">Task Name</label>
                    <input type="text" id="title" name="title" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20" disabled={isPending} />
                    <input type="hidden" name="workspaceId" value={workspaceId} />

                </div>

                {state?.errors?.title?.[0] &&
                    <p className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive">
                        {state.errors.title[0]}
                    </p>
                }

                <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">

                    <button
                        className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        disabled={isPending} onClick={onClose}
                        type="button">
                        Cancel
                    </button>


                    <button
                        className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        disabled={isPending}>
                        {isPending ? "Creating..." : "Create"}
                    </button>

                </div>

            </div>

        </form>
    )
}
