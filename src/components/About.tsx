import { Calendar, ShieldCheck, MapPin } from 'lucide-react'
import { ScrollAnimation } from './ScrollAnimation'

const STATS = [
  { icon: Calendar, label: 'Founded 2005', description: 'Two decades of service' },
  { icon: ShieldCheck, label: '501(c)(3) Nonprofit', description: 'Tax-deductible giving' },
  { icon: MapPin, label: 'Lexington, KY', description: 'Serving our community' },
]

export function About() {
  return (
    <section id="about" className="bg-pfsa-warm py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollAnimation>
          <h2 className="font-heading text-center text-4xl font-bold text-pfsa-blue sm:text-5xl">
            Our Mission
          </h2>
        </ScrollAnimation>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Mission Statement */}
          <ScrollAnimation delay={100}>
            <p className="text-lg leading-relaxed text-gray-700">
              At the Public Foundation for Stewardship Advancement, our mission is to extend
              compassion and practical support to individuals and families experiencing financial
              hardship. We believe stewardship is more than generosity — it's the responsibility
              to uplift others through tangible acts of care.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              PFSA exists to connect resources with real needs in our communities, empowering
              people to overcome temporary struggles and regain stability through hope, dignity,
              and faith-driven service.
            </p>
          </ScrollAnimation>

          {/* Vision Card */}
          <ScrollAnimation delay={200}>
            <div className="rounded-2xl border border-pfsa-gold/20 bg-gradient-to-br from-pfsa-light to-white p-8 shadow-lg">
              <h3 className="font-heading text-2xl font-bold text-pfsa-teal">Our Vision</h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-700 italic">
                "To build a culture of stewardship where generosity becomes a way of life,
                ensuring that no need goes unmet when the community comes together with
                compassion and purpose."
              </p>
            </div>
          </ScrollAnimation>
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <ScrollAnimation key={stat.label} delay={100 * (i + 1)}>
              <div className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-md transition-shadow hover:shadow-lg">
                <stat.icon className="h-10 w-10 text-pfsa-green" />
                <h3 className="mt-4 font-heading text-xl font-bold text-pfsa-blue">
                  {stat.label}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
