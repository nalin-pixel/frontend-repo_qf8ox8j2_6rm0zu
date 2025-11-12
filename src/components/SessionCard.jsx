import React from 'react'
import { Star, MapPin, Dot } from 'lucide-react'

export default function SessionCard({ session, onBook }) {
  const { title, description, location, level, session_type, price, start_time, availability, coach, image_url, rating } = session
  const start = start_time ? new Date(start_time) : null
  const when = start ? start.toLocaleString() : 'TBA'

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
      {image_url && (
        <div className="h-36 w-full overflow-hidden">
          <img src={image_url} alt="Surf spot" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14} className="text-slate-400" />{location} • {when}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-sky-50 text-sky-700 capitalize">{session_type}</span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 ml-2 capitalize">{level || 'all'}</span>
          </div>
        </div>
        {coach && (
          <div className="flex items-center gap-3">
            <img src={coach.avatar || 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop'} alt={coach.name} className="h-8 w-8 rounded-full object-cover" />
            <div className="text-sm">
              <div className="font-medium text-slate-800 flex items-center gap-1">
                {coach.name}
                <span className="flex items-center gap-1 text-amber-500 ml-1"><Star size={14} fill="currentColor" />{rating || '4.9'}</span>
              </div>
              <div className="text-slate-500">{coach.role || 'Certified Coach'}</div>
            </div>
          </div>
        )}
        {description && (
          <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
        )}
        <div className="flex items-center justify-between mt-auto">
          <div className="text-slate-900 font-semibold">${price?.toFixed?.(2) || price}
            <span className="text-sm text-slate-500 font-normal"> / person</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${availability?.available > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {availability?.available ?? 0} spots left
            </span>
            <button
              onClick={() => onBook(session)}
              disabled={!availability || availability.available <= 0}
              className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed shadow"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
