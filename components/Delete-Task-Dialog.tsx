"use client"

import DeleteTaskForm from "./Delete-Task-Form";
import { Dialog, DialogContent } from "./ui/dialog";

export default function DeleteTaskDialog({ taskId, open, onOpenChange }: { taskId: string, open: boolean, onOpenChange: (open: boolean) => void}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-slate-300 rounded-xl">
                <DeleteTaskForm taskId={taskId} onClose={() => onOpenChange(false)}/>
            </DialogContent>
        </Dialog>
    )
}

