import type { WorkspaceWithCounts } from "@/types/workspace"
import Link from "next/link"
import RenameWorkspaceDialog from "./Rename-Workspace-Dialog"

interface WorkspaceProps {
    workspace: WorkspaceWithCounts
}

export default function WorkspaceCard({ workspace }: WorkspaceProps) {
    return (
        <div className="border-4 rounded-md flex flex-col p-4 gap-4 bg-slate-300 hover:scale-101 transition-transform">
            <Link href={`/workspaces/${workspace.id}/tasks`} className="hover:bg-slate-400 px-2">
                <p className="truncate text-xl" title={workspace.name}>{workspace.name}</p>
            </Link>
            <hr className="border border-black" />
            <div className="flex justify-between items-center">
                <div className="mt-auto">
                    <p className="text-md">
                        {workspace._count.tasks}
                        {workspace._count.tasks > 1 ? " Tasks" : " Task"}
                    </p>
                    <p className="text-md">
                        {workspace._count.memberships}
                        {workspace._count.memberships > 1 ? " Members" : " Member"}
                    </p>
                </div>
                <div>
                    {workspace.memberships[0].role === "OWNER" && <RenameWorkspaceDialog workspace={workspace}/>}
                </div>
            </div>
        </div>
    )
}