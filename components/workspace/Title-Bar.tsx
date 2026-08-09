import { currentUser } from "@clerk/nextjs/server";

export default async function TitleBar() {
    const user = await currentUser();
    return (
        <div className="mb-6">
            <p className="text-2xl font-semibold tracking-tight">
                Welcome, {user?.firstName}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
                Select a workspace to continue
            </p>
        </div>
    )
}
