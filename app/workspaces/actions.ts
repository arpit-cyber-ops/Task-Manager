    "use server";
    import prisma from "@/lib/prisma";
    import { workspaceSchema } from "@/lib/validations/workspace";
    import { auth } from "@clerk/nextjs/server";
    import { revalidatePath } from "next/cache";
    import { z } from "zod";

    export async function createWorkspace(_previousState: unknown, formData: FormData) {

        const { userId } = await auth();
        if (!userId) {
            throw new Error("You're not authenticated")
        }

        const data = Object.fromEntries(formData);
        const validationResult = workspaceSchema.safeParse(data);

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
            success: true
        }

    }