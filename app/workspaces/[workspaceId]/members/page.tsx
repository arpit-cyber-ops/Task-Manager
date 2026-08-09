import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import MembersCard from "@/components/members/Members-Card";
import InviteMemberDialog from "@/components/members/Invite-Member-Dialog";
import LeaveWorkspaceDialog from "@/components/workspace/Leave-Workspace-Dialog";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Members",
}

export default async function Members({ params }: { params: Promise<{ workspaceId: string }> }) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You're not authenticated");
    }
    const { workspaceId } = await params;
    const memberData = await prisma.membership.findMany({
        where: {
            workspaceId,
        },
        select: {
            role: true,
            userId: true,
            joinedAt: true,
        },
    });
    const userIds = memberData.map(member => member.userId);
    const client = await clerkClient();
    const { data } = await client.users.getUserList({
        userId: userIds,
    });
    const memberProfiles = memberData.map(member => {
        const user = data.find(user => member.userId === user.id)
        if (!user) {
            throw new Error(`No Clerk user found for membership userId: ${member.userId}`);
        }
        return {
            id: user.id,
            name: user.fullName,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
            role: member.role,
            joinedAt: member.joinedAt,
        }
    });
    const owner = memberData.some(member => member.userId === userId && member.role === "OWNER")

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">{`Workspace Members  (${memberProfiles.length})`}</h2>
                {owner ? <InviteMemberDialog workspaceId={workspaceId} /> : <LeaveWorkspaceDialog workspaceId={workspaceId} />}
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div
                    className={`hidden items-center gap-4 px-6 py-4 text-center text-sm font-medium text-muted-foreground md:grid ${owner
                            ? "md:grid-cols-[minmax(180px,2fr)_minmax(220px,3fr)_100px_120px_80px]"
                            : "md:grid-cols-[minmax(180px,2fr)_minmax(220px,3fr)_100px_120px]"
                        }`}
                >
                    <p className="text-start">Name</p>
                    <p className="text-start">Email</p>
                    <p>Role</p>
                    <p>Joined</p>
                </div>
                {
                    memberProfiles.map((profile) => (
                        <MembersCard profile={profile} key={profile.id} workspaceId={workspaceId} owner={owner} />
                    ))
                }
            </div>
        </div>
    )
}