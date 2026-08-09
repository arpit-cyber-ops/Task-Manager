"use client"
import { WorkspaceWithCounts } from "@/types/workspace";
import DeleteWorkspaceForm from "./Delete-Workspace-Form";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function DeleteWorkspaceDialog({workspace, open, onOpenChange}: {workspace: WorkspaceWithCounts, open: boolean, onOpenChange: (open: boolean) => void}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100%-2rem)] rounded-xl bg-card sm:max-w-md">
                <DeleteWorkspaceForm workspace={workspace} onClose={() => onOpenChange(false)}/>
            </DialogContent>
        </Dialog>
    )
}

