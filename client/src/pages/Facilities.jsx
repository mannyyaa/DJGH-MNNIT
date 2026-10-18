import React, { useState } from 'react'
import {
  Bed, Users, Layout, BookMarked, Wifi,
  Gamepad2, Wind, Droplets, Zap,
  Sparkles, Wrench, ShieldCheck, Camera, Flame,
  HeartPulse, Coffee, ChevronRight, X, ZoomIn
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'

// ── Facility data with real photos ──────────────────────────────────────────
const FACILITIES = [
  {
    category: 'Accommodation',
    color: { badge: 'bg-blue-100 text-blue-700', icon: 'bg-blue-50 text-blue-600' },
    items: [
      {
        name: 'Triple Occupancy Rooms',
        icon: Bed,
        description: '117 well-furnished triple-occupancy rooms, each with cots, mattresses, individual wardrobes and an attached balcony — offering natural light and fresh air.',
        photo: '/facility-3seater.jpeg',
        photoPosition: 'center 70%',
      },
      {
        name: 'Hall Rooms (4-Seater)',
        icon: Users,
        description: '5 spacious hall rooms accommodating 4 students each, with steel almirahs, study chairs and ample natural light.',
        photo: '/facility-4seater.jpeg',
        photoPosition: 'center 65%',
      },
    ],
  },
  {
    category: 'Common Halls & Study',
    color: { badge: 'bg-violet-100 text-violet-700', icon: 'bg-violet-50 text-violet-600' },
    items: [
      {
        name: 'Common Study Halls',
        icon: Layout,
        description: '4 spacious common halls used for group study, community gatherings and shared activities. Fitted with large wooden tables and benches.',
        photo: '/facility-commonhall.jpeg',
        photoPosition: 'center 50%',
      },
      {
        name: 'Study Area',
        icon: BookMarked,
        description: 'Dedicated quiet study rooms with individual desks and chairs, designed for focused academic work away from the bustle of shared rooms.',
        photo: '/facility-studyarea.jpeg',
        photoPosition: 'center 60%',
      },
    ],
  },
  {
    category: 'Recreation',
    color: { badge: 'bg-teal-100 text-teal-700', icon: 'bg-teal-50 text-teal-600' },
    items: [
      {
        name: 'Indoor Games Room',
        icon: Gamepad2,
        description: 'A large recreation hall with multiple table tennis tables, carrom boards and other indoor games — perfect for unwinding after a long day.',
        photo: '/facility-indoorgames.jpeg',
        photoPosition: 'center 45%',
      },
      {
        name: 'Hostel Grounds',
        icon: Layout,
        description: 'Well-maintained open grounds with seating areas, garden patches and a badminton court — a lively outdoor space enjoyed by residents every evening.',
        photo: '/facility-ground.jpeg',
        photoPosition: 'center 55%',
      },
      {
        name: 'Night Canteen',
        icon: Coffee,
        description: 'The hostel canteen, open in the evenings, serves snacks and beverages in a warm outdoor setting — a favourite student hangout spot.',
        photo: '/facility-canteen.jpeg',
        photoPosition: 'center 38%',
      },
    ],
  },
  {
    category: 'Essential Services',
    color: { badge: 'bg-amber-100 text-amber-700', icon: 'bg-amber-50 text-amber-600' },
    items: [
      { name: 'Wi-Fi / Internet',    icon: Wifi,       description: 'High-speed Wi-Fi connectivity available throughout the hostel building.',            photo: null },
      { name: 'Laundry Services',    icon: Wind,       description: 'Washing machines available for residents on each floor.',                              photo: null },
      { name: 'RO Drinking Water',   icon: Droplets,   description: 'Purified RO drinking water available 24 hours on every floor.',                      photo: null },
      { name: 'Power Backup',        icon: Zap,        description: 'Uninterrupted power backup for essential areas and services.',                        photo: null },
      { name: 'Housekeeping',        icon: Sparkles,   description: 'Regular housekeeping for rooms, corridors and common areas.',                        photo: null },
      { name: 'Maintenance',         icon: Wrench,     description: 'Dedicated maintenance staff for prompt resolution of repair and infrastructure issues.',photo: null },
    ],
  },
  {
    category: 'Safety',
    color: { badge: 'bg-red-100 text-red-700', icon: 'bg-red-50 text-red-600' },
    items: [
      { name: '24/7 Security',       icon: ShieldCheck, description: 'Round-the-clock security personnel at the hostel gate and on the premises.',         photo: null },
      { name: 'CCTV Surveillance',   icon: Camera,      description: 'CCTV cameras installed at strategic locations throughout the hostel.',                photo: null },
      { name: 'Fire Safety',         icon: Flame,       description: 'Fire extinguishers, smoke detectors and clearly marked emergency exits on all floors.',photo: null },
      { name: 'Emergency Support',   icon: HeartPulse,  description: 'Emergency response protocol and helpline for resident safety.',                      photo: null },
    ],
  },
]

const ALL_CATEGORIES = ['All', ...FACILITIES.map(f => f.category)]

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  if (!item) return null
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
        >
          <X size={18} />
        </button>
        {/* Wide landscape view — fills most of the screen */}
        <img
          src={item.photo}
          alt={item.name}
          className="w-full object-cover"
          style={{
            height: 'min(65vh, 520px)',
            objectPosition: item.photoPosition || 'center',
          }}
        />
        <div className="px-5 sm:px-7 py-4 sm:py-5">
          <h3 className="font-serif font-bold text-[#0b1540] text-lg sm:text-xl mb-1">{item.name}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

// ── Photo facility card ───────────────────────────────────────────────────────
function PhotoCard({ item, iconColor, onExpand }) {
  const Icon = item.icon
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group card-hover">
      {/* Photo */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ height: '220px' }}
        onClick={() => onExpand(item)}
      >
        <img
          src={item.photo}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: item.photoPosition || 'center' }}
        />
        {/* Dark gradient at bottom so name is legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {/* Expand hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <ZoomIn size={18} className="text-white" />
          </div>
        </div>
        {/* Name badge on photo */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <p className="text-white font-semibold text-sm drop-shadow">{item.name}</p>
        </div>
      </div>
      {/* Info */}
      <div className="px-4 py-4 flex gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
          <Icon size={17} />
        </div>
        <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}

