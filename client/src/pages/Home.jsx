import React from 'react'
import { Link } from 'react-router-dom'
import {
  UtensilsCrossed, AlertCircle, Bell, Users, Building2,
  Phone, ChevronRight, ArrowRight, ShieldCheck, Wifi,
  BookOpen, Star, Diamond
} from 'lucide-react'
import SectionLabel from '../components/SectionLabel'

// Hero — actual DJGH campus photograph
const HERO_IMG = '/hero-djgh.png'

const quickLinks = [
  {
    icon: UtensilsCrossed,
    label: "Today's Mess",
    desc: "View today's meals and timings.",
    to: '/mess',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-100',
  },
  {
    icon: AlertCircle,
    label: 'Report an Issue',
    desc: 'Report maintenance or service problems.',
    to: '/complaints',
    color: 'bg-red-50 text-red-700 border-red-200',
    iconBg: 'bg-red-100',
  },
  {
    icon: Bell,
    label: 'Notice Board',
    desc: 'View important hostel announcements.',
    to: '/notices',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    icon: Users,
    label: 'Hostel Committee',
    desc: 'Meet the students and staff managing hostel activities.',
    to: '/committee',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    iconBg: 'bg-purple-100',
  },
  {
    icon: Building2,
    label: 'Facilities',
    desc: 'Explore all facilities available to residents.',
    to: '/facilities',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    iconBg: 'bg-teal-100',
  },
  {
    icon: Phone,
    label: 'Emergency Contacts',
    desc: 'Quickly reach the appropriate hostel authority.',
    to: '/contact',
    color: 'bg-gray-50 text-gray-700 border-gray-200',
    iconBg: 'bg-gray-100',
  },
]

const stats = [
  { value: '371',  label: 'Residents' },
  { value: '6',    label: 'Floors' },
  { value: '122',  label: 'Rooms' },
  { value: '24/7', label: 'Security' },
]

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Safe & Secure',
    desc: 'Round-the-clock security, CCTV surveillance and controlled access ensure resident safety at all times.',
  },
  {
    icon: Wifi,
    title: 'Well Connected',
    desc: 'High-speed Wi-Fi, a 24-hour reading room and academic support facilities for every resident.',
  },
  {
    icon: BookOpen,
    title: 'Academic Environment',
    desc: 'A quiet, disciplined residential environment conducive to focused study and personal growth.',
  },
  {
    icon: Star,
    title: 'Vibrant Community',
    desc: 'Active hostel committee, cultural events, sports, and a strong sense of community among residents.',
  },
]

