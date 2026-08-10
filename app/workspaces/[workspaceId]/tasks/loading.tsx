export default function Loading() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
                <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
                <div className="h-10 w-28 animate-pulse rounded-md bg-muted" />
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="h-16 animate-pulse border-b border-border bg-muted" />
                <div className="h-16 animate-pulse border-b border-border bg-muted" />
                <div className="h-16 animate-pulse bg-muted" />
            </div>
        </div>
    );
}