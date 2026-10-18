import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Accordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className="bg-white">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-[#0b1540] text-sm sm:text-base pr-4">{item.question || item.title}</span>
            <ChevronDown
              size={18}
              className={`text-[#c9952a] shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          <div className={`accordion-content ${open === i ? 'open' : ''}`}>
            <div className="px-5 pb-5 pt-2 text-gray-600 text-sm leading-relaxed">
              {item.answer || item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function AccordionGroup({ sections }) {
  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <div key={i}>
          {section.heading && (
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1a2f6e] mb-2 px-1">
              {section.heading}
            </h3>
          )}
          <Accordion items={section.items} />
        </div>
      ))}
    </div>
  )
}
