import { useEffect, useMemo, useState } from 'react'

export default function Admin() {
  const backend = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    level: 'all',
    session_type: 'group',
    start_time: '', // ISO string
    duration_minutes: 60,
    price: 0,
    capacity: 1,
    coach_id: '',
    school_id: '',
  })

  const loadSessions = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/sessions?upcoming_only=false&limit=100`)
      const data = await res.json()
      setSessions(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadSessions() }, [])

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const payload = {
        ...form,
        duration_minutes: Number(form.duration_minutes),
        price: Number(form.price),
        capacity: Number(form.capacity),
        start_time: new Date(form.start_time).toISOString(),
        coach_id: form.coach_id || undefined,
        school_id: form.school_id || undefined,
      }
      const res = await fetch(`${backend}/api/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to create session')
      setMessage('✅ Session created')
      setForm({
        title: '', description: '', location: '', level: 'all', session_type: 'group', start_time: '', duration_minutes: 60, price: 0, capacity: 1, coach_id: '', school_id: ''
      })
      loadSessions()
    } catch (e) {
      setMessage(`❌ ${e.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-white">
      <header className="bg-white/70 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-sky-700">🌊 Surfbrew</span>
            <span className="text-sm text-sky-700">Admin</span>
          </a>
          <nav className="flex gap-4 text-sm">
            <a className="text-sky-700 hover:underline" href="/">Home</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create Session</h2>
          {message && <div className="mb-3 text-sm">{message}</div>}
          <form onSubmit={submit} className="grid grid-cols-2 gap-3">
            <input className="border rounded px-3 py-2 col-span-2" placeholder="Title" value={form.title} onChange={e=>update('title', e.target.value)} required />
            <input className="border rounded px-3 py-2 col-span-2" placeholder="Location" value={form.location} onChange={e=>update('location', e.target.value)} required />
            <textarea className="border rounded px-3 py-2 col-span-2" placeholder="Description" rows={3} value={form.description} onChange={e=>update('description', e.target.value)} />
            <div className="col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Level</label>
              <select className="border rounded px-3 py-2 w-full" value={form.level} onChange={e=>update('level', e.target.value)}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Type</label>
              <select className="border rounded px-3 py-2 w-full" value={form.session_type} onChange={e=>update('session_type', e.target.value)}>
                <option value="group">Group</option>
                <option value="private">Private</option>
                <option value="recurring">Recurring</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Start time</label>
              <input type="datetime-local" className="border rounded px-3 py-2 w-full" value={form.start_time} onChange={e=>update('start_time', e.target.value)} required />
            </div>
            <div className="col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Duration (min)</label>
              <input type="number" className="border rounded px-3 py-2 w-full" value={form.duration_minutes} onChange={e=>update('duration_minutes', e.target.value)} required />
            </div>
            <div className="col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Price (USD)</label>
              <input type="number" step="0.01" className="border rounded px-3 py-2 w-full" value={form.price} onChange={e=>update('price', e.target.value)} required />
            </div>
            <div className="col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Capacity</label>
              <input type="number" className="border rounded px-3 py-2 w-full" value={form.capacity} onChange={e=>update('capacity', e.target.value)} required />
            </div>
            <input className="border rounded px-3 py-2 col-span-1" placeholder="Coach ID (optional)" value={form.coach_id} onChange={e=>update('coach_id', e.target.value)} />
            <input className="border rounded px-3 py-2 col-span-1" placeholder="School ID (optional)" value={form.school_id} onChange={e=>update('school_id', e.target.value)} />

            <div className="col-span-2 flex justify-end mt-2">
              <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">Create</button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">All Sessions</h2>
            <button onClick={loadSessions} className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Refresh</button>
          </div>
          {loading && <p className="text-gray-600">Loading...</p>}
          <div className="divide-y">
            {sessions.map(s => (
              <div key={s.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{s.title}</div>
                  <div className="text-sm text-gray-500">{s.location} • {s.level} • {s.session_type} • {new Date(s.start_time).toLocaleString()}</div>
                </div>
                <div className="text-sm text-gray-700">${s.price} • cap {s.capacity}</div>
              </div>
            ))}
            {!loading && sessions.length === 0 && (
              <div className="text-gray-600">No sessions yet.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
