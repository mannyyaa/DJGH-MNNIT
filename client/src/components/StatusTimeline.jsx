import React from 'react'
import { Check, Clock, Loader, CheckCircle } from 'lucide-react'

const STEPS = [
  { key: 'submitted',    label: 'Submitted',    icon: Clock },
  { key: 'acknowledged', label: 'Acknowledged', icon: Check },
  { key: 'assigned',     label: 'Assigned',     icon: Loader },
  { key: 'in_progress',  label: 'In Progress',  icon: Loader },
  { key: 'resolved',     label: 'Resolved',     icon: CheckCircle },
]

const ORDER = ['submitted', 'acknowledged', 'assigned', 'in_progress', 'resolved']

export default function StatusTimeline({ currentStatus = 'submitted' }) {
  const currentIdx = ORDER.indexOf(currentStatus)

  return (
    <>
      {/* Mobile: vertical list */}
      <div className="flex flex-col gap-2 sm:hidden">
        {STEPS.map((step, i) => {
          const done   = i < currentIdx
          const active = i === currentIdx
          const Icon   = step.icon
          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0
                ${done   ? 'bg-green-500 text-white'      : ''}
                ${active ? 'bg-[#1a2f6e] text-white ring-4 ring-[#1a2f6e]/20' : ''}
                ${!done && !active ? 'bg-gray-200 text-gray-400' : ''}`}>
                <Icon size={13} />
              </div>
              <span className={`text-xs font-medium
                ${done   ? 'text-green-600'  : ''}
                ${active ? 'text-[#1a2f6e] font-semibold'  : ''}
                ${!done && !active ? 'text-gray-400' : ''}`}>
                {step.label}
              </span>
              {active && (
                <span className="ml-auto text-[10px] bg-[#1a2f6e] text-white px-2 py-0.5 rounded-full">Current</span>
              )}
              {done && (
                <span className="ml-auto text-[10px] text-green-500">✓</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Desktop: horizontal row */}
      <div className="hidden sm:flex items-start justify-between w-full max-w-2xl mx-auto">
        {STEPS.map((step, i) => {
          const done    = i < currentIdx
          const active  = i === currentIdx
          const pending = i > currentIdx
          const Icon    = step.icon

          return (
            <div key={step.key} className="flex flex-col items-center flex-1 relative">
              {i < STEPS.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-0.5 transition-colors
                    ${done ? 'bg-green-500' : 'bg-gray-200'}`}
                  style={{ left: '50%' }}
                />
              )}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all
                ${done    ? 'bg-green-500 text-white shadow-sm' : ''}
                ${active  ? 'bg-[#1a2f6e] text-white shadow-md ring-4 ring-[#1a2f6e]/20' : ''}
                ${pending ? 'bg-gray-200 text-gray-400' : ''}`}>
                <Icon size={14} className={active ? 'status-pulse' : ''} />
              </div>
              <p className={`mt-2 text-[10px] font-medium text-center leading-tight
                ${done    ? 'text-green-600'  : ''}
                ${active  ? 'text-[#1a2f6e]'  : ''}
                ${pending ? 'text-gray-400'   : ''}`}>
                {step.label}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}
