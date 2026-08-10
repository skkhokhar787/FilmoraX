import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Play,
  Clock,
  Calendar,
  ArrowLeft,
  Plus,
  Cast,
  Download,
} from "lucide-react";

import Layout from "../layout/Layout";
import Button from "../components/Button";
import MovieCast from "../components/MovieCast";
import Modal from "../components/Modal";
import { Spinner } from "../components/Loader";
import { getMovieDetails } from "../APIs/getMoviesDetails";
import { formatRating, formatRuntime } from "../utils/format";
import SimilarMovies from "../components/SimilarMovies";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data.data.movie);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    window.scrollTo(0, 0);
  }, [id]);
  console.log(movie?.torrents[0].url);

  if (!loading && !movie) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <h2 className="text-xl font-semibold">Movie not found</h2>
          <Button onClick={() => navigate("/")}>Back to home</Button>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner />
        </div>
      </Layout>
    );
  }

  const getDownload = () => {
    return movie?.torrents?.[0]?.url;
  };

  return (
    <Layout fullBleed>
      <div className="relative">
        {/* BACKDROP */}
        <div className="relative h-[70vh] w-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9 }}
            src={
              movie.background_image_original ||
              movie.background_image ||
              "/placeholder.svg"
            }
            alt={movie.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="absolute left-5 top-20 z-10 md:left-10">
            <Link to="/">
              <Button
                variant="secondary"
                size="sm"
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                Back
              </Button>
            </Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 mx-auto -mt-[35vh] w-full max-w-7xl px-5 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end">
            {/* POSTER */}
            <motion.img
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              src={movie.large_cover_image || "/placeholder.svg"}
              alt={movie.title}
              className="hidden w-52 rounded-2xl shadow-2xl md:block"
            />

            {/* DETAILS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              {/* GENRES */}
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                {movie.title}
              </h1>

              {/* META */}
              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {formatRating(movie.rating)}
                </span>

                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {movie.year}
                </span>

                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatRuntime(movie.runtime)}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-5 max-w-2xl text-muted">
                {movie.description_full || movie.summary || "No description"}
              </p>

              {/* ACTIONS */}
              <div className="mt-6 flex gap-3">
                <Button
                  icon={<Download className="h-5 w-5" />}
                  onClick={() => {
                    const url = getDownload();

                    if (url) {
                      window.open(url, "_blank"); // ✅ THIS triggers download
                    } else {
                      console.log("No torrent available");
                    }
                  }}
                >
                  Download Now
                </Button>
                <Button
                  icon={<Play className="h-5 w-5" />}
                  onClick={() => setTrailerOpen(true)}
                >
                  Watch Trailer
                </Button>

                <Button variant="secondary" icon={<Plus />}>
                  Add to List
                </Button>
              </div>
            </motion.div>
          </div>
          <MovieCast id={id} />
          <SimilarMovies movieId={movie.id} genres={movie.genres} />
        </div>

        {/* TRAILER MODAL */}
      </div>
      <Modal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        title={`${movie.title} Trailer`}
      >
        <div className="aspect-video w-full bg-black">
          {trailerOpen && (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${movie.yt_trailer_code}?autoplay=1`}
              title="Trailer"
              allowFullScreen
            />
          )}
        </div>
      </Modal>
    </Layout>
  );
}

export default MovieDetails;
