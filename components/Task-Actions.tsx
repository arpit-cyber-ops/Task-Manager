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
                    render={<button className="rounded-md hover:bg-slate-300 py-0.5 px-1 cursor-pointer">⋮</button>}
                />

                <DropdownMenuContent className="bg-slate-200 ">

                    <DropdownMenuItem
                        className="cursor-pointer text-sm font-bold p-1"
                        onClick={() => setRenameOpen(true)}>
                        Rename
                    </DropdownMenuItem>

                    <hr className="border-black" />

                    <DropdownMenuItem
                        className="cursor-pointer text-sm font-bold p-1"
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

