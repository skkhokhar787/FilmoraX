import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Play,
  Clock,
  Calendar,
  ArrowLeft,
  Plus,
  Download,
} from "lucide-react";

import Layout from "../layout/Layout";
import Button from "../components/Button";
import Modal from "../components/Modal";
import MovieCast from "../components/MovieCast";
import SimilarMovies from "../components/SimilarMovies";
import { Spinner } from "../components/Loader";

import { getMovieDetails } from "../APIs/getMoviesDetails";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trailerOpen, setTrailerOpen] = useState(false);

  // Fetch movie with React Query
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
  });

  const movie = data?.data?.movie;

  // Scroll to top when movie changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Movie not found / API error
  if (isError || (!isLoading && !movie)) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <h2 className="text-xl font-semibold">
            Movie not found
          </h2>

          <Button onClick={() => navigate("/")}>
            Back to home
          </Button>
        </div>
      </Layout>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner />
        </div>
      </Layout>
    );
  }

  // Get download URL
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

          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-background via-background/40 to-transparent" />

          {/* BACK BUTTON */}
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
        <div className="relative z-10 mx-auto mt-[-35vh] w-full max-w-7xl px-5 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end">

            {/* POSTER */}
            <motion.img
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              src={
                movie.large_cover_image ||
                "/placeholder.svg"
              }
              alt={movie.title}
              className="hidden w-52 rounded-2xl shadow-2xl md:block"
            />


            {/* MOVIE DETAILS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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


              {/* TITLE */}
              <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                {movie.title}
              </h1>


              {/* META INFORMATION */}
              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm">

                {/* RATING */}
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {movie.rating}
                </span>

                {/* YEAR */}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {movie.year}
                </span>

                {/* RUNTIME */}
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {movie.runtime} min
                </span>

              </div>


              {/* DESCRIPTION */}
              <p className="mt-5 max-w-2xl text-muted">
                {movie.description_full ||
                  movie.summary ||
                  "No description available."}
              </p>


              {/* ACTION BUTTONS */}
              <div className="mt-6 flex flex-wrap gap-3">

                {/* DOWNLOAD */}
                <Button
                  icon={<Download className="h-5 w-5" />}
                  onClick={() => {
                    const url = getDownload();

                    if (url) {
                      window.open(url, "_blank");
                    } else {
                      console.log("No torrent available");
                    }
                  }}
                >
                  Download Now
                </Button>


                {/* TRAILER */}
                <Button
                  icon={<Play className="h-5 w-5" />}
                  onClick={() => setTrailerOpen(true)}
                >
                  Watch Trailer
                </Button>


                {/* ADD TO LIST */}
                <Button
                  variant="secondary"
                  icon={<Plus className="h-5 w-5" />}
                >
                  Add to List
                </Button>

              </div>
            </motion.div>
          </div>


          {/* CAST */}
          <MovieCast id={id} />


          {/* SIMILAR MOVIES */}
          <SimilarMovies
            movieId={movie.id}
            genres={movie.genres}
          />
        </div>


        {/* TRAILER MODAL */}
        <Modal
          open={trailerOpen}
          onClose={() => setTrailerOpen(false)}
          title={`${movie.title} Trailer`}
        >
          <div className="aspect-video w-full bg-black">
            {trailerOpen && movie.yt_trailer_code && (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${movie.yt_trailer_code}?autoplay=1`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </Modal>

      </div>
    </Layout>
  );
}

export default MovieDetails;