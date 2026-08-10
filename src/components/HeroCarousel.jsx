import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Star, Download, ChevronLeft, ChevronRight } from "lucide-react"
import Button from "./Button"
import { formatRating, formatRuntime } from "../utils/format"

function HeroCarousel({ movies }) {
  const [index, setIndex] = useState(0)

  const next = useCallback(
    () => setIndex((prev) => (prev + 1) % movies.length),
    [movies.length],
  )
  const prev = () =>
    setIndex((current) => (current - 1 + movies.length) % movies.length)

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const active = movies[index]

  return (
    <section className="relative h-[45vh] min-h-90 w-full overflow-hidden md:h-[40vh] md:min-h-105">
      <AnimatePresence mode="sync">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={active.backdrop || "/placeholder.svg"}
            alt={`${active.title} backdrop`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-primary">
              Featured
            </span>
            <h1 className="font-display mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {active.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                {formatRating(active.rating)}
              </span>
              <span>{active.year}</span>
              <span>{formatRuntime(active.runtime)}</span>
              <span className="hidden sm:inline">{active.genres.join(" · ")}</span>
            </div>
            <p className="mt-4 line-clamp-2 max-w-lg text-pretty text-sm leading-relaxed text-muted md:text-base">
              {active.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to={`/movie/${active.id}`}>
              <Button variant="secondary" size="lg">
                More Info
              </Button>
            </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3 md:right-10">
        <button
          onClick={prev}
          aria-label="Previous featured movie"
          className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {movies.map((movie, dotIndex) => (
            <button
              key={movie.id}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to ${movie.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === index
                  ? "w-8 bg-linear-to-r from-primary to-accent"
                  : "w-1.5 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next featured movie"
          className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground transition-colors hover:bg-white/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export default HeroCarousel
