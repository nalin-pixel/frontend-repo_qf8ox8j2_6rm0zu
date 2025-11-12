import React, { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all ${scrolled ? 'backdrop-blur-xl' : 'backdrop-blur'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className={`flex items-center justify-between rounded-2xl bg-white/50 dark:bg-white/10 border ${scrolled ? 'border-white/60 shadow-lg' : 'border-white/40 shadow-sm'} px-4 py-2 transition-all`}>
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-inner" />
            <span className="text-xl font-extrabold tracking-tight text-slate-800">Surfbrew</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#browse" className="text-slate-700 hover:text-slate-900">Sessions</a>
            <a href="#coaches" className="text-slate-700 hover:text-slate-900">Coaches</a>
            <a href="/admin" className="text-slate-700 hover:text-slate-900">Admin</a>
            <a href="/test" className="text-slate-700 hover:text-slate-900">Status</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
