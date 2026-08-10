"use server";
import prisma from "@/lib/prisma";
import { createWorkspaceSchema, renameWorkspaceSchema, deleteWorkspaceSchema, leaveWorkspaceSchema } from "@/lib/validations/workspace";
import membershipLookup from "@/lib/membershipLookup";
import { auth } from "@clerk/nextjs/server";
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

    const membership = await membershipLookup(userId, validationResult.data.workspaceId);

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
    const membership = await membershipLookup(userId, validationResult.data.workspaceId);

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

    const membership = await membershipLookup(userId, validationResult.data.workspaceId);

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