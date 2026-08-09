"use client"
import RenameTaskForm from "./Rename-Task-Form";
import { Dialog, DialogContent } from "../ui/dialog";

export default function RenameTaskDialog({taskId, title, open, onOpenChange}: {taskId: string, title: string, open: boolean, onOpenChange: (open: boolean) => void}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100%-2rem)] rounded-xl bg-card sm:max-w-md">
                <RenameTaskForm taskId={taskId} title={title} onClose={() => onOpenChange(false)}/>
            </DialogContent>
        </Dialog>
    )
}

