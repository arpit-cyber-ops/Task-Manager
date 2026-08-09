"use client"
import { renameWorkspace } from "@/app/workspaces/actions";
import { WorkspaceWithCounts } from "@/types/workspace";
import { useActionState, useEffect } from "react";

export default function RenameWorkspaceForm({ workspace, onClose }: { workspace: WorkspaceWithCounts, onClose: () => void }) {

    const [state, formAction, isPending] = useActionState(renameWorkspace, null);

    useEffect(() => {
        if (state?.success) {
            onClose();
        }
    }, [state?.success, onClose])

    return (
        <form action={formAction} className="flex flex-col gap-4 py-4 px-2">

            <h2 className="text-lg font-semibold">Rename Workspace</h2>

            <div className="flex flex-col gap-2">

                <label htmlFor="workspace" className="text-sm font-medium">
                    New workspace Name
                </label>

                <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                    type="text"
                    id="workspace"
                    name="name"
                    defaultValue={workspace.name}
                    disabled={isPending} />

                <input
                    type="hidden"
                    name="workspaceId"
                    value={workspace.id} />

                {
                    state?.errors?.name?.[0] &&
                    <p className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive">
                        {state?.errors?.name?.[0]}
                    </p>
                }

            </div>

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">

                <button
                    className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    type="button"
                    disabled={isPending}
                    onClick={onClose} >
                    Cancel
                </button>
                <button
                    className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    disabled={isPending} >
                    {isPending ? "Renaming" : "Rename"}
                </button>



            </div>

        </form>
    )
}
