import { Prisma } from "@/generated/prisma/client";

export type WorkspaceWithCounts = Prisma.WorkspaceGetPayload<{
    include: {
        _count: {
            select: {
                memberships: true,
                tasks: true,
            };
        },
        memberships: {
            select: {
                role: true,
            },
        },
    };
}>;