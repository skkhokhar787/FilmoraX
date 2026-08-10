import { Link } from "react-router-dom"
import { Clapperboard, Github, Twitter, Instagram } from "lucide-react"

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Github, label: "GitHub" },
]

function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent">
                <Clapperboard className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                FILMORAX
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Discover, stream, and fall in love with cinema. FILMORAX brings the
              theater to every screen you own.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Browse
              </h4>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                <li>
                  <Link to="/" className="text-muted transition-colors hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="text-muted transition-colors hover:text-foreground">
                    Search
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Company
              </h4>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                <li><span className="text-muted">About</span></li>
                <li><span className="text-muted">Careers</span></li>
                <li><span className="text-muted">Press</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} FILMORAX. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-muted transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
