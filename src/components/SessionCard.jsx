import React from 'react'

export default function SessionCard({ session, onBook }) {
  const { title, description, location, level, session_type, price, start_time, availability, coach_id, school_id } = session
  const start = start_time ? new Date(start_time) : null
  const when = start ? start.toLocaleString() : 'TBA'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{location} • {when}</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 capitalize">{session_type}</span>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 ml-2 capitalize">{level || 'all'}</span>
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      )}
      <div className="flex items-center justify-between mt-auto">
        <div className="text-gray-900 font-semibold">${price?.toFixed?.(2) || price}
          <span className="text-sm text-gray-500 font-normal"> / person</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm ${availability?.available > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {availability?.available ?? 0} spots left
          </span>
          <button
            onClick={() => onBook(session)}
            disabled={!availability || availability.available <= 0}
            className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  )
}
