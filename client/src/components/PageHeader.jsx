import React from 'react'

export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <section className="bg-[#0b1540] pt-7 sm:pt-10 pb-7 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {breadcrumb && (
          <p className="text-[#93aeff] text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3">{breadcrumb}</p>
        )}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 sm:mt-3 text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">{subtitle}</p>
        )}
        <div className="mt-3 sm:mt-4 w-14 sm:w-16 h-0.5 bg-[#c9952a]" />
      </div>
    </section>
  )
}
