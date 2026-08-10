import { useEffect, useState } from "react"
import MovieGrid from "./MovieGrid"
import { Spinner } from "./Loader"
import { getMovies } from "../APIs/getMovies"

function SimilarMovies({ movieId, genres }) {
  const primaryGenre = genres?.[0] ?? ""
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!primaryGenre) return

    let isMounted = true
    setLoading(true)

    getMovies({ genre: primaryGenre, limit: 20 })
      .then((data) => {
        if (!isMounted) return
        setMovies(
          data.movies.filter((movie) => movie.id !== movieId).slice(0, 10),
        )
        setLoading(false)
      })
      .catch(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [movieId, primaryGenre])

  if (loading) {
    return (
      <section className="mt-20">
        <h2 className="mb-6 text-2xl font-bold">Similar Movies</h2>
        <div className="flex items-center justify-center py-16">
          <Spinner />
        </div>
      </section>
    )
  }

  if (movies.length === 0) return null

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-2xl font-bold">Similar Movies</h2>
      <MovieGrid movies={movies} />
    </section>
  )
}

export default SimilarMovies
