import prisma from "./prisma";
export default async function getWorkspaceForUser(workspaceId: string, userId: string) {
   const workspace = await prisma.workspace.findFirst({
        where: {
            id: workspaceId,
            memberships: {
                some: {
                    userId: userId,
                },
            },
        },
    });
    return workspace;
}

