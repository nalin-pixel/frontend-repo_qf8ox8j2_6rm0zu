import React from 'react'

export default function Filters({ q, setQ, location, setLocation, level, setLevel, type, setType, onSearch }) {
  return (
    <div className="rounded-2xl bg-white/60 backdrop-blur border border-sky-100 shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search sessions, location or coach" className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-300" />
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-300" />
        <div className="flex gap-2">
          <select value={level} onChange={e=>setLevel(e.target.value)} className="flex-1 rounded-xl border border-slate-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300">
            <option value="">Any level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="all">All</option>
          </select>
          <select value={type} onChange={e=>setType(e.target.value)} className="flex-1 rounded-xl border border-slate-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300">
            <option value="">Any type</option>
            <option value="group">Group</option>
            <option value="private">Private</option>
            <option value="recurring">Recurring</option>
          </select>
          <button onClick={onSearch} className="px-5 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700">Search</button>
        </div>
      </div>
    </div>
  )
}
