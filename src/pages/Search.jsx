import { motion } from "framer-motion"
import { Search as SearchIcon } from "lucide-react"
import Layout from "../layout/Layout"
import SidebarFilter from "../components/SidebarFilter"
import MovieGrid from "../components/MovieGrid"
import EmptyState from "../components/EmptyState"
import { SkeletonGrid } from "../components/Loader"
import Pagination from "../components/Pagination"

function Search({
  query,
  movies,
  genres,
  loading,
  movieCount,
  activeGenre,
  minRating,
  page,
  totalPages,
  onQueryChange,
  onGenreChange,
  onRatingChange,
  onReset,
  onPageChange,
}) {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Explore Movies
        </h1>
        <p className="mt-2 text-muted">
          Search the catalog and refine by genre and rating.
        </p>

<div className="relative mt-6">
          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by title or genre..."
            autoFocus
            className="w-full rounded-2xl glass py-4 pl-14 pr-5 text-base text-foreground outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-primary/60"
          />
        </div>
      </motion.div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <SidebarFilter
          genres={genres}
          activeGenre={activeGenre}
          onGenreChange={onGenreChange}
          minRating={minRating}
          onRatingChange={onRatingChange}
          onReset={onReset}
        />

        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted">
              {loading
                ? "Loading movies..."
                : `${movieCount} ${movieCount === 1 ? "result" : "results"}`}
            </p>
          </div>
          {loading ? (
            <SkeletonGrid count={5} />
          ) : movies.length > 0 ? (
            <>
              <MovieGrid movies={movies} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Search
