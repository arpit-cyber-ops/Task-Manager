import { currentUser } from "@clerk/nextjs/server";

export default async function TitleBar() {
    const user = await currentUser();
    return (
        <div className="flex flex-col gap-2 text-center py-4">
            <p className="text-3xl">Welcome, {user?.firstName}</p>
            <p className="text-2xl">Select a workspace to continue</p>
        </div>
    )
}
