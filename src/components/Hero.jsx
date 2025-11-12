import React from 'react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50 to-white" />
        <img
          src="https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2070&auto=format&fit=crop"
          alt="Surfer cutting across a golden-hour wave"
          className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
            Book surf sessions with world‑class coaches
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-slate-700 max-w-2xl">
            Premium, mobile‑first booking built for the lineup. Clean design, instant checkout, trusted by schools and coaches.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#browse" className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-sky-700">
              Browse sessions
            </a>
            <a href="/admin" className="inline-flex items-center justify-center rounded-xl bg-white/70 backdrop-blur px-6 py-3 text-sky-700 font-semibold border border-sky-200 hover:bg-white">
              For schools & coaches
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-24 left-0 right-0 h-48 [mask-image:linear-gradient(to_bottom,black,transparent)]">
        <svg className="w-full h-full text-sky-100" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,64L48,69.3C96,75,192,85,288,117.3C384,149,480,203,576,218.7C672,235,768,213,864,181.3C960,149,1056,107,1152,106.7C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>
    </section>
  )
}
