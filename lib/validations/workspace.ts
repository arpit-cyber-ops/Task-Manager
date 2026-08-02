import * as z from "zod";

export const createWorkspaceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Workspace name must be at least 3 characters")
        .max(50, "Workspace name must be at most 50 characters"),
})

export const renameWorkspaceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Workspace name must be at least 3 characters")
        .max(50, "Workspace name must be at most 50 characters"),
    workspaceId: z
        .string()
        .trim()
        .cuid()
})

export const deleteWorkspaceSchema = z.object({
    workspaceId: z
        .string()
        .trim()
        .cuid(),
});

export const inviteMemberSchema = z.object({
    emailId: z
        .string()
        .trim()
        .email(),
    workspaceId: z
        .string()
        .trim()
        .cuid(),
});