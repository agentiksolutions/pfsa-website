import { HeartHandshake, LifeBuoy, Building } from 'lucide-react'
import { ScrollAnimation } from './ScrollAnimation'

const PROGRAMS = [
  {
    icon: HeartHandshake,
    title: 'Hands of Hope',
    description:
      'Direct financial assistance to individuals and families for utilities, food, transportation, medical needs, and essential living expenses. We believe no one should face hardship alone.',
  },
  {
    icon: LifeBuoy,
    title: 'Recovery & Reentry Support',
    description:
      'Advancing recovery and reentry initiatives by tracking open beds, entry requirements, and job opportunities for people transitioning out of treatment programs and back into their communities.',
  },
  {
    icon: Building,
    title: 'Nonprofit Capacity Building',
    description:
      'Providing back-of-house support for other nonprofits including grants management, compliance assistance, fundraising systems, and organizational training.',
  },
]

export function Programs() {
  return (
    <section id="programs" className="bg-pfsa-light py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollAnimation>
          <h2 className="font-heading text-center text-4xl font-bold text-pfsa-blue sm:text-5xl">
            What We Do
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            PFSA serves communities through three core initiatives
          </p>
        </ScrollAnimation>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {PROGRAMS.map((program, i) => (
            <ScrollAnimation key={program.title} delay={150 * (i + 1)}>
              <div className="group flex h-full flex-col rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pfsa-green/10">
                  <program.icon className="h-7 w-7 text-pfsa-green" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-pfsa-blue">
                  {program.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-gray-600">
                  {program.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
