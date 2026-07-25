"use client"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import WorkspaceForm from "./WorkspaceForm";

export default function CreateWorkspaceDialog() {
    return (
        <Dialog>

            <DialogTrigger
                render={<button className="text-md bg-gray-300 cursor-pointer border-2 border-black rounded-full p-2 hover:scale-101 hover:bg-violet-300 transition-transform">+ Create Workspace</button>}
            />

            <DialogContent className="bg-slate-300 rounded-xl">
                <WorkspaceForm />
            </DialogContent>

        </Dialog>
    )
}