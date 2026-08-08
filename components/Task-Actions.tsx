"use client"

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import RenameTaskDialog from "./Rename-Task-Dialog";
import DeleteTaskDialog from "./Delete-Task-Dialog";

export default function TaskActions({ taskId, title }: { taskId: string, title: string }) {

    const [renameOpen, setRenameOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (

        <div>

            <DropdownMenu>

                <DropdownMenuTrigger
                    render={<button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">⋮</button>}
                />

                <DropdownMenuContent>

                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setRenameOpen(true)}>
                        Rename
                    </DropdownMenuItem>

                    <hr className="border-border" />

                    <DropdownMenuItem
                        className="cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => setDeleteOpen(true)}>
                        Delete
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

            <RenameTaskDialog taskId={taskId} title={title} open={renameOpen} onOpenChange={setRenameOpen} />
            <DeleteTaskDialog taskId={taskId} open={deleteOpen} onOpenChange={setDeleteOpen} />

        </div>
    )
}

