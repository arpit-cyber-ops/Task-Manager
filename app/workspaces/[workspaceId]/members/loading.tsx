export default function Loading() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
                <div className="h-8 w-32 animate-pulse rounded-md bg-muted" />
                <div className="h-10 w-36 animate-pulse rounded-md bg-muted" />
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex h-16 items-center gap-4 border-b border-border px-4">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-32 animate-pulse rounded-md bg-muted" />
                </div>

                <div className="flex h-16 items-center gap-4 border-b border-border px-4">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-40 animate-pulse rounded-md bg-muted" />
                </div>

                <div className="flex h-16 items-center gap-4 px-4">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-36 animate-pulse rounded-md bg-muted" />
                </div>
            </div>
        </div>
    );
}