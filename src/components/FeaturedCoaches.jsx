import React from 'react'

export default function FeaturedCoaches() {
  const coaches = [
    { name: 'Maya R.', role: 'ISA Level 2', photo: 'https://images.unsplash.com/photo-1547097465-93c1a308fcff?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Luca P.', role: 'Big Wave Specialist', photo: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Sage K.', role: 'Longboard Pro', photo: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1200&auto=format&fit=crop' },
  ]
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Featured coaches</h2>
            <p className="text-slate-600 mt-2">Handpicked talent with verified credentials.</p>
          </div>
          <a href="#coaches" className="hidden sm:inline-flex items-center rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white px-4 py-2 font-semibold shadow hover:opacity-95">View all</a>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {coaches.map((c) => (
            <div key={c.name} className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur border border-slate-100 shadow-sm">
              <div className="h-56 w-full overflow-hidden">
                <img src={c.photo} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                  <p className="text-slate-600 text-sm">{c.role}</p>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
