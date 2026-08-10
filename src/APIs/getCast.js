const API_URL = "https://movies-api.accel.li/api/v2/movie_details.json"

export const getCast = async (id) => {
  try {
    const res = await fetch(
      `${API_URL}?movie_id=${id}&with_images=true&with_cast=true`
    )

    if (!res.ok) {
      throw new Error("Failed to fetch cast")
    }

    const text = await res.text()
    if (!text) return []

    const data = JSON.parse(text)

    return data?.data?.movie?.cast || []
  } catch (err) {
    console.error("Cast Error:", err)
    return []
  }
}
