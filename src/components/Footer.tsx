import { Heart } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Impact', href: '#impact' },
  { label: 'Donate', href: '#donate' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="bg-pfsa-blue text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pfsa-gold fill-pfsa-teal" />
              <span className="font-heading text-xl font-bold tracking-wide">THE PFSA</span>
            </div>
            <p className="mt-2 font-heading text-sm italic text-pfsa-gold tracking-wide">
              See a Need, Meet a Need
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Extending compassion and practical support to individuals and families experiencing
              financial hardship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-pfsa-gold">Quick Links</h3>
            <ul className="mt-4 space-y-2 list-none p-0">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-pfsa-gold no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-bold text-pfsa-gold">Contact</h3>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <p>
                <a href="mailto:info@thepfsa.org" className="hover:text-pfsa-gold no-underline text-white/70">
                  info@thepfsa.org
                </a>
              </p>
              <p>
                <a href="tel:859-314-3051" className="hover:text-pfsa-gold no-underline text-white/70">
                  859-314-3051
                </a>
              </p>
              <p>3040 Sewanee Lane<br />Lexington, KY 40509</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/50">
          <p>&copy; 2026 The Public Foundation for Stewardship Advancement, Inc.</p>
          <p className="mt-1">
            EIN: 20-3856434 &nbsp;|&nbsp; 501(c)(3) Public Charity &nbsp;|&nbsp; Publication 78 Listed &nbsp;|&nbsp; Deductibility Code: PC
          </p>
        </div>
      </div>
    </footer>
  )
}
