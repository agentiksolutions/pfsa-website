import { useState } from 'react'

const PRESET_AMOUNTS = [25, 50, 100, 250, 500]

const CAMPAIGNS = [
  'General Income Fund',
  'Grant Income Fund',
  'General Expense Fund',
]

const FREQUENCIES = [
  { label: 'One-Time', value: 'one-time' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Annually', value: 'annually' },
] as const

type Frequency = (typeof FREQUENCIES)[number]['value']

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [campaign, setCampaign] = useState(CAMPAIGNS[0])
  const [frequency, setFrequency] = useState<Frequency>('one-time')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const donationAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount || 0

  function handlePresetClick(amount: number) {
    setSelectedAmount(amount)
    setIsCustom(false)
    setCustomAmount('')
    setError('')
  }

  function handleCustomFocus() {
    setIsCustom(true)
    setSelectedAmount(null)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (donationAmount < 1) {
      setError('Please enter an amount of at least $1.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: donationAmount, campaign, frequency }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      window.location.href = data.url
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
      {/* Amount Selection */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-pfsa-blue">
          Gift Amount
        </label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handlePresetClick(amt)}
              className={`rounded-lg border-2 px-3 py-2.5 text-sm font-bold transition-all ${
                !isCustom && selectedAmount === amt
                  ? 'border-pfsa-gold bg-pfsa-gold/10 text-pfsa-gold'
                  : 'border-gray-200 text-gray-600 hover:border-pfsa-gold/50'
              }`}
            >
              ${amt}
            </button>
          ))}
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
              $
            </span>
            <input
              type="number"
              min="1"
              step="any"
              placeholder="Other"
              value={customAmount}
              onFocus={handleCustomFocus}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setIsCustom(true)
                setSelectedAmount(null)
              }}
              className={`w-full rounded-lg border-2 py-2.5 pl-7 pr-2 text-sm font-bold transition-all outline-none ${
                isCustom
                  ? 'border-pfsa-gold bg-pfsa-gold/10 text-pfsa-gold'
                  : 'border-gray-200 text-gray-600 hover:border-pfsa-gold/50'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Campaign Selection */}
      <div>
        <label htmlFor="campaign" className="mb-2 block text-sm font-semibold text-pfsa-blue">
          Designate Your Gift
        </label>
        <select
          id="campaign"
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none transition-all focus:border-pfsa-gold"
        >
          {CAMPAIGNS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Frequency Selection */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-pfsa-blue">
          Frequency
        </label>
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {FREQUENCIES.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFrequency(f.value)}
              className={`flex-1 rounded-md px-2 py-2 text-xs font-semibold transition-all sm:text-sm ${
                frequency === f.value
                  ? 'bg-white text-pfsa-blue shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || donationAmount < 1}
        className="btn-gold w-full rounded-full py-4 text-lg font-bold tracking-wide disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? 'Redirecting to checkout…'
          : `Donate $${donationAmount > 0 ? donationAmount.toLocaleString('en-US', { minimumFractionDigits: donationAmount % 1 ? 2 : 0 }) : '0'}`}
      </button>

      {/* Tax-Deductible Notice */}
      <p className="text-center text-xs text-gray-500">
        PFSA is a registered 501(c)(3). All donations are tax-deductible.
        <br />
        EIN: 20-3856434
      </p>
    </form>
  )
}
