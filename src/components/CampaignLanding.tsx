import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ArrowLeft, ExternalLink } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface Campaign {
  id: string
  name: string
  slug: string
  description: string | null
  goal_amount: number
  raised_amount: number
  status: string
  cover_image_url: string | null
  theme_color: string
  landing_page_enabled: boolean
}

export function CampaignLanding() {
  const { slug } = useParams<{ slug: string }>()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchCampaign() {
      if (!slug) return
      setLoading(true)
      try {
        const { data, error: fetchError } = await supabase
          .from('campaigns')
          .select('*')
          .eq('slug', slug)
          .eq('landing_page_enabled', true)
          .single()

        if (fetchError || !data) {
          setError(true)
          return
        }
        setCampaign(data as Campaign)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaign()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-pfsa-light flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 text-pfsa-gold mx-auto animate-pulse" />
          <p className="mt-4 text-pfsa-blue font-heading text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-pfsa-light flex flex-col items-center justify-center px-6">
        <Heart className="h-12 w-12 text-pfsa-gold mb-4" />
        <h1 className="font-heading text-2xl font-bold text-pfsa-blue mb-2">
          Campaign Not Found
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          This campaign page doesn't exist or isn't publicly available.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-pfsa-blue hover:text-pfsa-gold transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    )
  }

  const percentage = campaign.goal_amount > 0
    ? Math.min((Number(campaign.raised_amount) / Number(campaign.goal_amount)) * 100, 100)
    : 0

  return (
    <div className="min-h-screen bg-pfsa-light">
      {/* Header */}
      <header className="bg-pfsa-blue text-white">
        <div className="mx-auto max-w-4xl px-6 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Heart className="h-6 w-6 text-pfsa-gold fill-pfsa-teal" />
            <span className="font-heading text-lg font-bold tracking-wide">THE PFSA</span>
          </Link>
          <span className="font-heading text-sm italic text-pfsa-gold tracking-wide hidden sm:block">
            See a Need, Meet a Need
          </span>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative py-20 px-6"
        style={{ backgroundColor: campaign.theme_color + '15' }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-pfsa-blue mb-4">
            {campaign.name}
          </h1>
          {campaign.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {campaign.description}
            </p>
          )}
        </div>
      </section>

      {/* Goal Thermometer */}
      {campaign.goal_amount > 0 && (
        <section className="py-12 px-6">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Raised</p>
                  <p className="text-3xl font-bold" style={{ color: campaign.theme_color }}>
                    ${Number(campaign.raised_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Goal</p>
                  <p className="text-xl font-semibold text-gray-700">
                    ${Number(campaign.goal_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="h-6 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: campaign.theme_color,
                  }}
                />
              </div>
              <p className="mt-2 text-right text-sm font-medium" style={{ color: campaign.theme_color }}>
                {percentage.toFixed(0)}%
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Donate CTA */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-pfsa-blue mb-4">
            Support This Campaign
          </h2>
          <p className="text-gray-600 mb-8">
            Your generous gift helps us make a lasting impact. Every dollar counts.
          </p>
          <a
            href="https://www.thepfsa.org/#donate"
            className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold"
          >
            Donate Now
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pfsa-blue text-white py-8 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-pfsa-gold fill-pfsa-teal" />
            <span className="font-heading text-lg font-bold tracking-wide">THE PFSA, INC.</span>
          </div>
          <p className="text-sm text-white/70 mb-1">
            3040 Sewanee Lane, Lexington, KY 40509
          </p>
          <p className="text-sm text-white/70 mb-1">
            info@thepfsa.org | 859-314-3051
          </p>
          <p className="text-xs text-white/50 mt-3">
            EIN: 20-3856434 | 501(c)(3) Tax-Exempt Organization
          </p>
        </div>
      </footer>
    </div>
  )
}
