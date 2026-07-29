"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { WorkspaceWithCounts } from "@/types/workspace";
import RenameWorkspaceForm from "./Rename-Workspace-Form";

export default function RenameWorkspaceDialog({workspace, open, onOpenChange}: {workspace: WorkspaceWithCounts, open: boolean, onOpenChange: (open: boolean) => void}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-slate-300 rounded-xl">
                <RenameWorkspaceForm workspace={workspace} onClose={() => onOpenChange(false)}/>
            </DialogContent>
        </Dialog>
    )
}
