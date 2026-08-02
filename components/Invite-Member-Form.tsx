"use client"

import { inviteMember } from "@/app/workspaces/actions"
import { useActionState, useEffect } from "react"

export default function InviteMemberForm({ workspaceId, onClose }: { workspaceId: string, onClose: () => void }) {
    const [state, formAction, isPending] = useActionState(inviteMember, null);
    useEffect(() => {
        if (state?.success) {
            onClose();
        }
    },[state?.success, onClose]);
    return (
        <form action={formAction}>

            <div className="flex flex-col gap-4 p-2">

                <h2 className="text-center text-[28px]">Invite Member</h2>

                <div className="flex flex-col gap-2">

                    <label htmlFor="input" className="text-lg">Enter Email</label>
                    <input type="email" id="input" name="emailId" className="border border-black rounded-xl p-2 text-lg hover:bg-violet-300 transition-transform" disabled={isPending} />
                    <input type="hidden" name="workspaceId" value={workspaceId} />

                </div>

                {
                    state?.error?.general &&
                    <p className="bg-red-500 p-2 rounded-md text-[15px] font-bold">
                        {state?.error?.general}
                    </p>
                }

                <div className="flex justify-end gap-8 px-4">
                {!isPending &&
                    <button
                        className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                        disabled={isPending} onClick={onClose}
                        type="button">
                        Cancel
                    </button>}

                    
                        <button
                            className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                            disabled={isPending}>
                            {isPending ? "Inviting..." : "Invite"}
                        </button>

                </div>

            </div>

        </form>
    )
}