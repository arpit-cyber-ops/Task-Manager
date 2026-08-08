import type { WorkspaceWithCounts } from "@/types/workspace"
import Link from "next/link"
import WorkspaceActions from "./workspace-actions"

interface WorkspaceProps {
    workspace: WorkspaceWithCounts
}

export default function WorkspaceCard({ workspace }: WorkspaceProps) {
    return (
        <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Link
                href={`/workspaces/${workspace.id}/tasks`}
                className="min-w-0">
                <p className="truncate text-base font-semibold" title={workspace.name}>{workspace.name}</p>
            </Link>
            <hr className="border-border" />
            <div className="flex items-end justify-between gap-4">
                <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="text-sm">
                        {workspace._count.tasks}
                        {workspace._count.tasks > 1 ? " Tasks" : " Task"}
                    </p>
                    <p className="text-sm">
                        {workspace._count.memberships}
                        {workspace._count.memberships > 1 ? " Members" : " Member"}
                    </p>
                </div>
                <div>
                    <WorkspaceActions workspace={workspace} />
                </div>
            </div>
        </div>
    )
}