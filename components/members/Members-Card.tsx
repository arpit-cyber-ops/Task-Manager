import Image from "next/image"
import MemberProfile from "@/types/memberProfile"
import RemoveMemberDialog from "./Remove-Member-Dialog"

export default function MembersCard({
    profile,
    workspaceId,
    owner,
}: {
    profile: MemberProfile
    workspaceId: string
    owner: boolean
}) {
    const isMember = profile.role === "MEMBER"

    return (
        <>
            {/* Desktop */}
            <div
                className={`hidden items-center gap-4 border-t border-border px-6 py-4 text-center md:grid ${
                    owner
                        ? "md:grid-cols-[minmax(180px,2fr)_minmax(220px,3fr)_100px_120px_80px]"
                        : "md:grid-cols-[minmax(180px,2fr)_minmax(220px,3fr)_100px_120px]"
                }`}
            >
                <div className="flex min-w-0 items-center gap-3 text-left">
                    <Image
                        src={profile.imageUrl!}
                        alt={profile.name!}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rounded-full"
                    />

                    <p className="truncate text-sm font-medium">
                        {profile.name}
                    </p>
                </div>

                <div className="min-w-0 text-start">
                    <p className="truncate text-sm text-muted-foreground">
                        {profile.email}
                    </p>
                </div>

                <div className="flex justify-center">
                    <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {profile.role === "OWNER" ? "👑 Owner" : "Member"}
                    </span>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        {profile.joinedAt.toLocaleDateString()}
                    </p>
                </div>

                {owner && isMember && (
                    <div className="flex justify-center">
                        <RemoveMemberDialog
                            profile={profile}
                            workspaceId={workspaceId}
                        />
                    </div>
                )}
            </div>

            {/* Mobile */}
            <div className="flex items-start justify-between gap-3 border-t border-border p-4 md:hidden">
                <div className="flex min-w-0 items-start gap-3">
                    <Image
                        src={profile.imageUrl!}
                        alt={profile.name!}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rounded-full"
                    />

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                            {profile.name}
                        </p>

                        <p className="mt-1 break-all text-sm text-muted-foreground">
                            {profile.email}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                {profile.role === "OWNER"
                                    ? "👑 Owner"
                                    : "Member"}
                            </span>

                            <span className="text-xs text-muted-foreground">
                                {profile.joinedAt.toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {owner && isMember && (
                    <div className="shrink-0">
                        <RemoveMemberDialog
                            profile={profile}
                            workspaceId={workspaceId}
                        />
                    </div>
                )}
            </div>
        </>
    )
}