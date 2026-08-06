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

export const removeMemberSchema = z.object({
    workspaceId: z
        .string()
        .trim()
        .cuid(),
    targetUserId: z
        .string()
        .trim().min(1),
});

export const leaveWorkspaceSchema = z.object({
    workspaceId: z
        .string()
        .trim()
        .cuid(),
});

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Task name must be at least 3 characters")
        .max(50, "Task name must be at most 50 characters"),
    workspaceId: z
        .string()
        .trim()
        .cuid(),
})

export const completeTaskSchema = z.object({
    taskId: z.string().trim().cuid(),
    completed: z.boolean(),
});
