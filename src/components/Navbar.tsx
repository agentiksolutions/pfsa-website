import { useState, useEffect } from 'react'
import { Menu, X, Heart } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Impact', href: '#impact' },
  { label: 'Donate', href: '#donate' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-pfsa-blue shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-white no-underline">
            <Heart className="h-7 w-7 text-pfsa-gold fill-pfsa-teal" />
            <span className="font-heading text-xl font-bold tracking-wide">
              THE PFSA
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-white/80 transition-colors hover:text-pfsa-gold no-underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#donate"
              className="btn-gold rounded-full px-6 py-2.5 text-sm font-semibold no-underline"
            >
              Donate Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden bg-transparent border-none cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-pfsa-blue shadow-2xl transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white bg-transparent border-none cursor-pointer p-1"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="rounded-lg px-4 py-3 text-lg font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-pfsa-gold no-underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#donate"
              onClick={handleLinkClick}
              className="btn-gold mt-4 rounded-full px-6 py-3 text-center text-lg font-semibold no-underline"
            >
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
