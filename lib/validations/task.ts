import * as z from "zod";

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

export const renameTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Task name must be at least 3 characters")
        .max(50, "Task name must be at most 50 characters"),
    taskId: z
        .string()
        .trim()
        .cuid(),
});

export const deleteTaskSchema = z.object({
    taskId: z
        .string()
        .trim()
        .cuid(),
});

