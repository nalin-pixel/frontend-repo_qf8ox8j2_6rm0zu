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
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all ${scrolled ? 'backdrop-blur-xl' : 'backdrop-blur'}`} style={{
      background: 'rgba(255,255,255,0.95)',
      boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
    }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
        <div className={`flex items-center justify-between rounded-2xl border ${scrolled ? 'border-white/60' : 'border-white/50'} px-3 py-2 transition-all`}>
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 shadow-inner" />
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-800">Surfbrew</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-[15px]">
            {[
              { href: '#browse', label: 'Sessions' },
              { href: '#coaches', label: 'Coaches' },
              { href: '/admin', label: 'Admin' },
              { href: '/test', label: 'Status' },
            ].map((link) => (
              <a key={link.href} href={link.href} className="text-slate-700 hover:text-slate-900 relative group">
                <span>{link.label}</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-sky-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="hidden sm:flex items-center gap-3">
            <a href="#" className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-900/5 transition-all">Sign in</a>
            <a href="#browse" className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-sky-500 to-cyan-600 shadow hover:from-sky-600 hover:to-cyan-700 transition-all">Get started</a>
          </div>
        </div>
      </div>
    </header>
  )
}
