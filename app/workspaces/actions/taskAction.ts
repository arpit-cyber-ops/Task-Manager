"use server";
import prisma from "@/lib/prisma";
import { createTaskSchema, completeTaskSchema, renameTaskSchema, deleteTaskSchema } from "@/lib/validations/task";
import membershipLookup from "@/lib/membershipLookup";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createTask(_previousState: unknown, formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You're not authenticated");
    }

    const data = Object.fromEntries(formData);
    const validationResult = createTaskSchema.safeParse(data);

    if (!validationResult.success) {

        return {
            success: false,
            errors: z.flattenError(validationResult.error).fieldErrors,
        };

    }

    const membership = await membershipLookup(userId, validationResult.data.workspaceId);

    if (!membership) {
        return {
            success: false,
        };
    }

    await prisma.task.create({
        data: {
            title: validationResult.data.title,
            workspaceId: validationResult.data.workspaceId,
        },
    });

    revalidatePath(`/workspaces/${validationResult.data.workspaceId}/tasks`);

    return {
        success: true,
    };

}

export async function completeTask(taskId: string, completed: boolean) {

    const {userId} = await auth();
    if (!userId) {
        throw new Error("You're not authenticated");
    }
    const validationResult = completeTaskSchema.safeParse({
        taskId,
        completed,
    });
    if (!validationResult.success) {
        return {
            success: false,
            error: {
                general: ["Unable to toggle"],
            },
        };
    }

    const taskWorkspace = await prisma.task.findUnique({
        where: {
            id: validationResult.data.taskId,
        },
        select: {
            workspaceId: true,
        },
    });

    if (!taskWorkspace) {
        return {
            success: false,
            error: {
                general: ["Task not found"]
            }
        }
    }

    const membership = await membershipLookup(userId, taskWorkspace.workspaceId);

    if (!membership) {
        return {
            success: false,
            error: {
                general: ["You cannot toggle this task"],
            },
        };
    }

    await prisma.task.update({
        data: {
            completed,
        },
        where: {
            id: validationResult.data.taskId,
        },
    });
    
    revalidatePath(`/workspaces/${taskWorkspace.workspaceId}/tasks`);

    return {
        success: true,
    };

}

export async function renameTask(_previousState: unknown, formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You're not authenticated");
    }

    const data = Object.fromEntries(formData);
    const validationResult = renameTaskSchema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            errors: z.flattenError(validationResult.error).fieldErrors,
        };
    }
    const taskWorkspace = await prisma.task.findUnique({
        where: {
            id: validationResult.data.taskId,
        },
        select: {
            workspaceId: true,
        },
    });

    if (!taskWorkspace) {
        return {
            success: false,
            error: {
                general: ["Task not found"]
            }
        }
    }

    const membership = await membershipLookup(userId, taskWorkspace.workspaceId);

    if (!membership) {
        return {
            success: false,
            error: {
                general: ["You cannot rename this task"],
            },
        };
    }

    await prisma.task.update({
        data: {
            title: validationResult.data.title,
        },
        where: {
            id: validationResult.data.taskId,
        }
    })

    revalidatePath(`/workspaces/${taskWorkspace.workspaceId}/tasks`);

    return {
        success: true,
    };
}

export async function deleteTask(_previousState: unknown, formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You're not authenticated");
    }

    const data = Object.fromEntries(formData);
    const validationResult = deleteTaskSchema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            error: {
                general: ["Unable to delete task"]
            }
        };
    }

    const taskWorkspace = await prisma.task.findUnique({
        where: {
            id: validationResult.data.taskId,
        },
        select: {
            workspaceId: true,
        },
    });

    if (!taskWorkspace) {
        return {
            success: false,
            error: {
                general: ["Task not found"]
            }
        }
    }

    const membership = await membershipLookup(userId, taskWorkspace.workspaceId);

    if (!membership) {
        return {
            success: false,
            error: {
                general: ["You cannot delete this task"],
            },
        };
    }

    await prisma.task.delete({
        where: {
            id: validationResult.data.taskId,
        }
    })

    revalidatePath(`/workspaces/${taskWorkspace.workspaceId}/tasks`);

    return {
        success: true,
    };
}

