"use client"
import MemberProfile from "@/types/memberProfile";
import RemoveMemberForm from "./Remove-Member-Form";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

export default function RemoveMemberDialog({profile, workspaceId}: {profile: MemberProfile, workspaceId: string}) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
            render={<button className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">Remove</button>}/>
            <DialogContent className="w-[calc(100%-2rem)] rounded-xl bg-card sm:max-w-md">
                <RemoveMemberForm profile={profile} onClose={() => setOpen(false)} workspaceId={workspaceId}/>
            </DialogContent>
        </Dialog>
    )
}