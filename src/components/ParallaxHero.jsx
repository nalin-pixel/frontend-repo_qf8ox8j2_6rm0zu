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
    <section className="relative overflow-hidden min-h-[88vh] flex items-end">
      {/* Background image with premium surf shot */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1505129017430-4bd3b050a3e7?q=80&w=2070&auto=format&fit=crop"
          alt="Surfer riding a wave"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Subtle dark gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
        {/* Top gradient for header contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 animate-fade-in">
          <div ref={ref} className="max-w-3xl will-change-transform">
            <h1
              className="text-[40px] sm:text-6xl lg:text-[76px] font-extrabold tracking-tight text-white leading-[1.05]"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Premium surf sessions, instantly bookable
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl">
              Connect with certified coaches • Book in seconds • Surf anywhere
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#browse"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 px-7 py-3 text-white font-semibold shadow-[0_4px_20px_rgba(0,158,217,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,158,217,0.35)] transition-all"
              >
                Browse sessions
              </a>
              <a
                href="/admin"
                className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/10 backdrop-blur px-7 py-3 text-white font-semibold hover:bg-white/20 transition-all"
              >
                For schools & coaches
              </a>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider className="-mb-2" />
    </section>
  )
}
