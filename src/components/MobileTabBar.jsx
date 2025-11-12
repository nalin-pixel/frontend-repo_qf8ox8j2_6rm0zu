import React from 'react'
import { Home, Search, Star, User } from 'lucide-react'

export default function MobileTabBar() {
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 w-[92%] sm:hidden">
      <div className="mx-auto flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-lg px-5 py-3 text-slate-700">
        <a href="#browse" className="flex flex-col items-center gap-1 text-xs">
          <Home size={20} />
          <span>Home</span>
        </a>
        <a href="#browse" className="flex flex-col items-center gap-1 text-xs">
          <Search size={20} />
          <span>Search</span>
        </a>
        <a href="#favorites" className="flex flex-col items-center gap-1 text-xs">
          <Star size={20} />
          <span>Saved</span>
        </a>
        <a href="#account" className="flex flex-col items-center gap-1 text-xs">
          <User size={20} />
          <span>Account</span>
        </a>
      </div>
    </nav>
  )
}
