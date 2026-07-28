"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { WorkspaceWithCounts } from "@/types/workspace";
import RenameWorkspaceForm from "./Rename-Workspace-Form";

export default function RenameWorkspaceDialog({workspace}: {workspace: WorkspaceWithCounts}) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
            render={<button className="p-1 cursor-pointer hover:bg-slate-400">✏️</button>}/>

            <DialogContent className="bg-slate-300 rounded-xl">
                <RenameWorkspaceForm workspace={workspace} onClose={() => setOpen(false)}/>
            </DialogContent>
        </Dialog>
    )
}
