import prisma from "@/lib/prisma";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server"
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function WorkspaceLayout({ children, params }: { children: React.ReactNode, params: Promise<{ workspaceId: string }> }) {
    await auth.protect();
    const user = await currentUser();
    const { workspaceId } = await params;
    const { userId } = await auth();

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
        <div className="min-h-screen bg-background text-foreground">

            <div className="flex min-h-16 items-center justify-between gap-4 border-b border-border px-4 sm:px-6">

                <p className="shrink-0 font-semibold">Task-Manager</p>

                <p className="min-w-0 flex-1 truncate text-sm font-medium sm:text-base">{workspace.name}</p>

                <div className="flex shrink-0 items-center gap-2 rounded-full border border-border px-2 py-1">
                    <UserButton />
                    <p className="hidden text-sm sm:block">{user?.firstName}</p>
                </div>

            </div>

            <div className="min-h-[calc(100vh-4rem)] md:flex">

                <div className="flex border-b border-border bg-background md:hidden">
                    <Link
                        className="px-4 py-3 text-sm text-muted-foreground"
                        href="/workspaces">
                        ←
                    </Link>

                    <Link
                        className="flex-1 px-4 py-3 text-center text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        href={`/workspaces/${workspaceId}/tasks`}>
                        Tasks
                    </Link>

                    <Link
                        className="flex-1 px-4 py-3 text-center text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        href={`/workspaces/${workspaceId}/members`}>
                        Members
                    </Link>
                </div>

                <div className="hidden w-56 shrink-0 flex-col gap-1 border-r border-border bg-background p-3 md:flex">

                    <Link
                        className="mb-4 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        href="/workspaces">
                        ← Workspaces
                    </Link>

                    <Link
                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        href={`/workspaces/${workspaceId}/tasks`}>
                        Tasks
                    </Link>

                    <Link
                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        href={`/workspaces/${workspaceId}/members`}>
                        Members
                    </Link>

                </div>

                <div className="min-w-0 flex-1">
                    {children}
                </div>

            </div>

        </div>

    )
}