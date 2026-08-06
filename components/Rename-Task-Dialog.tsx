"use client"
import RenameTaskForm from "./Rename-Task-Form";
import { Dialog, DialogContent } from "./ui/dialog";

export default function RenameTaskDialog({taskId, title, open, onOpenChange}: {taskId: string, title: string, open: boolean, onOpenChange: (open: boolean) => void}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-slate-300 rounded-xl">
                <RenameTaskForm taskId={taskId} title={title} onClose={() => onOpenChange(false)}/>
            </DialogContent>
        </Dialog>
    )
}

