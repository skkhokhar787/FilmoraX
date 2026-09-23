import { motion } from "framer-motion";
import { SlidersHorizontal, Star } from "lucide-react";

import Button from "./Button";
import { cn } from "../utils/format";
import { allGenres } from "../data/movies";
import useMoviesStore from "../store/moviesStore";

function SidebarFilter() {
  const {
    selectedGenre,
    minRating,
    setSelectedGenre,
    setMinRating,
    resetFilters,
  } = useMoviesStore();

  const ratingOptions = [0, 7, 8, 9];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="h-fit rounded-2xl glass p-6"
    >
      <div className="flex items-center gap-2 text-sm font-semibold">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        Filters
      </div>

      {/* Genre */}
      <div className="mt-6">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Genre
        </h4>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGenre("all")}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              selectedGenre === "all"
                ? "bg-linear-to-r from-primary to-accent text-primary-foreground"
                : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground"
            )}
          >
            All
          </button>

          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                selectedGenre === genre
                  ? "bg-linear-to-r from-primary to-accent text-primary-foreground"
                  : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground"
              )}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mt-6">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Minimum Rating
        </h4>

        <div className="flex flex-col gap-2">
          {ratingOptions.map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
                minRating === rating
                  ? "bg-white/10 text-foreground"
                  : "text-muted hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Star
                className={cn(
                  "h-4 w-4",
                  minRating === rating
                    ? "fill-primary text-primary"
                    : "text-muted"
                )}
              />

              {rating === 0 ? "Any rating" : `${rating}+ and above`}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="ghost"
        size="sm"
        className="mt-6 w-full"
        onClick={resetFilters}
      >
        Reset filters
      </Button>
    </motion.aside>
  );
}

export default SidebarFilter;