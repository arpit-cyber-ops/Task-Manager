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
                    render={<button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">⋮</button>} />
                <DropdownMenuContent>
                    {workspace.memberships[0].role === "OWNER" &&
                        <>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => setRenameOpen(true)}>
                                Rename
                            </DropdownMenuItem>
                            <hr className="border-border" />
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => setDeleteOpen(true)}>
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