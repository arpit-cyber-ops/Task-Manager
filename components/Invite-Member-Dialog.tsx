"use client"
import { useState } from "react";
import InviteMemberForm from "./Invite-Member-Form";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function InviteMemberDialog({workspaceId}: {workspaceId: string}) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
            render={<button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">+ Invite Members</button>}/>

            <DialogContent className="w-[calc(100%-2rem)] rounded-xl bg-card sm:max-w-md">
                <InviteMemberForm onClose={() => setOpen(false)} workspaceId={workspaceId}/>
            </DialogContent>
        </Dialog>
    )
}