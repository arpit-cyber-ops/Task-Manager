import { Role } from "@/generated/prisma/enums";
export default interface MemberProfile {
    id: string;
    name: string | null;
    email: string;
    imageUrl: string;
    role: Role;
    joinedAt: Date;
}