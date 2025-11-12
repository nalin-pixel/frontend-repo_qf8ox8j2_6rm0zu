import React, { useEffect, useState } from 'react'

export default function Toaster() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      if (typeof e.detail === 'string') {
        setToast({ message: e.detail, id: Date.now() })
        setTimeout(() => setToast(null), 2800)
      }
    }
    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [])

  if (!toast) return null
  return (
    <div className="fixed top-20 right-4 z-50">
      <div className="rounded-xl bg-slate-900/90 text-white px-4 py-3 shadow-lg border border-white/10">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-sm">{toast.message}</span>
        </div>
      </div>
    </div>
  )
}
