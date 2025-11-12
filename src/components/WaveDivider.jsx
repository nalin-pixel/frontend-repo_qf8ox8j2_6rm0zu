import React from 'react'

export default function WaveDivider({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg className="w-full h-20 text-sky-50" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
        <path d="M0,64L48,69.3C96,75,192,85,288,101.3C384,117,480,139,576,144C672,149,768,139,864,112C960,85,1056,43,1152,42.7C1248,43,1344,85,1392,106.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
    </div>
  )
}
