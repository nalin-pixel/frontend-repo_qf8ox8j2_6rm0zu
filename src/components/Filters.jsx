import React from 'react'
import { Search, MapPin } from 'lucide-react'

export default function Filters({ q, setQ, location, setLocation, level, setLevel, type, setType, onSearch, loading }) {
  const Chip = ({ label, onClick }) => (
    <button onClick={onClick} className="px-3 py-1.5 rounded-full text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">
      {label}
    </button>
  )

  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur border border-sky-100 shadow-sm p-5">
      <div className="mb-3 flex items-center gap-2">
        <Chip label="Today" onClick={() => setQ('today')} />
        <Chip label="This Weekend" onClick={() => setQ('weekend')} />
        <Chip label="Beginner" onClick={() => setLevel('beginner')} />
        <Chip label="Private" onClick={() => setType('private')} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search size={18} /></span>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search sessions, location or coach" className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-[14px] text-[15px] focus:outline-none focus:ring-0 focus:border-sky-400 shadow-[0_0_0_0_rgba(0,0,0,0)] focus:shadow-[0_0_0_3px_rgba(0,158,217,0.10)] transition-all" />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><MapPin size={18} /></span>
          <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-[14px] text-[15px] focus:outline-none focus:border-sky-400 focus:shadow-[0_0_0_3px_rgba(0,158,217,0.10)] transition-all" />
        </div>
        <div className="flex gap-2">
          <select value={level} onChange={e=>setLevel(e.target.value)} className="flex-1 rounded-xl border border-slate-200 px-3 py-[14px] text-[15px] focus:outline-none focus:border-sky-400 focus:shadow-[0_0_0_3px_rgba(0,158,217,0.10)]">
            <option value="">Any level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="all">All</option>
          </select>
          <select value={type} onChange={e=>setType(e.target.value)} className="flex-1 rounded-xl border border-slate-200 px-3 py-[14px] text-[15px] focus:outline-none focus:border-sky-400 focus:shadow-[0_0_0_3px_rgba(0,158,217,0.10)]">
            <option value="">Any type</option>
            <option value="group">Group</option>
            <option value="private">Private</option>
            <option value="recurring">Recurring</option>
          </select>
          <button onClick={onSearch} disabled={loading} className="button-ripple px-5 py-[14px] rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-medium shadow hover:from-sky-700 hover:to-cyan-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-w-[104px]">
            {loading ? (
              <span className="inline-block h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
            ) : 'Search'}
          </button>
        </div>
      </div>
    </div>
  )
}
