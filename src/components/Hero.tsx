import { Heart, ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="hero-texture relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pfsa-blue via-pfsa-teal to-pfsa-blue">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Logo */}
        <div className="mb-8 animate-[breathe_4s_ease-in-out_infinite]">
          <Heart className="mx-auto h-20 w-20 text-pfsa-gold fill-pfsa-teal stroke-pfsa-gold" />
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-wide text-white sm:text-5xl md:text-6xl">
          THE PUBLIC FOUNDATION
          <br />
          <span className="text-3xl font-medium sm:text-4xl md:text-5xl">
            for Stewardship Advancement
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 font-heading text-2xl font-medium italic tracking-widest text-pfsa-gold sm:text-3xl">
          See a Need, Meet a Need
        </p>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
          Extending compassion and practical support to individuals and families
          experiencing financial hardship
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#donate"
            className="btn-gold rounded-full px-10 py-4 text-lg font-semibold tracking-wide no-underline"
          >
            Donate Now
          </a>
          <a
            href="#about"
            className="rounded-full border-2 border-white/40 px-10 py-4 text-lg font-semibold tracking-wide text-white transition-all hover:border-white hover:bg-white/10 no-underline"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 transition-colors hover:text-pfsa-gold no-underline"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </a>

      {/* Breathe animation */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </section>
  )
}
