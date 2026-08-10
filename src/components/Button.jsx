import { motion } from "framer-motion"
import { cn } from "../utils/format"

const variants = {
  primary:
    "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40",
  secondary:
    "glass text-foreground hover:bg-white/10",
  ghost:
    "bg-transparent text-muted hover:text-foreground hover:bg-white/5",
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
}

function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  as: Component = "button",
  ...props
}) {
  return (
    <motion.button
      as={Component}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  )
}

export default Button
