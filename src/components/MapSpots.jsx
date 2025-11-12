import React from 'react'

export default function MapSpots() {
  return (
    <section className="py-14 bg-gradient-to-b from-sky-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Surf spots</h2>
            <p className="text-slate-600 mt-2">Explore locations with live availability.</p>
          </div>
        </div>
        <div className="mt-6 rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-white/70 backdrop-blur">
          <iframe title="map" className="w-full h-[320px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19834.459927478217!2d-3.00659585!3d53.36515465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487ad8aa2a42c32d%3A0x1b567a4067ca9c8e!2sNew%20Brighton%20Beach!5e0!3m2!1sen!2sus!4v1700000000000"></iframe>
        </div>
      </div>
    </section>
  )
}
