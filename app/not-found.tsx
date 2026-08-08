export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="text-center">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Workspace not found
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    The workspace you're looking for doesn't exist or you don't have access to it.
                </p>
            </div>
        </div>
    );
}
