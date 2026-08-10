"use client"

import { inviteMember } from "@/app/workspaces/actions/membershipAction"
import { useActionState, useEffect } from "react"

export default function InviteMemberForm({ workspaceId, onClose }: { workspaceId: string, onClose: () => void }) {
    const [state, formAction, isPending] = useActionState(inviteMember, null);
    useEffect(() => {
        if (state?.success) {
            onClose();
        }
    }, [state?.success, onClose]);
    return (
        <form action={formAction}>

            <div className="flex flex-col gap-4 p-2">

                <h2 className="text-lg font-semibold">Invite Member</h2>

                <div className="flex flex-col gap-2">

                    <label htmlFor="input" className="text-sm font-medium">Enter Email</label>
                    <input type="email" id="input" name="emailId" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20" disabled={isPending} />
                    <input type="hidden" name="workspaceId" value={workspaceId} />

                </div>

                {
                    state?.error?.general &&
                    <p className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive">
                        {state?.error?.general}
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
                        {isPending ? "Inviting..." : "Invite"}
                    </button>

                </div>

            </div>

        </form>
    )
}