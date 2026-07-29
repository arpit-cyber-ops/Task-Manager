"use client"
import { WorkspaceWithCounts } from "@/types/workspace";
import DeleteWorkspaceForm from "./Delete-Workspace-Form";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

export default function DeleteWorkspaceDialog({workspace}: {workspace: WorkspaceWithCounts}) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
            render={<button className="p-1 cursor-pointer hover:bg-slate-400">🗑️</button>}>
            </DialogTrigger>

            <DialogContent className="bg-slate-300 rounded-xl">
                <DeleteWorkspaceForm workspace={workspace} onClose={() => setOpen(false)}/>
            </DialogContent>

        </Dialog>
    )
}

