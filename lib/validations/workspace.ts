import * as z from "zod";

export const workspaceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Workspace name must be at least 3 characters")
        .max(50, "Workspace name must be at most 50 characters"),
})

