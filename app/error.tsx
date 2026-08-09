"use client"

export default function Error({error, reset}: {error: Error, reset: () => void}) {
    return (
        <div>
            <p>Something went wrong.</p>
            <p>We couldn't load this page right now.</p>
            <button onClick={() => reset()}>Try Again</button>
        </div>
    )
}