// ── Plain (no-photo) facility card ───────────────────────────────────────────
function PlainCard({ item, iconColor }) {
  const Icon = item.icon
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-3 card-hover">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
        <Icon size={17} />
      </div>
      <div>
        <p className="font-semibold text-[#0b1540] text-sm mb-0.5">{item.name}</p>
        <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Facilities() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem]     = useState(null)

  const filtered = activeCategory === 'All'
    ? FACILITIES
    : FACILITIES.filter(f => f.category === activeCategory)

  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel"
        title="Facilities"
        subtitle="Explore the amenities and services available to all 371 residents across 6 floors."
      />

      {/* ── CATEGORY FILTER ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors
                  ${activeCategory === cat
                    ? 'bg-[#0b1540] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITY SECTIONS ──────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
          {filtered.map(({ category, color, items }) => {
            const withPhoto  = items.filter(i => i.photo)
            const withoutPhoto = items.filter(i => !i.photo)

            return (
              <div key={category}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${color.badge}`}>
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Photo cards */}
                {withPhoto.length > 0 && (
                  <div className={`grid gap-5 mb-5
                    ${withPhoto.length === 1 ? 'grid-cols-1 max-w-sm' : ''}
                    ${withPhoto.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : ''}
                    ${withPhoto.length >= 3  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : ''}`}
                  >
                    {withPhoto.map(item => (
                      <PhotoCard
                        key={item.name}
                        item={item}
                        iconColor={color.icon}
                        onExpand={setLightboxItem}
                      />
                    ))}
                  </div>
                )}

                {/* Plain cards (no photo) */}
                {withoutPhoto.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {withoutPhoto.map(item => (
                      <PlainCard
                        key={item.name}
                        item={item}
                        iconColor={color.icon}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── STATS BAND ─────────────────────────────────────────────────── */}
      <section className="py-10 bg-[#0b1540]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { label: '4 Common Halls',  sub: 'Study & community spaces' },
              { label: 'Wi-Fi',           sub: 'Campus-wide coverage' },
              { label: 'Power Backup',    sub: 'Essential services' },
              { label: '24/7 Security',   sub: 'Round-the-clock' },
            ].map(item => (
              <div key={item.label}>
                <p className="text-[#f0d06a] font-semibold text-base">{item.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  )
}
