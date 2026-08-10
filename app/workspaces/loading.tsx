export default function Loading() {
    return (
        <>
            <div className="h-16 animate-pulse border-b border-border bg-muted" />

            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
                    <div className="h-10 w-36 animate-pulse rounded-md bg-muted" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div className="h-36 animate-pulse rounded-xl border border-border bg-muted" />
                    <div className="h-36 animate-pulse rounded-xl border border-border bg-muted" />
                    <div className="h-36 animate-pulse rounded-xl border border-border bg-muted" />
                    <div className="h-36 animate-pulse rounded-xl border border-border bg-muted" />
                </div>
            </div>
        </>
    );
}