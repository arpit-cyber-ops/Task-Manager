"use client"
import { WorkspaceWithCounts } from "@/types/workspace";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import RenameWorkspaceDialog from "./Rename-Workspace-Dialog";
import DeleteWorkspaceDialog from "./Delete-Workspace-Dialog";

export default function WorkspaceActions({ workspace }: { workspace: WorkspaceWithCounts }) {
    const [renameOpen, setRenameOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false)
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger
                render={<button className="rounded-md hover:bg-slate-400 py-1 px-2 cursor-pointer">⋮</button>}/>
                <DropdownMenuContent className="bg-slate-200 ">
                    {workspace.memberships[0].role === "OWNER" &&
                        <>
                            <DropdownMenuItem className="cursor-pointer text-md font-bold p-1.5" onClick={() => setRenameOpen(true)}>
                                Rename
                            </DropdownMenuItem>
                            <hr className="border-black"/>
                            <DropdownMenuItem className="cursor-pointer text-md font-bold p-1.5" onClick={() => setDeleteOpen(true)}>
                                Delete
                            </DropdownMenuItem>
                        </>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <RenameWorkspaceDialog workspace={workspace} open={renameOpen} onOpenChange={setRenameOpen} />
            <DeleteWorkspaceDialog workspace={workspace} open={deleteOpen} onOpenChange={setDeleteOpen} />
        </div>
    )
}