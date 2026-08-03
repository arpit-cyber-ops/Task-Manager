import Image from "next/image"
import MemberProfile from "@/types/memberProfile"
import RemoveMemberDialog from "./Remove-Member-Dialog"
export default function MembersCard({ profile, workspaceId, owner }: { profile: MemberProfile, workspaceId: string, owner: boolean }) {
    const isMember = profile.role === "MEMBER" ? true : false;
    
    return (

        <div className={`grid ${owner ? "grid-cols-[2fr_3fr_1fr_1.5fr_1fr]" : "grid-cols-[2fr_3fr_1fr_1.5fr]"} px-6 py-4 border-t border-black text-center`}>

            <div className="flex gap-3 items-center">
                <Image src={profile.imageUrl!} alt={profile.name!} width={32} height={32} className="rounded-full" />
                <p className="text-xl">{profile.name}</p>
            </div>

            <div className="text-start">
                <p className="text-md">{profile.email}</p>
            </div>

            <div className="flex justify-center">
                <span className="border border-black p-1 rounded-lg">
                    {profile.role === "OWNER" ? "👑 Owner" : "Member"}
                </span>
            </div>

            <div>
                <p>{profile.joinedAt.toLocaleDateString()}</p>
            </div>
            {owner && isMember &&
                <div>{<RemoveMemberDialog profile={profile} workspaceId={workspaceId}/>}</div>
            }

        </div>

    )
}