const API_URL =
  "https://movies-api.accel.li/api/v2/movie_suggestions.json";

export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(`${API_URL}?movie_id=${id}`)

    if (!res.ok) {
      throw new Error("Failed to fetch movie")
    }

    const data = await res.json() // ✅ correct usage

    return data
  } catch (err) {
    console.error("API Error:", err)
    return null
  }
}