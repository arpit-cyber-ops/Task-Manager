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

            <h2 className="fon-bold text-[28px] text-center mb-2">Rename Workspace</h2>

            <div className="flex flex-col gap-2">

                <label htmlFor="workspace" className="text-xl">
                    New workspace Name
                </label>

                <input
                    className="border border-black rounded-xl p-2 text-lg hover:bg-violet-300 transition-transform"
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
                    <p className="bg-red-500 p-2 rounded-md text-[15px] font-bold">
                        {state?.errors?.name?.[0]}
                    </p>
                }

            </div>

            <div className="flex gap-9 px-4 justify-end">

                <button
                    className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                    disabled={isPending} >
                    {isPending ? "Renaming" : "Rename"}
                </button>

                {!isPending && <button
                    className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                    type="button"
                    disabled={isPending}
                    onClick={onClose} >
                    Cancel
                </button>}

            </div>

        </form>
    )
}
