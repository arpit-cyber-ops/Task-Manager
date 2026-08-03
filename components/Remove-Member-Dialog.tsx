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
            render={<button className="text-md bg-gray-300 cursor-pointer border-2 border-black rounded-full p-1 hover:bg-violet-300 transition-transform">Remove</button>}/>
            <DialogContent>
                <RemoveMemberForm profile={profile} onClose={() => setOpen(false)} workspaceId={workspaceId}/>
            </DialogContent>
        </Dialog>
    )
}