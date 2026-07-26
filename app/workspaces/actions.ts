"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createWorkspace(formData: FormData) {

    const { userId } = await auth();
    if (!userId) {
        throw new Error("You're not authenticated")
    }

    const workspaceName = formData.get("workspaceName");

    if (typeof workspaceName !== "string" || workspaceName.trim() === "") {
        return;
    }

    const workspace = await prisma.workspace.create({
        data: {
            name: workspaceName,
            memberships: {
                create: {
                    userId,
                    role: "OWNER",
                },
            },
        },
    });

    revalidatePath("/workspaces");

}