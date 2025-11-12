import React from 'react'

export default function SocialProof() {
  const reviews = [
    { name: 'Ava', text: 'Booking was seamless and the coach was incredible. 10/10 would paddle out again.', rating: 5 },
    { name: 'Noah', text: 'Felt like a premium experience from start to finish. Loved the clear availability.', rating: 5 },
    { name: 'Kai', text: 'The UI is crisp and the sessions are easy to compare. Found the perfect spot.', rating: 4 },
  ]
  return (
    <section className="py-14 bg-gradient-to-b from-white to-sky-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Trusted by surfers everywhere</h2>
        <p className="text-slate-600 mt-2">Thousands of sessions booked with verified coaches.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-2xl bg-white/80 backdrop-blur border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 text-amber-500">
                {'★★★★★'.slice(0, r.rating)}
              </div>
              <p className="mt-3 text-slate-700">“{r.text}”</p>
              <div className="mt-3 text-sm text-slate-500">— {r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
