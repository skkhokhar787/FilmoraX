import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import Layout from "../layout/Layout";
import SidebarFilter from "../components/SidebarFilter";
import MovieGrid from "../components/MovieGrid";
import EmptyState from "../components/EmptyState";
import { SkeletonGrid } from "../components/Loader";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFilter } from "../hooks/useFilter";
import { getMovies } from "../APIs/getMovies";
import { RatingContext } from "../context/RatingContext";

function Search() {
  const PAGE_SIZE = 12;
  const [query, setQuery] = useState("");

  const [minRating, setMinRating] = useState("any rating");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [movieCount, setMovieCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const debouncedQuery = useDebounce(query, 250);

  const { selectedGenre, setSelectedGenre } = useFilter();

  useEffect(() => {
    if (location.pathname !== "/search") return;

    let isMounted = true;
    setLoading(true);

    getMovies({
      query: debouncedQuery || undefined,
      genre: selectedGenre,
      minRating: minRating || undefined,
      page,
      limit: PAGE_SIZE,
    })
      .then((data) => {
        if (!isMounted) return;
        setMovies(data.movies);
        setMovieCount(data.movieCount);
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
    ratingContext(minRating)
  }, [debouncedQuery, selectedGenre, minRating, page, location.pathname]);

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
  };
  const handleGenreChange = (genre) => {
    setActiveGenre(genre);
    setPage(1);
  };
  const handleRatingChange = (rating) => {
    setMinRating(rating);
    setPage(1);
  };
  const handleReset = () => {
    setQuery("");
    setActiveGenre("All");
    setMinRating(0);
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(movieCount / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const searchProps = {
    query,
    movies,

    loading,
    movieCount,
    minRating,
    page: currentPage,
    totalPages,
    onQueryChange: handleQueryChange,

    onRatingChange: handleRatingChange,
    onReset: handleReset,
    onPageChange: setPage,
  };

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
          minRating={minRating}
          onRatingChange={handleRatingChange}
          onReset={handleReset}
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
