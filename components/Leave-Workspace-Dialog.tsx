"use client"
import { useState } from "react";
import LeaveWorkspaceForm from "./Leave-Workspace-Form";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function LeaveWorkspaceDialog({workspaceId}: {workspaceId: string}) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
            render={<button className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">Leave Workspace</button>}/>

            <DialogContent className="w-[calc(100%-2rem)] rounded-xl bg-card sm:max-w-md">
                <LeaveWorkspaceForm workspaceId={workspaceId} onClose={() => setOpen(false)}/>
            </DialogContent>
        </Dialog>
    )
}