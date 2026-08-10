import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Star, Play, Download } from "lucide-react"
import { formatRating } from "../utils/format"
import { useState, useEffect } from "react"
import { getMovies } from "../APIs/getMovies"

function MovieCard({ movie }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative">
      <Link
        to={`/movie/${movie.id}`}
        className="block overflow-hidden rounded-2xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
      >
        <div className="relative aspect-2/3 overflow-hidden bg-surface">
          <img
            src={movie.large_cover_image || "/placeholder.svg"}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            {formatRating(movie.rating)}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-primary to-accent shadow-lg shadow-primary/40">
              <Download className="h-6 w-6 fill-primary-foreground text-primary-foreground" />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-display truncate text-sm font-semibold text-foreground">
              {movie.title}
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted">
              {movie.year} · {movie.genres[0]}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default MovieCard
