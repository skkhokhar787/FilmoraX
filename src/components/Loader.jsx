import { cn } from "../utils/format"

export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[2/3] w-full animate-pulse rounded-2xl bg-white/5" />
      <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/5" />
      <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/5" />
    </div>
  )
}

export function SkeletonGrid({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

export function Spinner({ className }) {
  return (
    <div
      className={cn(
        "h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-primary",
        className,
      )}
    />
  )
}
