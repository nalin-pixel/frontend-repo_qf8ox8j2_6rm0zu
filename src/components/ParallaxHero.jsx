import React, { useEffect, useRef } from 'react'
import WaveDivider from './WaveDivider'

export default function ParallaxHero() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const y = window.scrollY
      el.style.transform = `translateY(${Math.min(y * 0.2, 80)}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2070&auto=format&fit=crop">
          <source src="https://cdn.coverr.co/videos/coverr-surfers-on-a-wave-9634/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div ref={ref} className="max-w-3xl will-change-transform">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
            Premium surf sessions, instantly bookable
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-white/90 max-w-2xl">
            World-class coaches and schools, transparent availability, and a booking flow designed for the lineup.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#browse" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-7 py-3 text-white font-semibold shadow hover:opacity-95">
              Browse sessions
            </a>
            <a href="/admin" className="inline-flex items-center justify-center rounded-xl bg-white/30 backdrop-blur px-7 py-3 text-white font-semibold border border-white/50 hover:bg-white/40">
              For schools & coaches
            </a>
          </div>
        </div>
      </div>

      <WaveDivider className="-mb-2" />
    </section>
  )
}
