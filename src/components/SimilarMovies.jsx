import { useQuery } from "@tanstack/react-query";

import MovieGrid from "./MovieGrid";
import { Spinner } from "./Loader";
import { getMovies } from "../APIs/getMovies";

function SimilarMovies({ movieId, genres }) {
  const primaryGenre = genres?.[0] ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["similarMovies", primaryGenre, movieId],
    queryFn: () =>
      getMovies({
        genre: primaryGenre,
        limit: 20,
      }),
    enabled: !!primaryGenre,
  });

  const movies =
    data?.movies?.filter((movie) => movie.id !== movieId).slice(0, 10) || [];

  if (isLoading) {
    return (
      <section className="mt-20">
        <h2 className="mb-6 text-2xl font-bold">Similar Movies</h2>

        <div className="flex items-center justify-center py-16">
          <Spinner />
        </div>
      </section>
    );
  }

  if (isError || movies.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-2xl font-bold">Similar Movies</h2>

      <MovieGrid movies={movies} />
    </section>
  );
}

export default SimilarMovies;
