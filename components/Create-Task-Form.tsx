"use client"

import { createTask } from "@/app/workspaces/actions"
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

                <h2 className="text-center text-[28px]">Create Task</h2>

                <div className="flex flex-col gap-2">

                    <label htmlFor="title" className="text-lg">Task Name</label>
                    <input type="text" id="title" name="title" className="border border-black rounded-xl p-2 text-lg hover:bg-violet-300 transition-transform" disabled={isPending} />
                    <input type="hidden" name="workspaceId" value={workspaceId} />

                </div>

                {state?.errors?.title?.[0] &&
                    <p className="bg-red-500 p-2 rounded-md text-[15px] font-bold">
                        {state.errors.title[0]}
                    </p>
                }

                <div className="flex justify-end gap-8 px-4">

                    <button
                        className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                        disabled={isPending} onClick={onClose}
                        type="button">
                        Cancel
                    </button>


                    <button
                        className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                        disabled={isPending}>
                        {isPending ? "Creating..." : "Create"}
                    </button>

                </div>

            </div>

        </form>
    )
}
