export const getMovies = async ({
  query,
  genre,
  minRating,
  page = 1,
  limit = 20,
} = {}) => {
  const params = new URLSearchParams();
  if (query) params.set("query_term", query);
  if (genre) params.set("genre", genre);
  if (minRating) params.set("minimum_rating", minRating);
  params.set("page", page);
  params.set("limit", limit);

  const response = await fetch(
    `https://movies-api.accel.li/api/v2/list_movies.json?${params}`,
  );
  const data = await response.json();

  return { movies: data.data.movies || [], movieCount: data.data.movie_count };
};
