import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Clapperboard, Home } from "lucide-react"
import Layout from "../layout/Layout"
import Button from "../components/Button"

function NotFound() {
  return (
    <Layout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-primary to-accent shadow-2xl shadow-primary/30"
        >
          <Clapperboard className="h-12 w-12 text-primary-foreground" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-display mt-8 text-7xl font-extrabold tracking-tight md:text-8xl"
        >
          <span className="text-gradient">404</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-4 max-w-md text-pretty leading-relaxed text-muted"
        >
          The scene you&apos;re looking for got cut from the final edit. Let&apos;s
          get you back to the feature presentation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-8"
        >
          <Link to="/">
            <Button size="lg" icon={<Home className="h-5 w-5" />}>
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  )
}

export default NotFound
