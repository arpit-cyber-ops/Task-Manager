import { Prisma } from "@/generated/prisma/client";

export type Task = Prisma.TaskGetPayload<{
    select: {
        id: true,
        title: true,
        completed: true,
        updatedAt: true,
    },
}>; 
