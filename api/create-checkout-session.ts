import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

const ALLOWED_ORIGINS = [
  'https://www.thepfsa.org',
  'https://thepfsa.org',
]

function getCorsHeaders(origin: string | undefined) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cors = getCorsHeaders(req.headers.origin as string)
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v))

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { amount, campaign, frequency } = req.body as {
      amount: number
      campaign: string
      frequency: 'one-time' | 'monthly' | 'quarterly' | 'annually'
    }

    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Amount must be at least $1' })
    }

    const validCampaigns = ['General Income Fund', 'Grant Income Fund', 'General Expense Fund']
    if (!validCampaigns.includes(campaign)) {
      return res.status(400).json({ error: 'Invalid campaign' })
    }

    const metadata = { campaign, frequency }
    const baseUrl = process.env.VERCEL_ENV === 'production'
      ? 'https://www.thepfsa.org'
      : `https://${req.headers.host}`

    if (frequency === 'one-time') {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        submit_type: 'donate',
        billing_address_collection: 'required',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: Math.round(amount * 100),
              product_data: {
                name: `Donation — ${campaign}`,
                description: `One-time gift to The PFSA, Inc.`,
              },
            },
            quantity: 1,
          },
        ],
        metadata,
        success_url: `${baseUrl}/?success=true`,
        cancel_url: `${baseUrl}/?canceled=true`,
      })

      return res.status(200).json({ url: session.url })
    }

    // Recurring: monthly, quarterly, annually
    const intervalMap: Record<string, { interval: 'month' | 'year'; interval_count: number }> = {
      monthly: { interval: 'month', interval_count: 1 },
      quarterly: { interval: 'month', interval_count: 3 },
      annually: { interval: 'year', interval_count: 1 },
    }

    const { interval, interval_count } = intervalMap[frequency]

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      billing_address_collection: 'required',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(amount * 100),
            recurring: { interval, interval_count },
            product_data: {
              name: `Recurring Donation — ${campaign}`,
              description: `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} gift to The PFSA, Inc.`,
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: { metadata },
      metadata,
      success_url: `${baseUrl}/?success=true`,
      cancel_url: `${baseUrl}/?canceled=true`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err: unknown) {
    console.error('Checkout session error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return res.status(500).json({ error: message })
  }
}
