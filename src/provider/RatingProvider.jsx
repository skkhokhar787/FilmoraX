import { useState } from "react";
import { RatingContext } from "../context/RatingContext";

export function RatingProvider({children}) {
    const [selectedRating, setSelectedRating] = useState("any rating");

  return (
    <RatingContext.Provider value={{selectedRating, setSelectedRating}}>
        {children}
    </RatingContext.Provider>
  )
}
