import React from 'react'
import { Star, Heart } from 'lucide-react'

export default function PremiumCard({ session, onBook }) {
  const { title, description, location, level, session_type, price, start_time, availability, image_url, coach, popularity } = session
  const start = start_time ? new Date(start_time) : null
  const when = start ? start.toLocaleString() : 'TBA'

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
      {image_url && (
        <div className="relative h-48 w-full overflow-hidden">
          <img src={image_url} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {popularity === 'hot' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow">Filling fast</span>
            )}
          </div>
          <button aria-label="Save" className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-slate-700 shadow hover:bg-white">
            <Heart size={18} />
          </button>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
            <p className="text-sm text-slate-600">{location} • {when}</p>
          </div>
          <div className="text-right space-x-2 whitespace-nowrap">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 capitalize">{session_type}</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 capitalize">{level || 'all'}</span>
          </div>
        </div>
        {coach && (
          <div className="mt-3 flex items-center gap-3">
            <img src={coach.avatar || 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop'} alt={coach.name} className="h-9 w-9 rounded-full object-cover" />
            <div className="text-sm">
              <div className="font-semibold text-slate-800">{coach.name}</div>
              <div className="text-slate-500">{coach.role || 'Certified Coach'}</div>
            </div>
          </div>
        )}
        {description && (
          <p className="mt-3 text-sm text-slate-700 line-clamp-2">{description}</p>
        )}
        <div className="mt-5 flex items-center justify-between">
          <div className="text-slate-900 font-semibold">${price?.toFixed?.(2) || price}
            <span className="text-sm text-slate-500 font-normal"> / person</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${availability?.available > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {availability?.available ?? 0} spots left
            </span>
            <button onClick={() => onBook(session)} disabled={!availability || availability.available <= 0} className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed shadow">
              Book
            </button>
          </div>
        </div>
      </div>
      {/* Quick view on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-white/85 backdrop-blur px-5 py-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm text-slate-700">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={16} fill="currentColor" />
            <span className="font-medium">4.9</span>
            <span className="text-slate-500">(128)</span>
          </div>
          <div className="text-slate-600">Boards included • Wetsuits provided</div>
        </div>
      </div>
    </div>
  )
}
