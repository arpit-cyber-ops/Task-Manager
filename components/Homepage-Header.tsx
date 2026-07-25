import { UserButton } from "@clerk/nextjs"
import CreateWorkspaceDialog from "./Create-Workspace-Dialog"

export default function Homepage_Header() {
    
    return (
        <div className="flex justify-between p-4">
            <div>
                <p>Task-Manager</p>
            </div>
            <div className="flex gap-4">
                <CreateWorkspaceDialog />
                <UserButton />
            </div>
        </div>
    )
}