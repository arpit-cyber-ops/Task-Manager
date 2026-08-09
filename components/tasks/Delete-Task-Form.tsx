"use client"
import { deleteTask } from "@/app/workspaces/actions";
import { useActionState, useEffect } from "react";

export default function DeleteTaskForm({ taskId, onClose }: { taskId: string, onClose: () => void }) {

    const [state, formAction, isPending] = useActionState(deleteTask, null);

    useEffect(() => {
        if (state?.success) {
            onClose();
        }
    }, [state?.success, onClose])

    return (

        <form action={formAction} className="flex flex-col gap-2">

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Delete Task?</h2>
                <p className="text-lg">This will permanently delete this task.</p>
                <p className="text-lg font-bold">This action cannot be undone.</p>
            </div>

            <input type="hidden" value={taskId} name="taskId" />

            {
                state?.error?.general &&
                <p className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive">
                    {state?.error?.general}
                </p>
            }

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">


                <button
                    onClick={onClose}
                    className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    type="button"
                    disabled={isPending}>
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-md bg-destructive px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-destructive/90"
                    disabled={isPending}>
                    {isPending ? "Deleting..." : "Delete"}
                </button>

            </div>

        </form>
    )
}

