import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../utils/format"

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pageItems = []
  const sibling = 1
  for (let page = 1; page <= totalPages; page++) {
    if (
      page === 1 ||
      page === totalPages ||
      Math.abs(page - currentPage) <= sibling
    ) {
      pageItems.push(page)
    } else if (pageItems[pageItems.length - 1] !== "ellipsis") {
      pageItems.push("ellipsis")
    }
  }

  const buttonClass =
    "flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/60"

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          buttonClass,
          currentPage === 1
            ? "cursor-not-allowed opacity-40"
            : "glass text-muted hover:bg-white/10 hover:text-foreground",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-sm text-muted"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Go to page ${item}`}
            aria-current={currentPage === item ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={cn(
              buttonClass,
              currentPage === item
                ? "bg-linear-to-r from-primary to-accent text-primary-foreground"
                : "glass text-muted hover:bg-white/10 hover:text-foreground",
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          buttonClass,
          currentPage === totalPages
            ? "cursor-not-allowed opacity-40"
            : "glass text-muted hover:bg-white/10 hover:text-foreground",
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

export default Pagination
