import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ParallaxHero from './components/ParallaxHero'
import Filters from './components/Filters'
import PremiumCard from './components/PremiumCard'
import HowItWorks from './components/HowItWorks'
import SocialProof from './components/SocialProof'
import FeaturedCoaches from './components/FeaturedCoaches'
import MapSpots from './components/MapSpots'
import MobileTabBar from './components/MobileTabBar'
import Toaster from './components/Toaster'
import TrustBar from './components/TrustBar'

function App() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [q, setQ] = useState('')
  const [location, setLocation] = useState('')
  const [level, setLevel] = useState('')
  const [type, setType] = useState('')

  const backend = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      setError('')
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      if (location) params.set('location', location)
      if (level) params.set('level', level)
      if (type) params.set('session_type', type)

      const res = await fetch(`${backend}/api/sessions?${params.toString()}`)
      if (!res.ok) throw new Error(`Failed to load sessions: ${res.status}`)
      const data = await res.json()
      setSessions(data.items || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onBook = async (session) => {
    const user_name = prompt('Your name?')
    if (!user_name) return
    const user_email = prompt('Your email?')
    if (!user_email) return
    const participants = parseInt(prompt('Number of participants?', '1') || '1', 10)
    const experience_level = prompt('Experience level? (beginner/intermediate/advanced)', 'beginner')
    if (!experience_level) return

    try {
      const res = await fetch(`${backend}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: session.id, user_name, user_email, participants, experience_level }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Booking failed')
      window.dispatchEvent(new CustomEvent('toast', { detail: 'Booking confirmed! See you in the lineup.' }))
      fetchSessions()
    } catch (e) {
      window.dispatchEvent(new CustomEvent('toast', { detail: e.message }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50/70">
      <Navbar />
      <Toaster />
      <ParallaxHero />
      <TrustBar />

      <section className="relative bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        {/* Decorative low-opacity wave pattern */}
        <svg aria-hidden="true" className="pointer-events-none absolute -top-10 right-0 w-[480px] opacity-[0.06] text-sky-700" viewBox="0 0 600 600" fill="none">
          <path d="M0 300C80 180 180 180 260 300C340 420 440 420 520 300" stroke="currentColor" strokeWidth="30" strokeLinecap="round"/>
          <path d="M40 360C120 240 220 240 300 360C380 480 480 480 560 360" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="mb-4">
            <h2 className="text-[34px] sm:text-[40px] lg:text-[48px] font-bold text-slate-900 leading-tight">Find your next surf session</h2>
            <p className="text-slate-600 text-base" style={{ lineHeight: 1.6 }}>Filter by location, level and type. Book instantly.</p>
          </div>
          <Filters q={q} setQ={setQ} location={location} setLocation={setLocation} level={level} setLevel={setLevel} type={type} setType={setType} onSearch={fetchSessions} loading={loading} />
        </div>
      </section>

      <main id="browse" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && <p className="text-slate-600 mt-6">Loading sessions...</p>}
        {error && <p className="text-rose-600 mt-6">{error}</p>}

        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((s) => (
            <PremiumCard key={s.id} session={s} onBook={onBook} />
          ))}
        </div>

        {(!loading && sessions.length === 0) && (
          <div className="text-center text-slate-600 py-12">No sessions found. Try adjusting filters.</div>
        )}
      </main>

      <FeaturedCoaches />
      <HowItWorks />
      <SocialProof />
      <MapSpots />

      <footer className="mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-600 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold">Ready to ride?</h3>
              <p className="text-white/80" style={{ lineHeight: 1.6 }}>Lock in a lesson with a coach near you — premium gear, great vibes.</p>
            </div>
            <a href="#browse" className="inline-flex items-center rounded-xl bg-white text-sky-700 font-semibold px-5 py-3 shadow hover:bg-white/90 transition-all">Book now</a>
          </div>

          <div className="text-center text-slate-500 text-sm mt-6">© {new Date().getFullYear()} Surfbrew — Ride smarter, book faster.</div>
        </div>
      </footer>

      <MobileTabBar />
    </div>
  )
}

export default App
