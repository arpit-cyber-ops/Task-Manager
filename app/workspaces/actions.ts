"use server";
import prisma from "@/lib/prisma";
import { createWorkspaceSchema, renameWorkspaceSchema, deleteWorkspaceSchema, inviteMemberSchema, removeMemberSchema, leaveWorkspaceSchema, createTaskSchema } from "@/lib/validations/workspace";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"
import { z } from "zod";

export async function createWorkspace(_previousState: unknown, formData: FormData) {

    const { userId } = await auth();
    if (!userId) {
        throw new Error("You're not authenticated")
    }

    const data = Object.fromEntries(formData);
    const validationResult = createWorkspaceSchema.safeParse(data);

    if (!validationResult.success) {

        return {
            success: false,
            errors: z.flattenError(validationResult.error).fieldErrors,
        };

    }

    await prisma.workspace.create({
        data: {
            name: validationResult.data.name,
            memberships: {
                create: {
                    userId,
                    role: "OWNER",
                },
            },
        },
    });

    revalidatePath("/workspaces");
    return {
        success: true,
    };

}

export async function renameWorkspace(_previousState: unknown, formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You're not authenticated");
    }
    const data = Object.fromEntries(formData)
    const validationResult = renameWorkspaceSchema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            errors: z.flattenError(validationResult.error).fieldErrors,
        };
    }

    const membership = await prisma.membership.findUnique({
        where: {
            workspaceId_userId: {
                userId,
                workspaceId: validationResult.data.workspaceId,
            },
        },
    });

    if (!membership || membership.role !== "OWNER") {
        return {
            success: false,
            error: {
                general: ["Unable to rename workspace"]
            },
        };
    }

    await prisma.workspace.update({
        where: {
            id: validationResult.data.workspaceId,
        },
        data: {
            name: validationResult.data.name,
        },
    });

    revalidatePath("/workspaces");

    return {
        success: true,
    };
}

export async function deleteWorkspace(_previousState: unknown, formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You're not Authenticated");
    }
    const data = Object.fromEntries(formData);
    const validationResult = deleteWorkspaceSchema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            error: {
                general: ["Unable to delete workspace"],
            },
        };
    }
    const membership = await prisma.membership.findUnique({
        where: {
            workspaceId_userId: {
                userId,
                workspaceId: validationResult.data.workspaceId,
            },
        },
    });

    if (!membership || membership.role !== "OWNER") {
        return {
            success: false,
            error: {
                general: ["Unable to delete workspace"],
            },
        };
    }

    await prisma.workspace.delete({
        where: {
            id: validationResult.data.workspaceId,
        },
    });

    revalidatePath("/workspaces");

    return {
        success: true
    };
}

export async function inviteMember(_previousState: unknown, formData: FormData) {

    const { userId } = await auth();

    if (!userId) {
        throw new Error("You're not Authenticated");
    }

    const formDataObjects = Object.fromEntries(formData);

    const validationResult = inviteMemberSchema.safeParse(formDataObjects);

    if (!validationResult.success) {
        return {
            success: false,
            error: {
                general: ["Please enter a valid email"],
            },
        };
    }
    const membership = await prisma.membership.findUnique({
        where: {
            workspaceId_userId: {
                userId,
                workspaceId: validationResult.data.workspaceId,
            },
        },
    });
    if (!membership || membership.role !== "OWNER") {

        return {
            success: false,
            error: {
                general: ["Unable to Invite Member"],
            },
        };

    }

    const client = await clerkClient();

    const { data } = await client.users.getUserList({
        emailAddress: [validationResult.data.emailId]
    })

    if (data.length === 0) {
        return {
            success: false,
            error: {
                general: ["User not found"]
            }
        }
    }

    if (data[0].id === userId) {
        return {
            success: false,
            error: {
                general: ["You cannot invite yourself"],
            },
        };
    }

    const existingMembership = await prisma.membership.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: validationResult.data.workspaceId,
                userId: data[0].id,
            }
        }
    })

    if (existingMembership) {
        return {
            success: false,
            error: {
                general: ["User is already a member"]
            }
        }
    }

    await prisma.membership.create({
        data: {
            workspaceId: validationResult.data.workspaceId,
            userId: data[0].id,
        },
    });

    revalidatePath(`/workspaces/${validationResult.data.workspaceId}/members`);

    return {
        success: true,
    };

}

export async function removeMember(_previousState: unknown, formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You're not authenticated");
    }
    const data = Object.fromEntries(formData);
    const validationResult = removeMemberSchema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            error: {
                general: ["User not found"],
            },
        };
    }
    const requesterMembership = await prisma.membership.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: validationResult.data.workspaceId,
                userId,
            },
        },
    });
    if (!requesterMembership) {
        return {
            success: false,
            error: {
                general: ["Unable to remove member"],
            },
        };
    }
    if (requesterMembership.role !== "OWNER") {
        return {
            success: false,
            error: {
                general: ["Only owner can remove members"],
            },
        }
    }

    const targetMembership = await prisma.membership.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: validationResult.data.workspaceId,
                userId: validationResult.data.targetUserId,
            },
        },
    });

    if (!targetMembership) {
        return {
            success: false,
            error: {
                general: ["Member not found"]
            }
        }
    }
    if (targetMembership.userId === userId) {
        return {
            success: false,
            error: {
                general: ["You cannot remove yourself"]
            }
        }
    }
    if (targetMembership.role !== "MEMBER") {
        return {
            success: false,
            error: {
                general: ["You cannot remove an owner."]
            }
        }
    }

    await prisma.membership.delete({
        where: {
            id: targetMembership.id
        }
    });

    revalidatePath(`/workspaces/${validationResult.data.workspaceId}/members`);

    return {
        success: true,
    };
}

export async function leaveWorkspace(_previousState: unknown, formData: FormData) {

    const {userId} = await auth();
    if (!userId) {
        throw new Error("You're not authenticated");
    }

    const data = Object.fromEntries(formData);
    const validationResult = leaveWorkspaceSchema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            error: {
                general: ["Unable to leave workspace"],
            },
        };
    }

    const membership = await prisma.membership.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: validationResult.data.workspaceId,
                userId,
            },
        },
    });

    if (!membership) {
        return {
            success: false,
            error: {
                general: ["You're not a member"],
            },
        };
    }

    if (membership.role === "OWNER") {
        return {
            success: false,
            error: {
                general: ["Owners cannot leave the workspace."],
            },
        };
    }

    await prisma.membership.delete({
        where: {
            id: membership.id,
        },
    });

    redirect("/workspaces");

}

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

    const membership = await prisma.membership.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: validationResult.data.workspaceId,
                userId,
            }
        }
    })

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
