import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Programs } from './components/Programs'
import { Impact } from './components/Impact'
import { Donate } from './components/Donate'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ThankYouBanner } from './components/ThankYouBanner'
import { CampaignLanding } from './components/CampaignLanding'

function HomePage() {
  const [banner, setBanner] = useState<'success' | 'canceled' | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      setBanner('success')
    } else if (params.get('canceled') === 'true') {
      setBanner('canceled')
    }

    // Clean the URL without reloading
    if (params.has('success') || params.has('canceled')) {
      window.history.replaceState({}, '', window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      {banner && (
        <ThankYouBanner type={banner} onDismiss={() => setBanner(null)} />
      )}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Impact />
        <Donate />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/campaign/:slug" element={<CampaignLanding />} />
    </Routes>
  )
}
