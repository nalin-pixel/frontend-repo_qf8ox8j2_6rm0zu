import React from 'react'
import { Search, CalendarDays, Waves } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    { icon: Search, title: 'Search', desc: 'Find sessions by location, level, and type with powerful filters.' },
    { icon: CalendarDays, title: 'Book', desc: 'Instantly reserve your spot with secure checkout and confirmations.' },
    { icon: Waves, title: 'Surf', desc: 'Show up stoked. Coaches and schools handle the rest.' },
  ]
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">How it works</h2>
        <p className="text-slate-600 mt-2">From search to surf in three smooth steps.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white/70 backdrop-blur border border-sky-100 p-6 shadow-sm">
              <s.icon className="text-sky-600" size={28} />
              <h3 className="mt-3 text-xl font-bold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
