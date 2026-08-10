import * as z from "zod";

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
