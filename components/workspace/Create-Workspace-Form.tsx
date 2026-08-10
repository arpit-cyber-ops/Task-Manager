"use client"
import { createWorkspace } from "@/app/workspaces/actions/workspaceAction"
import { useActionState, useEffect } from "react"

export default function WorkspaceForm({ onClose }: { onClose: () => void }) {
    const [state, formAction, isPending] = useActionState(createWorkspace, null);
    useEffect(() => {
        if (state?.success) {
            onClose();
        }
    }, [state?.success, onClose])
    return (
        <form className="flex flex-col gap-4 py-4 px-2" action={formAction}>

            <h2 className="text-lg font-semibold">Create Workspace</h2>

            <div className="flex flex-col gap-2">

                <label htmlFor="workspace" className="text-sm font-medium">
                    Workspace Name
                </label>

                <input
                    type="text"
                    id="workspace"
                    name="name"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                    disabled={isPending} />

                {state?.errors?.name?.[0] &&
                    <p className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive">
                        {state?.errors?.name?.[0]}
                    </p>
                }

            </div>

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">

                <button
                    className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    type="button"
                    onClick={onClose}>
                    Close
                </button>
                <button
                    className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    disabled={isPending}    >
                    {isPending ? "Creating..." : "Create"}
                </button>



            </div>

        </form>
    )
}
