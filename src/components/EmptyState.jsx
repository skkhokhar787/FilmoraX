import { motion } from "framer-motion"
import { SearchX } from "lucide-react"

function EmptyState({
  title = "No results found",
  message = "Try adjusting your search or filters to find what you're looking for.",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center gap-4 py-24 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full glass">
        <SearchX className="h-9 w-9 text-primary" />
      </div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted">{message}</p>
    </motion.div>
  )
}

export default EmptyState
