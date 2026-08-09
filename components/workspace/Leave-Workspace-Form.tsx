"use client"
import { leaveWorkspace } from "@/app/workspaces/actions";
import { useActionState } from "react"

export default function LeaveWorkspaceForm({ workspaceId, onClose }: { workspaceId: string, onClose: () => void }) {
    const [state, formAction, isPending] = useActionState(leaveWorkspace, null);
    return (
        <form action={formAction}>

            <div className="flex flex-col gap-2">

                <h2 className="text-lg font-semibold">Leave Workspace?</h2>
                <p className="text-lg">You will permanently leave this workspace.</p>
                <p className="text-lg font-bold">This action cannot be undone.</p>

            </div>

            <input type="hidden" value={workspaceId} name="workspaceId" />


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
                    {isPending ? "Leaving..." : "Leave"}
                </button>

            </div>


        </form>
    )
}