import { ScrollAnimation } from './ScrollAnimation'
import { CountUp } from './CountUp'

const STATS = [
  { end: 20, suffix: '+', label: 'Years of Service' },
  { end: 13000, prefix: '$', suffix: '+', label: 'Raised in 2025–2026' },
  { end: 254, suffix: '', label: 'Meals Provided' },
  { end: 12, suffix: '+', label: 'Community Partners' },
]

export function Impact() {
  return (
    <section id="impact" className="bg-pfsa-warm py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollAnimation>
          <h2 className="font-heading text-center text-4xl font-bold text-pfsa-blue sm:text-5xl">
            Our Impact
          </h2>
        </ScrollAnimation>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollAnimation key={stat.label} delay={100 * (i + 1)}>
              <div className="text-center">
                <div className="font-heading text-5xl font-bold text-pfsa-gold">
                  <CountUp
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-3 text-lg font-medium text-pfsa-blue">{stat.label}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Quote */}
        <ScrollAnimation delay={300}>
          <blockquote className="mx-auto mt-20 max-w-3xl rounded-2xl border-l-4 border-pfsa-gold bg-pfsa-light p-8">
            <p className="font-heading text-2xl font-medium italic leading-relaxed text-pfsa-teal">
              "Stewardship is more than generosity — it's the responsibility to uplift
              others through tangible acts of care."
            </p>
            <footer className="mt-4 text-sm font-semibold tracking-wide text-pfsa-blue">
              — The PFSA, Inc.
            </footer>
          </blockquote>
        </ScrollAnimation>
      </div>
    </section>
  )
}
