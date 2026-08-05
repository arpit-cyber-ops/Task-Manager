"use client"
import { useState } from "react";
import CreateTaskForm from "./Create-Task-Form";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function CreateTaskDialog({ workspaceId }: { workspaceId: string }) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={<button className="text-md bg-gray-300 cursor-pointer border-2 border-black rounded-full p-2 hover:scale-101 hover:bg-violet-300 transition-transform">+ Create Task</button>} />
            <DialogContent className="bg-slate-300 rounded-xl">
                <CreateTaskForm onClose={() => setOpen(false)} workspaceId={workspaceId} />
            </DialogContent>
        </Dialog>
    )
}
