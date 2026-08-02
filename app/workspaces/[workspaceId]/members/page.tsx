import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import MembersCard from "@/components/Members-Card";

export default async function Members({ params }: { params: Promise<{ workspaceId: string }> }) {
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
    const users = await client.users.getUserList({
        userId: userIds,
    });
    const memberProfiles = memberData.map(member => {
        const user = users.data.find(user => member.userId === user.id)
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

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between px-4 py-6 text-center">
                <h2 className="text-2xl">{`Workspace Members  (${memberProfiles.length})`}</h2>
                <button className="border-2 border-black px-2 rounded-md">+ Invite Members</button>
            </div>
            <div className="flex flex-col border border-black rounded-md mx-4">
                <div className="grid grid-cols-[2fr_3fr_1fr_1.5fr] py-4 px-6 text-center font-bold text-xl">
                    <p className="text-start">Name</p>
                    <p className="text-start">Email</p>
                    <p className="">Role</p>
                    <p>Joined</p>
                </div>
                {
                    memberProfiles.map((profile) => (
                        <MembersCard profile={profile} key={profile.id} />
                    ))
                }
            </div>
        </div>
    )
}