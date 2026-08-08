import { UserButton } from "@clerk/nextjs"
import CreateWorkspaceDialog from "./Create-Workspace-Dialog"

export default function Homepage_Header() {

    return (
        <div className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-background px-4 sm:px-6">
            <div>
                <p className="font-semibold">Task-Manager</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <CreateWorkspaceDialog />
                <UserButton />
            </div>
        </div>
    )
}