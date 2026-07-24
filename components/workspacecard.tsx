import type { WorkspaceWithCounts } from "@/types/workspace"
import Link from "next/link"

interface WorkspaceProps {
    workspace: WorkspaceWithCounts
}

export default function WorkspaceCard({ workspace }: WorkspaceProps) {
    return (
        <Link href={`/workspaces/${workspace.id}/tasks`} className="border-4 rounded-md flex flex-col p-4 gap-4">
            <div>
                <p className="line-clamp-2 text-xl" title={workspace.name}>{workspace.name}</p>
            </div>
            <div className="mt-auto">
                <p className="text-md">
                    {workspace._count.tasks}
                    {workspace._count.tasks > 1 ? " Tasks" : " Task"}
                </p>
                <p className="text-md">
                    {workspace._count.memberships}
                    {workspace._count.memberships > 1 ? "Members" : "Member"}
                </p>
            </div>
        </Link>
    )
}