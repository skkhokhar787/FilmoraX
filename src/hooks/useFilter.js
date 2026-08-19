import { useContext } from "react";
import { FilterContext } from "../context/AppContext";
import { RatingContext } from "../context/RatingContext";

export const useFilter = () => useContext(FilterContext);

export const useRating = () => useContext(RatingContext)