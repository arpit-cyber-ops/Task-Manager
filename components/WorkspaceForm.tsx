import { createWorkspace } from "@/app/workspaces/actions"

export default function WorkspaceForm() {
    return (
        <form className="flex flex-col gap-4 py-4 px-2" action={createWorkspace}>
            <h2 className="font-bold text-[28px] text-center mb-2">Create Workspace</h2>
            <div className="flex flex-col gap-2">
            <label htmlFor="workspace" className="text-xl">Workspace Name</label>
            <input type="text" id="workspace" name="workspaceName" className="border border-black rounded-xl p-2 text-lg hover:bg-violet-300 transition-transform"/>
            </div>
            <div className="flex gap-9 px-4 justify-end">
            <button className="text-lg border-2 border-black rounded-full px-2 cursor-pointer hover:bg-gray-400 hover:scale-102 transition-transform">Create</button>
            <button className="text-lg border-2 border-black rounded-full px-2 cursor-pointer hover:bg-gray-400 hover:scale-102 transition-transform">Cancel</button>
            </div>
        </form>
    )
}
