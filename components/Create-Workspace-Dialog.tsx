"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import WorkspaceForm from "./Create-Workspace-Form";

export default function CreateWorkspaceDialog() {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger
                render={<button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">+ Create Workspace</button>}
            />

            <DialogContent className="w-[calc(100%-2rem)] rounded-xl bg-card sm:max-w-md">
                <WorkspaceForm onClose={() => setOpen(false)}/>
            </DialogContent>

        </Dialog>
    )
}