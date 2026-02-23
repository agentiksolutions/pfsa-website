import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// Vercel needs raw body for signature verification
export const config = {
  api: { bodyParser: false },
}

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

async function upsertDonor(email: string, name: string | null, address: Stripe.Address | null | undefined) {
  // Check if donor exists
  const { data: existing } = await supabase
    .from('donors')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (existing) return existing.id

  // Parse name
  let firstName = ''
  let lastName = ''
  if (name) {
    const parts = name.trim().split(/\s+/)
    firstName = parts[0] || ''
    lastName = parts.slice(1).join(' ') || ''
  }

  const { data: newDonor, error } = await supabase
    .from('donors')
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      address: address?.line1 || null,
      city: address?.city || null,
      state: address?.state || null,
      zip: address?.postal_code || null,
      source: 'Website - Stripe',
      type: 'Individual',
    })
    .select('id')
    .single()

  if (error) throw new Error(`Failed to create donor: ${error.message}`)
  return newDonor.id
}

async function createDonation(
  donorId: string,
  amount: number,
  campaign: string,
  transactionRef: string,
) {
  const { error } = await supabase.from('donations').insert({
    donor_id: donorId,
    amount,
    donation_date: new Date().toISOString().split('T')[0],
    campaign: campaign || 'General Income Fund',
    payment_method: 'Stripe',
    transaction_reference: transactionRef,
    receipt_sent: false,
    reconciled: false,
  })

  if (error) throw new Error(`Failed to create donation: ${error.message}`)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const sig = req.headers['stripe-signature'] as string
  if (!sig) return res.status(400).json({ error: 'Missing stripe-signature header' })

  let event: Stripe.Event

  try {
    const rawBody = await readRawBody(req)
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Signature verification failed'
    console.error('Webhook signature verification failed:', message)
    return res.status(400).json({ error: message })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      if (!session.customer_details?.email) {
        console.warn('No email in checkout session, skipping')
        return res.status(200).json({ received: true })
      }

      const email = session.customer_details.email
      const name = session.customer_details.name
      const address = session.customer_details.address
      const campaign = session.metadata?.campaign || 'General Income Fund'
      const amountTotal = (session.amount_total || 0) / 100
      const transactionRef = session.payment_intent as string || session.subscription as string || session.id

      const donorId = await upsertDonor(email, name, address)
      await createDonation(donorId, amountTotal, campaign, transactionRef)

      console.log(`Donation recorded: $${amountTotal} from ${email} for ${campaign}`)
    }

    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object as Stripe.Invoice

      // Only process recurring payments (not the first one, which is handled by checkout.session.completed)
      if (invoice.billing_reason !== 'subscription_cycle') {
        return res.status(200).json({ received: true })
      }

      const email = invoice.customer_email
      if (!email) {
        console.warn('No email in invoice, skipping')
        return res.status(200).json({ received: true })
      }

      // Get campaign from subscription metadata
      let campaign = 'General Income Fund'
      if (invoice.subscription) {
        try {
          const subId = typeof invoice.subscription === 'string'
            ? invoice.subscription
            : invoice.subscription.id
          const subscription = await stripe.subscriptions.retrieve(subId)
          campaign = subscription.metadata?.campaign || 'General Income Fund'
        } catch {
          console.warn('Could not fetch subscription metadata, using default campaign')
        }
      }

      const amountPaid = (invoice.amount_paid || 0) / 100
      const transactionRef = invoice.payment_intent as string || invoice.id

      const donorId = await upsertDonor(email, invoice.customer_name, null)
      await createDonation(donorId, amountPaid, campaign, transactionRef)

      console.log(`Recurring donation recorded: $${amountPaid} from ${email} for ${campaign}`)
    }

    return res.status(200).json({ received: true })
  } catch (err: unknown) {
    console.error('Webhook processing error:', err)
    const message = err instanceof Error ? err.message : 'Processing error'
    return res.status(500).json({ error: message })
  }
}
