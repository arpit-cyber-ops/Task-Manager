import prisma from "./prisma";

export default async function membershipLookup(userId: string, validatedWorkspaceId: string) {
    const membership = await prisma.membership.findUnique({
        where: {
            workspaceId_userId: {
                userId,
                workspaceId: validatedWorkspaceId,
            },
        },
    });

    return membership;
}