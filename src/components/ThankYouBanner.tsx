import { useState } from 'react'
import { X } from 'lucide-react'

interface ThankYouBannerProps {
  type: 'success' | 'canceled'
  onDismiss: () => void
}

export function ThankYouBanner({ type, onDismiss }: ThankYouBannerProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  function handleDismiss() {
    setVisible(false)
    onDismiss()
  }

  if (type === 'success') {
    return (
      <div className="fixed top-0 right-0 left-0 z-[60] bg-pfsa-green text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-sm font-medium sm:text-base">
            Thank you for your generous donation! A receipt has been sent to your email.
          </p>
          <button
            onClick={handleDismiss}
            className="ml-4 shrink-0 rounded-full p-1 transition-colors hover:bg-white/20"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-0 right-0 left-0 z-[60] bg-gray-600 text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <p className="text-sm font-medium sm:text-base">
          Donation was canceled. No charge was made. You can try again anytime.
        </p>
        <button
          onClick={handleDismiss}
          className="ml-4 shrink-0 rounded-full p-1 transition-colors hover:bg-white/20"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
