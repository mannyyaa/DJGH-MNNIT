import React, { useState } from 'react'
import { Calendar, X, ZoomIn } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'
import { hostelEvents } from '../data/siteData'

const FILTERS = ['All', 'Events', 'Festivals', 'Sports', 'Cultural', 'Community']

const catColors = {
  Events:    'bg-blue-100 text-blue-700',
  Festivals: 'bg-amber-100 text-amber-700',
  Sports:    'bg-green-100 text-green-700',
  Cultural:  'bg-purple-100 text-purple-700',
  Community: 'bg-teal-100 text-teal-700',
  Activities:'bg-rose-100 text-rose-700',
}

function LightboxModal({ event, onClose }) {
  if (!event) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>
          <span className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${catColors[event.category] || 'bg-gray-100 text-gray-700'}`}>
            {event.category}
          </span>
        </div>
        <div className="px-6 py-5">
          <h3 className="font-serif font-bold text-[#0b1540] text-xl mb-2">{event.title}</h3>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
            <Calendar size={12} />
            {event.date}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function HostelLife() {
  const [filter, setFilter]   = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'All'
    ? hostelEvents
    : hostelEvents.filter(e => e.category === filter)

  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel"
        title="Hostel Life"
        subtitle="A glimpse into the vibrant community, events and activities at Diamond Jubilee Girls Hostel."
      />

      {/* ── FILTER BAR ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors
                  ${filter === f
                    ? 'bg-[#0b1540] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY GRID ────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <SectionLabel text="Gallery" />
            <h2 className="text-2xl font-serif font-bold text-[#0b1540]">
              {filter === 'All' ? 'All Events & Activities' : filter}
              <span className="text-gray-400 text-base font-normal ml-2">({filtered.length})</span>
            </h2>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(event => (
                <button
                  key={event.id}
                  onClick={() => setSelected(event)}
                  className="text-left bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm card-hover group focus:outline-none focus:ring-2 focus:ring-[#0b1540]/30"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0b1540]/0 group-hover:bg-[#0b1540]/30 transition-colors flex items-center justify-center">
                      <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${catColors[event.category] || 'bg-gray-100 text-gray-700'}`}>
                      {event.category}
                    </span>
                  </div>
                  <div className="px-5 py-4">
                    <h3 className="font-semibold text-[#0b1540] text-sm leading-snug">{event.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1.5">
                      <Calendar size={11} />
                      {event.date}
                    </div>
                    <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-2">{event.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No events found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── INFO BAND ───────────────────────────────────────────────────── */}
      <section className="py-12 bg-[#0b1540]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xl font-serif font-bold text-white mb-2">
            Life at Diamond Jubilee Girls Hostel
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xl mx-auto">
            Beyond academics, Diamond Jubilee Girls Hostel is a place where students celebrate festivals,
            compete in sports, participate in cultural activities and build friendships that last a lifetime.
            The Hostel Committee regularly organises events that make every semester memorable.
          </p>
        </div>
      </section>

      <LightboxModal event={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
