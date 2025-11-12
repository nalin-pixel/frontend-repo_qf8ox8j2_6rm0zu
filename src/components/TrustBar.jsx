import React from 'react'
import { ShieldCheck, Users, Zap } from 'lucide-react'

export default function TrustBar() {
  const items = [
    { icon: Users, label: 'Trusted by 500+ surfers' },
    { icon: ShieldCheck, label: '200+ certified coaches' },
    { icon: Zap, label: 'Instant booking' },
  ]
  return (
    <div className="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-slate-700 text-sm">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-sky-600"><Icon size={16} /></span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
