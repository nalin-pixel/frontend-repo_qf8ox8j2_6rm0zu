import React from 'react'

export default function PremiumCard({ session, onBook }) {
  const { title, description, location, level, session_type, price, start_time, availability, image_url } = session
  const start = start_time ? new Date(start_time) : null
  const when = start ? start.toLocaleString() : 'TBA'

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm hover:shadow-md transition-all">
      {image_url && (
        <div className="relative h-44 w-full overflow-hidden">
          <img src={image_url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{location} • {when}</p>
          </div>
          <div className="text-right space-x-2 whitespace-nowrap">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 capitalize">{session_type}</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 capitalize">{level || 'all'}</span>
          </div>
        </div>
        {description && (
          <p className="mt-2 text-sm text-slate-700 line-clamp-2">{description}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-slate-900 font-semibold">${price?.toFixed?.(2) || price}
            <span className="text-sm text-slate-500 font-normal"> / person</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${availability?.available > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {availability?.available ?? 0} spots left
            </span>
            <button onClick={() => onBook(session)} disabled={!availability || availability.available <= 0} className="px-4 py-2 rounded-xl text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
