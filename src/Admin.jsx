import { useEffect, useMemo, useState } from 'react'

function TabButton({ id, active, label, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'bg-sky-600 text-white' : 'text-sky-700 bg-sky-50 hover:bg-sky-100'}`}
    >
      {label}
    </button>
  )
}

export default function Admin() {
  const backend = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  // Auth state
  const [token, setToken] = useState(localStorage.getItem('sb_token') || '')
  const [me, setMe] = useState(null)
  const isAuthed = !!token && !!me

  // Tabs: sessions | coaches | schools | bookings
  const [tab, setTab] = useState('sessions')

  // Common
  const [message, setMessage] = useState('')

  // Sessions state
  const [sessions, setSessions] = useState([])
  const [sessionsLoading, setSessionsLoading] = useState(false)
  const [sessionForm, setSessionForm] = useState({
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
    image_url: '',
  })
  const [sessionImageFile, setSessionImageFile] = useState(null)

  // Coaches state
  const [coaches, setCoaches] = useState([])
  const [coachesLoading, setCoachesLoading] = useState(false)
  const [coachForm, setCoachForm] = useState({
    name: '',
    bio: '',
    certification: '',
    school_id: '',
    rating: '',
    image_url: '',
  })
  const [coachImageFile, setCoachImageFile] = useState(null)

  // Schools state
  const [schools, setSchools] = useState([])
  const [schoolsLoading, setSchoolsLoading] = useState(false)
  const [schoolForm, setSchoolForm] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
    image_url: '',
  })
  const [schoolImageFile, setSchoolImageFile] = useState(null)

  // Bookings state
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [bookingFilters, setBookingFilters] = useState(() => {
    const saved = localStorage.getItem('sb_booking_filters')
    return saved ? JSON.parse(saved) : { status: '', q: '', experience_level: '' }
  })

  // Helpers
  const authHeaders = () => token ? { Authorization: `Bearer ${token}` } : {}

  // Loaders
  const loadSessions = async () => {
    setSessionsLoading(true)
    try {
      const res = await fetch(`${backend}/api/sessions?upcoming_only=false&limit=200`)
      const data = await res.json()
      setSessions(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setSessionsLoading(false)
    }
  }

  const loadCoaches = async () => {
    setCoachesLoading(true)
    try {
      const res = await fetch(`${backend}/api/coaches`)
      const data = await res.json()
      setCoaches(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setCoachesLoading(false)
    }
  }

  const loadSchools = async () => {
    setSchoolsLoading(true)
    try {
      const res = await fetch(`${backend}/api/schools`)
      const data = await res.json()
      setSchools(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setSchoolsLoading(false)
    }
  }

  const loadBookings = async () => {
    setBookingsLoading(true)
    try {
      const params = new URLSearchParams()
      if (bookingFilters.status) params.set('status', bookingFilters.status)
      if (bookingFilters.q) params.set('q', bookingFilters.q)
      if (bookingFilters.experience_level) params.set('experience_level', bookingFilters.experience_level)
      const res = await fetch(`${backend}/api/admin/bookings?${params.toString()}` , { headers: { ...authHeaders() }})
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to load bookings')
      setBookings(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setBookingsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    loadSessions()
    loadCoaches()
    loadSchools()
    // attempt to restore session
    if (token) {
      fetch(`${backend}/auth/me`, { headers: { ...authHeaders() }}).then(async (r) => {
        if (r.ok) setMe(await r.json())
        else {
          setToken(''); localStorage.removeItem('sb_token')
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('sb_booking_filters', JSON.stringify(bookingFilters))
    if (isAuthed) loadBookings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingFilters.status, bookingFilters.q, bookingFilters.experience_level, isAuthed])

  const updateSession = (k, v) => setSessionForm(prev => ({ ...prev, [k]: v }))
  const updateCoach = (k, v) => setCoachForm(prev => ({ ...prev, [k]: v }))
  const updateSchool = (k, v) => setSchoolForm(prev => ({ ...prev, [k]: v }))

  const uploadAsset = async (file) => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`${backend}/api/upload`, {
      method: 'POST',
      headers: { ...authHeaders() },
      body: fd
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.detail || 'Upload failed')
    // backend returns url like /assets/{id}. Use absolute URL for frontend render
    const url = data.url.startsWith('http') ? data.url : `${backend}${data.url}`
    return url
  }

  const submitSession = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      let imageUrl = sessionForm.image_url
      if (sessionImageFile) {
        imageUrl = await uploadAsset(sessionImageFile)
      }
      const payload = {
        ...sessionForm,
        image_url: imageUrl || undefined,
        duration_minutes: Number(sessionForm.duration_minutes),
        price: Number(sessionForm.price),
        capacity: Number(sessionForm.capacity),
        start_time: new Date(sessionForm.start_time).toISOString(),
        coach_id: sessionForm.coach_id || undefined,
        school_id: sessionForm.school_id || undefined,
      }
      const res = await fetch(`${backend}/api/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to create session')
      setMessage('✅ Session created')
      setSessionForm({
        title: '', description: '', location: '', level: 'all', session_type: 'group', start_time: '', duration_minutes: 60, price: 0, capacity: 1, coach_id: '', school_id: '', image_url: ''
      })
      setSessionImageFile(null)
      loadSessions()
    } catch (e) {
      setMessage(`❌ ${e.message}`)
    }
  }

  const submitCoach = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      let imageUrl = coachForm.image_url
      if (coachImageFile) imageUrl = await uploadAsset(coachImageFile)
      const payload = {
        ...coachForm,
        image_url: imageUrl || undefined,
        rating: coachForm.rating === '' ? undefined : Number(coachForm.rating) 
      }
      const res = await fetch(`${backend}/api/coaches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to create coach')
      setMessage('✅ Coach created')
      setCoachForm({ name: '', bio: '', certification: '', school_id: '', rating: '', image_url: '' })
      setCoachImageFile(null)
      loadCoaches()
    } catch (e) {
      setMessage(`❌ ${e.message}`)
    }
  }

  const submitSchool = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      let imageUrl = schoolForm.image_url
      if (schoolImageFile) imageUrl = await uploadAsset(schoolImageFile)
      const payload = { ...schoolForm, image_url: imageUrl || undefined }
      const res = await fetch(`${backend}/api/schools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to create school')
      setMessage('✅ School created')
      setSchoolForm({ name: '', location: '', description: '', website: '', image_url: '' })
      setSchoolImageFile(null)
      loadSchools()
    } catch (e) {
      setMessage(`❌ ${e.message}`)
    }
  }

  const SectionCard = ({ title, actionLabel, onAction, children }) => (
    <section className="bg-white rounded-xl border p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {onAction && (
          <button onClick={onAction} className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">{actionLabel || 'Refresh'}</button>
        )}
      </div>
      {children}
    </section>
  )

  const doLogin = async (e) => {
    e.preventDefault()
    setMessage('')
    const form = new FormData(e.currentTarget)
    const email = form.get('email')
    const password = form.get('password')
    try {
      const res = await fetch(`${backend}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      localStorage.setItem('sb_token', data.access_token)
      setToken(data.access_token)
      const meRes = await fetch(`${backend}/auth/me`, { headers: { ...authHeaders() }})
      setMe(await meRes.json())
      setMessage('✅ Signed in')
    } catch (err) {
      setMessage(`❌ ${err.message}`)
    }
  }

  const doLogout = () => {
    setToken(''); setMe(null); localStorage.removeItem('sb_token')
  }

  const BookingRow = ({ b, onChanged }) => {
    const [working, setWorking] = useState(false)
    const action = async (path) => {
      setWorking(true)
      try {
        const res = await fetch(`${backend}${path}`, { method: 'POST', headers: { ...authHeaders() }})
        const data = await res.json().catch(()=>({}))
        if (!res.ok) throw new Error(data.detail || 'Action failed')
        onChanged && onChanged()
      } catch (e) {
        setMessage(`❌ ${e.message}`)
      } finally {
        setWorking(false)
      }
    }
    return (
      <div className="py-3">
        <div className="flex items-center justify-between">
          <div className="font-medium text-gray-900">{b.user_name} <span className="text-xs text-gray-500">({b.participants}p • {b.experience_level})</span></div>
          <div className={`text-xs ${b.status === 'confirmed' ? 'text-emerald-700' : b.status === 'cancelled' ? 'text-rose-600' : b.status === 'attended' ? 'text-sky-700' : 'text-amber-600'}`}>{b.status}</div>
        </div>
        <div className="text-xs text-gray-500 truncate">{b.user_email} • Session #{b.session_id}</div>
        {b.notes && <div className="text-sm text-gray-700 mt-1 line-clamp-2">“{b.notes}”</div>}
        <div className="mt-2 flex gap-2">
          <button disabled={working || b.status==='cancelled'} onClick={()=>action(`/api/admin/bookings/${b.id}/cancel`)} className="text-xs px-2 py-1 rounded border hover:bg-gray-50 disabled:opacity-50">Cancel</button>
          <button disabled={working || b.status==='attended'} onClick={()=>action(`/api/admin/bookings/${b.id}/attend`)} className="text-xs px-2 py-1 rounded border hover:bg-gray-50 disabled:opacity-50">Mark attended</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-white">
      {/* Top bar */}
      <header className="bg-white/70 backdrop-blur border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-sky-700">🌊 Surfbrew</span>
            <span className="text-xs text-sky-700">Admin</span>
          </a>
          {isAuthed ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600">Signed in as {me?.email} • {me?.role}</span>
              <button onClick={doLogout} className="text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Sign out</button>
            </div>
          ) : (
            <form onSubmit={doLogin} className="flex items-center gap-2">
              <input name="email" placeholder="Email" className="border rounded px-2 py-1 text-sm" />
              <input name="password" placeholder="Password" type="password" className="border rounded px-2 py-1 text-sm" />
              <button className="text-xs px-3 py-1 rounded bg-sky-600 text-white">Sign in</button>
            </form>
          )}
        </div>
      </header>

      {/* Mobile tabbar */}
      <div className="sm:hidden sticky top-[54px] z-10 bg-white/70 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-3 py-2 grid grid-cols-4 gap-2">
          <TabButton id="sessions" label="Sessions" active={tab==='sessions'} onClick={setTab} />
          <TabButton id="coaches" label="Coaches" active={tab==='coaches'} onClick={setTab} />
          <TabButton id="schools" label="Schools" active={tab==='schools'} onClick={setTab} />
          <TabButton id="bookings" label="Bookings" active={tab==='bookings'} onClick={setTab} />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {message && (
          <div className="mb-4 text-sm px-3 py-2 rounded border bg-white shadow-sm">{message}</div>
        )}

        {!isAuthed && (
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <div className="text-sm text-gray-600">Sign in with a coach or school account to access the dashboard. If you don't have one yet, create a user via the API and assign a role.</div>
          </div>
        )}

        {isAuthed && (
          <>
            <nav className="hidden sm:flex gap-2 mb-4">
              <TabButton id="sessions" label="Sessions" active={tab==='sessions'} onClick={setTab} />
              <TabButton id="coaches" label="Coaches" active={tab==='coaches'} onClick={setTab} />
              <TabButton id="schools" label="Schools" active={tab==='schools'} onClick={setTab} />
              <TabButton id="bookings" label="Bookings" active={tab==='bookings'} onClick={setTab} />
            </nav>

            {/* Sessions Tab */}
            {tab === 'sessions' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SectionCard title="Create Session">
                  <form onSubmit={submitSession} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input className="border rounded px-3 py-2 sm:col-span-2" placeholder="Title" value={sessionForm.title} onChange={e=>updateSession('title', e.target.value)} required />
                    <input className="border rounded px-3 py-2 sm:col-span-2" placeholder="Location" value={sessionForm.location} onChange={e=>updateSession('location', e.target.value)} required />
                    <textarea className="border rounded px-3 py-2 sm:col-span-2" placeholder="Description" rows={3} value={sessionForm.description} onChange={e=>updateSession('description', e.target.value)} />

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Level</label>
                      <select className="border rounded px-3 py-2 w-full" value={sessionForm.level} onChange={e=>updateSession('level', e.target.value)}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="all">All</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Type</label>
                      <select className="border rounded px-3 py-2 w-full" value={sessionForm.session_type} onChange={e=>updateSession('session_type', e.target.value)}>
                        <option value="group">Group</option>
                        <option value="private">Private</option>
                        <option value="recurring">Recurring</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Start time</label>
                      <input type="datetime-local" className="border rounded px-3 py-2 w-full" value={sessionForm.start_time} onChange={e=>updateSession('start_time', e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Duration (min)</label>
                      <input type="number" className="border rounded px-3 py-2 w-full" value={sessionForm.duration_minutes} onChange={e=>updateSession('duration_minutes', e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Price (USD)</label>
                      <input type="number" step="0.01" className="border rounded px-3 py-2 w-full" value={sessionForm.price} onChange={e=>updateSession('price', e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Capacity</label>
                      <input type="number" className="border rounded px-3 py-2 w-full" value={sessionForm.capacity} onChange={e=>updateSession('capacity', e.target.value)} required />
                    </div>

                    <input className="border rounded px-3 py-2" placeholder="Coach ID (optional)" value={sessionForm.coach_id} onChange={e=>updateSession('coach_id', e.target.value)} />
                    <input className="border rounded px-3 py-2" placeholder="School ID (optional)" value={sessionForm.school_id} onChange={e=>updateSession('school_id', e.target.value)} />

                    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input className="border rounded px-3 py-2" placeholder="Image URL (optional)" value={sessionForm.image_url} onChange={e=>updateSession('image_url', e.target.value)} />
                      <input type="file" accept="image/*" onChange={(e)=>setSessionImageFile(e.target.files?.[0] || null)} className="border rounded px-3 py-2" />
                    </div>

                    <div className="sm:col-span-2 flex justify-end mt-2">
                      <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 w-full sm:w-auto">Create</button>
                    </div>
                  </form>
                </SectionCard>

                <SectionCard title="All Sessions" actionLabel="Refresh" onAction={loadSessions}>
                  {sessionsLoading && <p className="text-gray-600">Loading...</p>}
                  <div className="divide-y">
                    {sessions.map(s => (
                      <div key={s.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {s.image_url && <img src={s.image_url} alt="" className="w-12 h-12 rounded object-cover" />}
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 truncate">{s.title}</div>
                            <div className="text-xs text-gray-500 truncate">{s.location} • {s.level} • {s.session_type} • {new Date(s.start_time).toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 whitespace-nowrap">${s.price} • cap {s.capacity}</div>
                      </div>
                    ))}
                    {!sessionsLoading && sessions.length === 0 && (
                      <div className="text-gray-600">No sessions yet.</div>
                    )}
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Coaches Tab */}
            {tab === 'coaches' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SectionCard title="Add Coach">
                  <form onSubmit={submitCoach} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input className="border rounded px-3 py-2 sm:col-span-2" placeholder="Name" value={coachForm.name} onChange={e=>updateCoach('name', e.target.value)} required />
                    <input className="border rounded px-3 py-2 sm:col-span-2" placeholder="Bio" value={coachForm.bio} onChange={e=>updateCoach('bio', e.target.value)} />
                    <input className="border rounded px-3 py-2" placeholder="Certification" value={coachForm.certification} onChange={e=>updateCoach('certification', e.target.value)} />
                    <input className="border rounded px-3 py-2" placeholder="School ID (optional)" value={coachForm.school_id} onChange={e=>updateCoach('school_id', e.target.value)} />
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Rating (0-5)</label>
                      <input type="number" step="0.1" min="0" max="5" className="border rounded px-3 py-2 w-full" value={coachForm.rating} onChange={e=>updateCoach('rating', e.target.value)} />
                    </div>
                    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input className="border rounded px-3 py-2" placeholder="Image URL (optional)" value={coachForm.image_url} onChange={e=>updateCoach('image_url', e.target.value)} />
                      <input type="file" accept="image/*" onChange={(e)=>setCoachImageFile(e.target.files?.[0] || null)} className="border rounded px-3 py-2" />
                    </div>
                    <div className="sm:col-span-2 flex justify-end mt-2">
                      <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 w-full sm:w-auto">Create</button>
                    </div>
                  </form>
                </SectionCard>

                <SectionCard title="All Coaches" actionLabel="Refresh" onAction={loadCoaches}>
                  {coachesLoading && <p className="text-gray-600">Loading...</p>}
                  <div className="divide-y">
                    {coaches.map(c => (
                      <div key={c.id} className="py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {c.image_url && <img src={c.image_url} alt="" className="w-10 h-10 rounded-full object-cover" />}
                            <div>
                              <div className="font-medium text-gray-900">{c.name}</div>
                              <div className="text-xs text-gray-500 truncate">{c.certification || '—'} • School: {c.school_id || '—'}</div>
                            </div>
                          </div>
                          {typeof c.rating !== 'undefined' && (
                            <div className="text-sm text-amber-600">★ {c.rating}</div>
                          )}
                        </div>
                        {c.bio && <div className="text-sm text-gray-700 mt-1 line-clamp-2">{c.bio}</div>}
                      </div>
                    ))}
                    {!coachesLoading && coaches.length === 0 && (
                      <div className="text-gray-600">No coaches yet.</div>
                    )}
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Schools Tab */}
            {tab === 'schools' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SectionCard title="Add School">
                  <form onSubmit={submitSchool} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input className="border rounded px-3 py-2 sm:col-span-2" placeholder="Name" value={schoolForm.name} onChange={e=>updateSchool('name', e.target.value)} required />
                    <input className="border rounded px-3 py-2 sm:col-span-2" placeholder="Location" value={schoolForm.location} onChange={e=>updateSchool('location', e.target.value)} required />
                    <input className="border rounded px-3 py-2 sm:col-span-2" placeholder="Website" value={schoolForm.website} onChange={e=>updateSchool('website', e.target.value)} />
                    <textarea className="border rounded px-3 py-2 sm:col-span-2" placeholder="Description" rows={3} value={schoolForm.description} onChange={e=>updateSchool('description', e.target.value)} />
                    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input className="border rounded px-3 py-2" placeholder="Image URL (optional)" value={schoolForm.image_url} onChange={e=>updateSchool('image_url', e.target.value)} />
                      <input type="file" accept="image/*" onChange={(e)=>setSchoolImageFile(e.target.files?.[0] || null)} className="border rounded px-3 py-2" />
                    </div>
                    <div className="sm:col-span-2 flex justify-end mt-2">
                      <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 w-full sm:w-auto">Create</button>
                    </div>
                  </form>
                </SectionCard>

                <SectionCard title="All Schools" actionLabel="Refresh" onAction={loadSchools}>
                  {schoolsLoading && <p className="text-gray-600">Loading...</p>}
                  <div className="divide-y">
                    {schools.map(s => (
                      <div key={s.id} className="py-3">
                        <div className="flex items-center gap-3">
                          {s.image_url && <img src={s.image_url} alt="" className="w-12 h-12 rounded object-cover" />}
                          <div>
                            <div className="font-medium text-gray-900">{s.name}</div>
                            <div className="text-xs text-gray-500">{s.location}</div>
                            <div className="text-xs text-gray-500 truncate">{s.website || '—'}</div>
                          </div>
                        </div>
                        {s.description && <div className="text-sm text-gray-700 mt-1 line-clamp-2">{s.description}</div>}
                      </div>
                    ))}
                    {!schoolsLoading && schools.length === 0 && (
                      <div className="text-gray-600">No schools yet.</div>
                    )}
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Bookings Tab */}
            {tab === 'bookings' && (
              <SectionCard title="Bookings">
                <div className="mb-3 grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <select value={bookingFilters.status} onChange={(e)=>setBookingFilters(f=>({...f, status: e.target.value}))} className="border rounded px-3 py-2">
                    <option value="">Any status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="attended">Attended</option>
                  </select>
                  <select value={bookingFilters.experience_level} onChange={(e)=>setBookingFilters(f=>({...f, experience_level: e.target.value}))} className="border rounded px-3 py-2">
                    <option value="">Any level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <input value={bookingFilters.q} onChange={(e)=>setBookingFilters(f=>({...f, q: e.target.value}))} placeholder="Search name/email" className="border rounded px-3 py-2" />
                  <button onClick={loadBookings} className="px-3 py-2 rounded bg-sky-600 text-white">Apply</button>
                </div>

                {bookingsLoading && <p className="text-gray-600">Loading...</p>}
                <div className="divide-y">
                  {bookings.map(b => (
                    <BookingRow key={b.id} b={b} onChanged={loadBookings} />
                  ))}
                  {!bookingsLoading && bookings.length === 0 && (
                    <div className="text-gray-600">No bookings found.</div>
                  )}
                </div>
              </SectionCard>
            )}
          </>
        )}
      </main>

      <footer className="border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500">
          Surfbrew Admin • Secure dashboard with bookings management and image uploads
        </div>
      </footer>
    </div>
  )
}
