import React from 'react'

export default function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-7 h-0.5 bg-[#c9952a]" />
      <span className="text-[#c9952a] text-xs font-semibold uppercase tracking-widest">{text}</span>
    </div>
  )
}
