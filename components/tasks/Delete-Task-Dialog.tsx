"use client"

import DeleteTaskForm from "./Delete-Task-Form";
import { Dialog, DialogContent } from "../ui/dialog";

export default function DeleteTaskDialog({ taskId, open, onOpenChange }: { taskId: string, open: boolean, onOpenChange: (open: boolean) => void}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100%-2rem)] rounded-xl bg-card sm:max-w-md">
                <DeleteTaskForm taskId={taskId} onClose={() => onOpenChange(false)}/>
            </DialogContent>
        </Dialog>
    )
}

