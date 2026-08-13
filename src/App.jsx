import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { getMovies } from "./APIs/getMovies";
import { useDebounce } from "./hooks/useDebounce";
import FilterProvider from "./provider/FilterProvider";
import { useFilter } from "./hooks/useFilter";


function App() {
  
  const location = useLocation();

  return (
    <FilterProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </FilterProvider>
  );
}

export default App;
