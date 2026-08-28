import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, TrendingUp, ArrowRight } from "lucide-react";

import Layout from "../layout/Layout";
import MovieGrid from "../components/MovieGrid";
import { SkeletonGrid } from "../components/Loader";
import { getMovies } from "../APIs/getMovies";
import HeroCarousel from "../components/HeroCarousel";

function SectionHeading({ icon, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex items-center gap-3"
    >
      {icon}
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", "home"],
    queryFn: () => getMovies({ limit: 20 }),
  });

  const movies = data?.movies || [];
  const trending = [...movies].sort((a, b) => b.rating - a.rating);
  const newReleases = movies.filter((movie) => movie.year > 2025);

  const featured = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      rating: movie.rating,
      runtime: movie.runtime,
      genres: movie.genres,
      description: movie.description_full || movie.summary || "",
      backdrop:
        movie.background_image_original ||
        movie.background_image ||
        movie.large_cover_image,
    }));

  return (
    <Layout fullBleed>
      {isLoading || movies.length === 0 ? (
        <div className="h-[45vh] min-h-90 w-full animate-pulse bg-white/5 md:h-[40vh]" />
      ) : (
        <HeroCarousel movies={featured} />
      )}

      <div className="mx-auto w-full max-w-7xl px-5 py-14 md:px-10">
        <section>
          <SectionHeading
            icon={<TrendingUp className="h-5 w-5" />}
            title="Trending Now"
            subtitle="The highest rated films this week"
          />
          {isLoading ? (
            <SkeletonGrid count={10} />
          ) : (
            <MovieGrid movies={trending} />
          )}
        </section>

        <section className="mt-16">
          <SectionHeading
            icon={<Flame className="h-5 w-5" />}
            title="New Releases"
            subtitle="Fresh from the big screen"
          />
          {isLoading ? (
            <SkeletonGrid count={5} />
          ) : (
            <MovieGrid movies={newReleases} />
          )}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-20 overflow-hidden rounded-3xl glass p-8 md:p-14"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative max-w-lg">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Looking for something new to watch?
            </h2>

            <p className="mt-3 text-sm text-muted md:text-base">
              Explore the full catalog and filter by genre and rating.
            </p>

            <Link
              to="/search"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
            >
              Browse all movies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}

export default Home;
