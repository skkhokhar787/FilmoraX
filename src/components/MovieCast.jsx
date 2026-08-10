import React from "react";
import { useState, useEffect } from "react";
import { getCast } from "../APIs/getCast";
import { Spinner } from "./Loader";

function MovieCast({ id }) {
  const [cast, setCast] = useState([])

  useEffect(() => {
    if (!id) return
    const fetchCast = async () => {
      const data = await getCast(id)
      setCast(data)
    }
    fetchCast()
  }, [id])

  if (cast.length === 0) return null

  return (
    <div>
     <section className="mt-20">
            <h2 className="mb-6 text-2xl font-bold">CAST</h2>
          </section>
    <div className="flex gap-4 overflow-x-auto ">
      {cast.map((actor, index) => (
        <div key={index} className="text-center min-w-20">
          <img
            src={actor.url_small_image || "/placeholder.svg"}
            alt={actor.name}
            className="w-16 h-16 rounded-full object-cover mx-auto"
          />
          <p className="text-xs mt-1 font-medium">{actor.name}</p>
          <p className="text-[10px] text-gray-400">{actor.character_name}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default MovieCast;
