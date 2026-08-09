"use client"
import { useState } from "react";
import CreateTaskForm from "./Create-Task-Form";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function CreateTaskDialog({ workspaceId }: { workspaceId: string }) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={<button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">+ Create Task</button>} />
            <DialogContent className="w-[calc(100%-2rem)] rounded-xl bg-card sm:max-w-md">
                <CreateTaskForm onClose={() => setOpen(false)} workspaceId={workspaceId} />
            </DialogContent>
        </Dialog>
    )
}
