import { useEffect, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Search from "./pages/Search"
import NotFound from "./pages/NotFound"
import { getMovies } from "./APIs/getMovies"
import { useDebounce } from "./hooks/useDebounce"
import { allGenres } from "./data/movies"

const PAGE_SIZE = 12

function App() {
  const location = useLocation()
  const [query, setQuery] = useState("")
  const [activeGenre, setActiveGenre] = useState("All")
  const [minRating, setMinRating] = useState(0)
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [movieCount, setMovieCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const debouncedQuery = useDebounce(query, 250)

  useEffect(() => {
    if (location.pathname !== "/search") return

    let isMounted = true
    setLoading(true)

    getMovies({
      query: debouncedQuery || undefined,
      genre: activeGenre === "All" ? undefined : activeGenre,
      minRating: minRating || undefined,
      page,
      limit: PAGE_SIZE,
    })
      .then((data) => {
        if (!isMounted) return
        setMovies(data.movies)
        setMovieCount(data.movieCount)
        setLoading(false)
      })
      .catch(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [debouncedQuery, activeGenre, minRating, page, location.pathname])

  const handleQueryChange = (value) => {
    setQuery(value)
    setPage(1)
  }
  const handleGenreChange = (genre) => {
    setActiveGenre(genre)
    setPage(1)
  }
  const handleRatingChange = (rating) => {
    setMinRating(rating)
    setPage(1)
  }
  const handleReset = () => {
    setQuery("")
    setActiveGenre("All")
    setMinRating(0)
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(movieCount / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const searchProps = {
    query,
    movies,
    genres: allGenres,
    loading,
    movieCount,
    activeGenre,
    minRating,
    page: currentPage,
    totalPages,
    onQueryChange: handleQueryChange,
    onGenreChange: handleGenreChange,
    onRatingChange: handleRatingChange,
    onReset: handleReset,
    onPageChange: setPage,
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search {...searchProps} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
