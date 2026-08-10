"use server";
import membershipLookup from "@/lib/membershipLookup";
import prisma from "@/lib/prisma";
import { inviteMemberSchema, removeMemberSchema } from "@/lib/validations/membership";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

    const membership = await membershipLookup(userId, validationResult.data.workspaceId);

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

    const existingMembership = await membershipLookup(data[0].id, validationResult.data.workspaceId);

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
    const requesterMembership = await membershipLookup(userId, validationResult.data.workspaceId);
    
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

    const targetMembership = await membershipLookup(validationResult.data.targetUserId, validationResult.data.workspaceId);

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