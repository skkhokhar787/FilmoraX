export const getMovieDetails = async (id) => {
  const res = await fetch(
    `https://movies-api.accel.li/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`,
  )
  const data = await res.json()
  return data
}
