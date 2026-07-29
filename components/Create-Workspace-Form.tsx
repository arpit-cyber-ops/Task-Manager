import { createWorkspace } from "@/app/workspaces/actions"
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

            <h2 className="font-bold text-[28px] text-center mb-2">Create Workspace</h2>

            <div className="flex flex-col gap-2">

                <label htmlFor="workspace" className="text-xl">
                    Workspace Name
                </label>

                <input
                    type="text"
                    id="workspace"
                    name="name"
                    className="border border-black rounded-xl p-2 text-lg hover:bg-violet-300 transition-transform"
                    disabled={isPending} />

                {state?.errors?.name?.[0] &&
                    <p className="bg-red-500 p-2 rounded-md text-[15px] font-bold">
                        {state?.errors?.name?.[0]}
                    </p>
                }

            </div>

            <div className="flex gap-9 px-4 justify-end">

                <button
                    className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                    disabled={isPending}    >
                    {isPending ? "Creating..." : "Create"}
                </button>

                {!isPending &&
                    <button
                        className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                        type="button"
                        onClick={onClose}   >
                        Close
                    </button>}

            </div>

        </form>
    )
}
