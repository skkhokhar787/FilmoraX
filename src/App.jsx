import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import FilterProvider from "./provider/FilterProvider";
import { RatingProvider } from "./provider/RatingProvider";

function App() {
  const location = useLocation();

  return (
    <FilterProvider>
      <RatingProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </RatingProvider>
    </FilterProvider>
  );
}

export default App;
