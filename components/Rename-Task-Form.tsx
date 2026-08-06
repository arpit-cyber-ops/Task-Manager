import { renameTask } from "@/app/workspaces/actions";
import { useActionState, useEffect } from "react";
export default function RenameTaskForm({ taskId, title, onClose }: { taskId: string, title: string, onClose: () => void }) {

    const [state, formAction, isPending] = useActionState(renameTask, null);

    useEffect(() => {
        if (state?.success) {
            onClose();
        }
    }, [state?.success, onClose])

    return (
        <form action={formAction} className="flex flex-col gap-4 py-4 px-2">

            <h2 className="font-bold text-[28px] text-center mb-2">Rename Task</h2>

            <div className="flex flex-col gap-2">

                <label htmlFor="task" className="text-xl">
                    New task Name
                </label>

                <input
                    className="border border-black rounded-xl p-2 text-lg hover:bg-violet-300 transition-transform"
                    type="text"
                    id="task"
                    name="title"
                    defaultValue={title}
                    disabled={isPending} />

                <input
                    type="hidden"
                    name="taskId"
                    value={taskId} />

                {
                    state?.errors?.title?.[0] &&
                    <p className="bg-red-500 p-2 rounded-md text-[15px] font-bold">
                        {state.errors.title[0]}
                    </p>
                }

            </div>

            <div className="flex gap-9 px-4 justify-end">


                <button
                    className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                    type="button"
                    disabled={isPending}
                    onClick={onClose} >
                    Cancel
                </button>

                <button
                    className={`text-lg border-2 border-black rounded-full px-2 cursor-pointer ${!isPending && `hover:bg-gray-400 hover:scale-102 transition-transform`}`}
                    disabled={isPending} >
                    {isPending ? "Renaming..." : "Rename"}
                </button>

            </div>

        </form>
    )
}

