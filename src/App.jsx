import { useEffect, useMemo, useState } from 'react'
import SessionCard from './components/SessionCard'

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
      alert('Booking confirmed!')
      fetchSessions()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-sky-700">Surfbrew</span>
          </div>
          <nav className="flex items-center gap-4">
            <a className="text-sm text-sky-700 hover:underline" href="/test">System check</a>
            <a className="text-sm text-sky-700 hover:underline" href="/admin">Admin</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Find your next surf session</h1>
          <p className="text-gray-600">Browse, filter and instantly book lessons with top coaches and schools.</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sessions, location or coach"
            className="md:col-span-2 w-full border rounded-md px-3 py-2"
          />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full border rounded-md px-3 py-2" />
          <div className="flex gap-2">
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="flex-1 border rounded-md px-3 py-2">
              <option value="">Any level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all">All</option>
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} className="flex-1 border rounded-md px-3 py-2">
              <option value="">Any type</option>
              <option value="group">Group</option>
              <option value="private">Private</option>
              <option value="recurring">Recurring</option>
            </select>
            <button onClick={fetchSessions} className="px-4 py-2 rounded-md bg-sky-600 text-white">Search</button>
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading sessions...</p>}
        {error && <p className="text-rose-600">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sessions.map((s) => (
            <SessionCard key={s.id} session={s} onBook={onBook} />
          ))}
        </div>

        {(!loading && sessions.length === 0) && (
          <div className="text-center text-gray-600 py-12">No sessions found. Try adjusting filters.</div>
        )}
      </main>

      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Surfbrew — Ride smarter, book faster.
        </div>
      </footer>
    </div>
  )
}

export default App
