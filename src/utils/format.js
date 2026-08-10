export const cn = (...classes) => classes.filter(Boolean).join(" ")

export const formatRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export const formatRating = (rating) => rating
