import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { ScrollAnimation } from './ScrollAnimation'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value

    window.location.href = `mailto:info@thepfsa.org?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-pfsa-light py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollAnimation>
          <h2 className="font-heading text-center text-4xl font-bold text-pfsa-blue sm:text-5xl">
            Get In Touch
          </h2>
        </ScrollAnimation>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <ScrollAnimation delay={100}>
            <div className="space-y-6">
              <a
                href="mailto:info@thepfsa.org"
                className="flex items-center gap-4 text-lg text-gray-700 transition-colors hover:text-pfsa-teal no-underline"
              >
                <Mail className="h-6 w-6 shrink-0 text-pfsa-teal" />
                info@thepfsa.org
              </a>
              <a
                href="tel:859-314-3051"
                className="flex items-center gap-4 text-lg text-gray-700 transition-colors hover:text-pfsa-teal no-underline"
              >
                <Phone className="h-6 w-6 shrink-0 text-pfsa-teal" />
                859-314-3051
              </a>
              <div className="flex items-start gap-4 text-lg text-gray-700">
                <MapPin className="h-6 w-6 shrink-0 text-pfsa-teal mt-1" />
                <span>3040 Sewanee Lane, Lexington, KY 40509</span>
              </div>
              <div className="mt-8 rounded-xl border border-pfsa-gold/20 bg-white p-6">
                <p className="text-sm leading-relaxed text-gray-600">
                  The PFSA, Inc. is registered in Kentucky (Org #0628008) and recognized by the
                  IRS as a 501(c)(3) public charity (Publication 78 Listed).
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation delay={200}>
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-2xl bg-white p-10 shadow-md">
                <div className="text-center">
                  <h3 className="font-heading text-2xl font-bold text-pfsa-green">
                    Thank You!
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Your email client should open with a pre-filled message. If it didn't,
                    please email us directly at{' '}
                    <a href="mailto:info@thepfsa.org" className="text-pfsa-teal hover:underline">
                      info@thepfsa.org
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white p-8 shadow-md"
              >
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-pfsa-teal focus:ring-2 focus:ring-pfsa-teal/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-pfsa-teal focus:ring-2 focus:ring-pfsa-teal/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-pfsa-teal focus:ring-2 focus:ring-pfsa-teal/20 focus:outline-none resize-y"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-gold w-full rounded-full py-3.5 text-lg font-semibold border-none cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
