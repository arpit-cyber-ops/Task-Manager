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
                <h2 className="text-xl text-center">Delete Task?</h2>
                <p className="text-lg">This will permanently delete this task.</p>
                <p className="text-lg font-bold">This action cannot be undone.</p>
            </div>

            <input type="hidden" value={taskId} name="taskId" />

            {
                state?.error?.general &&
                <p className="bg-red-500 p-2 rounded-md text-[15px] font-bold">
                    {state?.error?.general}
                </p>
            }

            <div className="flex justify-end text-lg gap-8 py-2 px-4">


                <button
                    onClick={onClose}
                    className="text-lg border-2 border-black rounded-full px-2 cursor-pointer hover:bg-gray-400 hover:scale-102 transition-transform"
                    type="button"
                    disabled={isPending}>
                    Cancel
                </button>

                <button
                    type="submit"
                    className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                    disabled={isPending}>
                    {isPending ? "Deleting..." : "Delete"}
                </button>

            </div>

        </form>
    )
}

