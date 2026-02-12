import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Programs } from './components/Programs'
import { Impact } from './components/Impact'
import { Donate } from './components/Donate'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
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
