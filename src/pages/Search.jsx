import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import Layout from "../layout/Layout";
import SidebarFilter from "../components/SidebarFilter";
import MovieGrid from "../components/MovieGrid";
import EmptyState from "../components/EmptyState";
import { SkeletonGrid } from "../components/Loader";
import Pagination from "../components/Pagination";

import { useDebounce } from "../hooks/useDebounce";
import { getMovies } from "../APIs/getMovies";
import useMoviesStore from "../store/moviesStore";

function Search() {
  const PAGE_SIZE = 12;

  const [movies, setMovies] = useState([]);
  const [movieCount, setMovieCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const {
    query,
    selectedGenre,
    minRating,
    page,
    setQuery,
    setPage,
  } = useMoviesStore();

  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      setLoading(true);

      try {
        const data = await getMovies({
          query: debouncedQuery || undefined,
          genre:
            selectedGenre === "all"
              ? undefined
              : selectedGenre,
          minRating: minRating || undefined,
          page,
          limit: PAGE_SIZE,
        });

        if (!isMounted) return;

        setMovies(data.movies || []);
        setMovieCount(data.movieCount || 0);
      } catch (error) {
        console.error("Failed to fetch movies:", error);

        if (isMounted) {
          setMovies([]);
          setMovieCount(0);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [
    debouncedQuery,
    selectedGenre,
    minRating,
    page,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(movieCount / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

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
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or genre..."
            autoFocus
            className="w-full rounded-2xl glass py-4 pl-14 pr-5 text-base text-foreground outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-primary/60"
          />
        </div>
      </motion.div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <SidebarFilter />

        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted">
              {loading
                ? "Loading movies..."
                : `${movieCount} ${
                    movieCount === 1
                      ? "result"
                      : "results"
                  }`}
            </p>
          </div>

          {loading ? (
            <SkeletonGrid count={5} />
          ) : movies.length > 0 ? (
            <>
              <MovieGrid movies={movies} />

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Search;