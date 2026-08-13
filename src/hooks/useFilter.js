import { useContext } from "react";
import { FilterContext } from "../utils/AppContext";

export const useFilter = () => useContext(FilterContext);