import { create } from "zustand";

const useMoviesStore = create((set) => ({
  // Search
  query: "",

  // Filters
  selectedGenre: "all",
  minRating: 0,

  // Pagination
  page: 1,

  // Actions
  setQuery: (query) =>
    set({
      query,
      page: 1,
    }),

  setSelectedGenre: (selectedGenre) =>
    set({
      selectedGenre,
      page: 1,
    }),

  setMinRating: (minRating) =>
    set({
      minRating,
      page: 1,
    }),

  setPage: (page) =>
    set({
      page,
    }),

  resetFilters: () =>
    set({
      query: "",
      selectedGenre: "all",
      minRating: 0,
      page: 1,
    }),
}));

export default useMoviesStore;