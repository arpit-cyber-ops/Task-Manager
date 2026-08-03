"use client"
import { removeMember } from "@/app/workspaces/actions";
import MemberProfile from "@/types/memberProfile";
import { useActionState, useEffect } from "react";

export default function RemoveMemberForm({ profile, onClose, workspaceId }: { profile: MemberProfile, onClose: () => void, workspaceId: string }) {
    const [state, formAction, isPending] = useActionState(removeMember, null);
    useEffect(() => {
        if (state?.success) {
            onClose();
        }
    }, [state?.success, onClose])
    return (
        <form action={formAction}>

            <div className="flex flex-col gap-2">
                
                <h2 className="text-xl text-center font-bold">Remove User?</h2>
                <p className="text-lg">{`This will permanently remove ${profile.name} from this workspace.`}</p>
                <p className="text-lg font-bold">This action cannot be undone.</p>

            </div>

            <input type="hidden" value={profile.id} name="targetUserId" />
            
            <input type="hidden" value={workspaceId} name="workspaceId" />

            {
                state?.error?.general &&
                <p className="bg-red-500 p-2 rounded-md text-[15px] font-bold">
                    {state?.error?.general}
                </p>
            }

            <div className="flex justify-end text-lg gap-8 py-2 px-4">

                {!isPending &&

                    <button
                        onClick={onClose}
                        className="text-lg border-2 border-black rounded-full px-2 cursor-pointer hover:bg-gray-400 hover:scale-102 transition-transform"
                        type="button"
                        disabled={isPending}>
                        Cancel
                    </button>}

                <button
                    type="submit"
                    className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                    disabled={isPending}>
                    {isPending ? "Removing..." : "Remove"}
                </button>

            </div>

        </form>
    )
}