export default function Home() {
  return (
    <div className="page-fade">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] sm:min-h-[88vh] flex items-start overflow-hidden pt-20 sm:pt-24 pb-10 sm:pb-16">
        {/* Background image */}
        <img
          src={HERO_IMG}
          alt="Diamond Jubilee Girls Hostel – Aerial View"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 75%' }}
        />
        {/* Overlay — deeper on left where text sits, lighter on right to show the photo */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(7,12,30,0.80) 0%, rgba(7,12,30,0.58) 40%, rgba(7,12,30,0.28) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-20 w-full">
          <div className="max-w-2xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full mb-4 sm:mb-6 backdrop-blur-sm max-w-[280px] sm:max-w-none">
              <Diamond size={12} className="text-[#c9952a] shrink-0" />
              <span>Motilal Nehru National Institute of Technology Allahabad</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4">
              Diamond Jubilee<br />
              <span className="text-[#f0d06a]">Girls Hostel</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-light italic mb-2 sm:mb-3">
              A place to live, learn, connect and grow.
            </p>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              Welcome to Diamond Jubilee Girls Hostel, MNNIT Allahabad — a safe,
              supportive and vibrant residential community for students.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#c9952a] hover:bg-[#a87620] text-white font-semibold px-6 py-3 rounded transition-colors"
              >
                Explore the Hostel
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/complaints"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-6 py-3 rounded backdrop-blur-sm transition-colors"
              >
                <AlertCircle size={16} />
                Report an Issue
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-8 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl">
            {stats.map(s => (
              <div
                key={s.label}
                className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center"
              >
                <p className="text-xl sm:text-2xl font-bold text-[#f0d06a] font-serif">{s.value}</p>
                <p className="text-xs text-white/70 mt-0.5 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── QUICK ACCESS ───────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="Quick Access" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              Everything you need, right here
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map(({ icon: Icon, label, desc, to, color, iconBg }) => (
              <Link
                key={to}
                to={to}
                className={`card-hover flex items-start gap-4 p-5 rounded-xl border ${color} group`}
              >
                <div className={`${iconBg} p-2.5 rounded-lg shrink-0`}>
                  <Icon size={22} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm mb-0.5">{label}</p>
                  <p className="text-xs opacity-75 leading-snug">{desc}</p>
                </div>
                <ChevronRight size={16} className="ml-auto shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ─────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
            {/* Text */}
            <div>
              <SectionLabel text="About the Hostel" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540] mb-4">
                Your home away from home<br />at MNNIT Allahabad
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Diamond Jubilee Girls Hostel is one of the premier residential facilities at Motilal
                Nehru National Institute of Technology Allahabad. It houses 371 students across 122 rooms
                and 6 floors, providing a safe, comfortable and academically conducive environment to
                live, learn and grow.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The hostel is administered by the institute and managed with the support of a dedicated
                warden, caretaker and an elected student committee that works to ensure the welfare and
                well-being of all residents.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#1a2f6e] hover:text-[#c9952a] font-semibold text-sm transition-colors group"
              >
                Read More About the Hostel
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0b1540]/8 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[#1a2f6e]" />
                  </div>
                  <h3 className="font-semibold text-[#0b1540] text-sm mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTICE STRIP ────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-14 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <SectionLabel text="Notice Board" />
              <h2 className="text-2xl font-serif font-bold text-[#0b1540]">Recent Announcements</h2>
            </div>
            <Link
              to="/notices"
              className="hidden sm:inline-flex items-center gap-1.5 text-[#1a2f6e] hover:text-[#c9952a] text-sm font-medium transition-colors"
            >
              View All Notices <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { cat: 'Important', date: 'Aug 10', title: 'Mess Timing Change – Winter Schedule', important: true },
              { cat: 'Hostel',    date: 'Aug 8',  title: 'Hostel Gate Closing Time – Revised',  important: true },
              { cat: 'Events',    date: 'Aug 7',  title: 'Annual Hostel Day – Volunteers Required', important: false },
            ].map((n, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 bg-white shadow-sm
                  ${n.important ? 'notice-important border-amber-100' : 'border-gray-100'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full
                    ${n.important ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'}`}>
                    {n.cat}
                  </span>
                  <span className="text-xs text-gray-400">{n.date}</span>
                </div>
                <p className="text-sm font-medium text-[#0b1540] leading-snug">{n.title}</p>
                <Link
                  to="/notices"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-[#1a2f6e] hover:text-[#c9952a] font-medium transition-colors"
                >
                  Read More <ChevronRight size={12} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-5 sm:hidden text-center">
            <Link to="/notices" className="text-sm text-[#1a2f6e] font-medium hover:text-[#c9952a]">
              View All Notices →
            </Link>
          </div>
        </div>
      </section>

      {/* ── MESS PREVIEW ────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-14 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <SectionLabel text="Mess" />
              <h2 className="text-2xl font-serif font-bold text-[#0b1540]">Today's Meals</h2>
            </div>
            <Link
              to="/mess"
              className="hidden sm:inline-flex items-center gap-1.5 text-[#1a2f6e] hover:text-[#c9952a] text-sm font-medium transition-colors"
            >
              Full Mess Page <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { meal: 'Breakfast',      time: '7:30–9:00 AM',   emoji: '🌅', items: ['Aloo Paratha, Garlic Chutney', 'Bread, Butter, Jam', 'Cornflakes, Sprouts, Fruit', 'Tea / Coffee / Bournvita, Milk'] },
              { meal: 'Lunch',         time: '12:30–2:00 PM',  emoji: '☀️', items: ['Arhar Dal', 'Lauki', 'Tomato Rice + Rice, Roti', 'Pickle, Cucumber, Papad'] },
              { meal: 'Eve. Snacks',   time: '5:00–6:30 PM',   emoji: '🫖', items: ['Maggie / Noodles', 'Coffee'] },
              { meal: 'Dinner',        time: '8:00–9:00 PM',   emoji: '🌙', items: ['Malai Dum Aloo', 'Chole', 'Gulab Jamun', 'Rice, Roti, Milk + Bournvita'] },
            ].map(m => (
              <div key={m.meal} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-[#0b1540] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{m.meal}</span>
                    <span className="text-lg">{m.emoji}</span>
                  </div>
                  <p className="text-[11px] text-[#93aeff] mt-0.5">{m.time}</p>
                </div>
                <ul className="px-4 py-3 space-y-1">
                  {m.items.map(item => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-gray-600">
                      <span className="text-[#c9952a] mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 sm:hidden text-center">
            <Link to="/mess" className="text-sm text-[#1a2f6e] font-medium hover:text-[#c9952a]">
              View Full Mess Page →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0b1540] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
            Have a hostel issue? Report it instantly.
          </h2>
          <p className="text-gray-300 text-sm mb-6 max-w-xl mx-auto">
            Use our structured complaint system to report maintenance, mess, or service-related
            issues. Track your complaint until it is resolved.
          </p>
          <Link
            to="/complaints"
            className="inline-flex items-center gap-2 bg-[#c9952a] hover:bg-[#a87620] text-white font-semibold px-7 py-3 rounded transition-colors"
          >
            <AlertCircle size={16} />
            Submit a Complaint
          </Link>
        </div>
      </section>

    </div>
  )
}
