import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link";

export default async function WorkspaceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const user = await currentUser();
    return (
        <div className="flex flex-col">
            <div className="flex justify-between border p-4 items-center">
                <p>Task-Manager</p>
                <p>College Project</p>
                <div className="flex gap-2 border-4 rounded-full px-2">
                    <UserButton />
                    <p>{user?.firstName}</p>
                </div>
            </div>
            <div className="flex gap-8">
                <div className="flex flex-col gap-4 p-4">
                    <Link href={"/workspaces"}>
                        {`<- Workspaces`}
                    </Link>
                    <Link href={`/workspaces/workspace.id/tasks`}>
                        Tasks
                    </Link>
                    <Link href={`/workspaces/workspace.id/members`}>
                        Members
                    </Link>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}