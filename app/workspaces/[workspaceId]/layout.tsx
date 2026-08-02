import prisma from "@/lib/prisma";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server"
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function WorkspaceLayout({children, params}: {children: React.ReactNode, params: Promise<{workspaceId: string}>}) {
    await auth.protect();
    const user = await currentUser();
    const {workspaceId} = await params;
    const {userId} = await auth();

    const workspace = await prisma.workspace.findFirst({
        where: {
            id: workspaceId,
            memberships: {
                some: {
                    userId: userId!
                }
            }
        },
    });

    if (!workspace) {
        notFound();
    }

    return (
        <div className="flex flex-col max-w-full border-black border-3">
            <div className="flex justify-between p-4 items-center border-b border-black">
                <p>Task-Manager</p>
                <p>{workspace.name}</p>
                <div className="flex gap-2 border-4 rounded-full px-2 py-1">
                    <UserButton />
                    <p>{user?.firstName}</p>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex flex-col gap-4 py-4 px-8 w-70 border-r border-black min-h-screen">
                    <Link href={"/workspaces"}>
                        {`<- Workspaces`}
                    </Link>
                    <Link href={`/workspaces/${workspaceId}/tasks`}>
                        Tasks
                    </Link>
                    <Link href={`/workspaces/${workspaceId}/members`}>
                        Members
                    </Link>
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    )
}