import { CreditCard, Smartphone, Mail, Landmark, HandCoins, CalendarHeart } from 'lucide-react'
import { ScrollAnimation } from './ScrollAnimation'

const GIVE_LIVELY_URL =
  'https://secure.givelively.org/donate/the-public-foundation-for-stewardship-advancement-inc'

const OTHER_WAYS = [
  {
    icon: Smartphone,
    title: 'Venmo',
    detail: '@ThePFSA',
    description: 'Send via Venmo app',
  },
  {
    icon: CreditCard,
    title: 'Zelle',
    detail: 'info@thepfsa.org',
    description: 'Send through your bank',
  },
  {
    icon: Landmark,
    title: 'PayPal',
    detail: 'Scan QR code or click to donate',
    description: 'Secure PayPal payment',
  },
  {
    icon: Mail,
    title: 'Check',
    detail: 'Make payable to: The PFSA, Inc.',
    description: '3040 Sewanee Lane, Lexington, KY 40509',
  },
  {
    icon: HandCoins,
    title: 'Donor-Advised Fund',
    detail: 'DAF, stock transfer, or in-kind',
    description: 'Contact us to coordinate',
  },
  {
    icon: CalendarHeart,
    title: 'Monthly Giving',
    detail: 'Become a PFSA Monthly Partner',
    description: 'Sustainable recurring support',
    link: GIVE_LIVELY_URL,
  },
]

export function Donate() {
  return (
    <section id="donate" className="relative overflow-hidden py-24">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-pfsa-light via-white to-pfsa-light" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <ScrollAnimation>
          <h2 className="font-heading text-center text-4xl font-bold text-pfsa-blue sm:text-5xl">
            Support Our Mission
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">
            Every gift makes a difference. Your generosity helps us meet real needs in our community.
          </p>
        </ScrollAnimation>

        {/* Primary CTA */}
        <ScrollAnimation delay={150}>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border-2 border-pfsa-gold/30 bg-white p-10 text-center shadow-xl">
            <h3 className="font-heading text-3xl font-bold text-pfsa-blue">Donate Online</h3>
            <p className="mt-3 text-gray-600">
              Secure online giving powered by Give Lively
            </p>
            <a
              href={GIVE_LIVELY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-6 inline-block rounded-full px-12 py-4 text-xl font-bold tracking-wide no-underline"
            >
              Give Now
            </a>
            <p className="mt-6 text-xs text-gray-500">
              PFSA is a registered 501(c)(3). All donations are tax-deductible.
              <br />
              EIN: 20-3856434
            </p>
          </div>
        </ScrollAnimation>

        {/* Other Ways to Give */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_WAYS.map((way, i) => (
            <ScrollAnimation key={way.title} delay={100 * (i + 1)}>
              <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <way.icon className="h-6 w-6 shrink-0 text-pfsa-teal" />
                  <h4 className="font-heading text-xl font-bold text-pfsa-blue">
                    {way.title}
                  </h4>
                </div>
                <p className="mt-3 font-semibold text-pfsa-green">{way.detail}</p>
                <p className="mt-1 flex-1 text-sm text-gray-500">{way.description}</p>
                {way.link && (
                  <a
                    href={way.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-sm font-medium text-pfsa-gold hover:underline no-underline"
                  >
                    Set up recurring gift &rarr;
                  </a>
                )}
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Gift Designation */}
        <ScrollAnimation delay={400}>
          <div className="mx-auto mt-12 max-w-3xl rounded-xl bg-pfsa-blue/5 p-6 text-center">
            <p className="text-sm leading-relaxed text-gray-600">
              Gifts can be designated as <strong>Unrestricted</strong> (used where most needed)
              or <strong>Program-Restricted</strong> toward Recovery Resource Transparency or
              Nonprofit Capacity Building.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
