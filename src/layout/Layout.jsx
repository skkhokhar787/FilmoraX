import { motion } from "framer-motion"
import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout({ children, fullBleed = false }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1"
      >
        {fullBleed ? (
          children
        ) : (
          <div className="mx-auto w-full max-w-7xl px-5 pt-24 md:px-10">
            {children}
          </div>
        )}
      </motion.main>
      <Footer />
    </div>
  )
}

export default Layout
