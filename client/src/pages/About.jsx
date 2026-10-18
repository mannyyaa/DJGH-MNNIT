import React from 'react'
import { Link } from 'react-router-dom'
import {
  Users, Building2, ShieldCheck, BookOpen, Heart,
  ClipboardList, ArrowRight, MapPin, Calendar
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'

const ABOUT_IMG = '/about-hostel.jpeg'

const stats = [
  { value: '371',  label: 'Residents',     sub: 'Total intake capacity' },
  { value: '6',    label: 'Floors',         sub: 'Residential floors' },
  { value: '122',  label: 'Rooms',          sub: '117 triple + 5 hall rooms' },
  { value: '4',    label: 'Common Halls',   sub: 'Shared community spaces' },
  { value: '1',    label: 'Mess',           sub: 'Common dining hall' },
  { value: '24/7', label: 'Security',       sub: 'Round-the-clock' },
]

const sections = [
  {
    icon: Building2,
    title: 'Hostel Overview',
    content: `Diamond Jubilee Girls Hostel is one of the residential facilities at Motilal Nehru National Institute of Technology Allahabad (MNNIT Allahabad), located in Prayagraj, Uttar Pradesh. The hostel provides residential accommodation to female students of the institute, including undergraduate, postgraduate and doctoral students.

The hostel is named to commemorate the Diamond Jubilee of the institute and stands as a symbol of the institute's commitment to providing quality residential infrastructure to its student community.`,
  },
  {
    icon: Users,
    title: 'Accommodation',
    content: `Diamond Jubilee Girls Hostel has a total of 122 rooms spread across 6 floors in a single building. Of these, 117 are triple-occupancy rooms and 5 are hall rooms accommodating 4 residents each, giving the hostel a total intake capacity of 371 students.

Each room is equipped with study desks, wardrobes and cots for every occupant. The hostel has 4 common halls that serve as shared spaces for relaxation, community gatherings and informal interactions among residents.`,
  },
  {
    icon: Heart,
    title: 'Student Community',
    content: `Diamond Jubilee Girls Hostel fosters a vibrant and inclusive residential community. Students from across India and various academic programmes live together, creating a rich and diverse environment that promotes cultural exchange and lifelong friendships.

The elected Hostel Committee actively organises cultural events, festivals, sports competitions and community initiatives to enrich the residential experience and build a strong sense of belonging among residents.`,
  },
  {
    icon: ShieldCheck,
    title: 'Safety & Security',
    content: `The safety and security of all residents is the hostel administration's foremost priority. The hostel is secured with round-the-clock security personnel, CCTV surveillance at strategic locations, and controlled access at the hostel gate.

All visitors must register at the security desk. A well-defined emergency response protocol is in place, and residents are regularly briefed on fire safety and emergency procedures. The hostel maintains strict compliance with institute security guidelines.`,
  },
  {
    icon: BookOpen,
    title: 'Residential Environment',
    content: `The hostel provides an environment that encourages academic excellence and personal growth. Individual study areas and high-speed Wi-Fi connectivity ensure that residents have access to the resources they need for their studies.

Cleanliness and hygiene standards are maintained by dedicated housekeeping staff. Power backup ensures continuity of essential services, and maintenance staff are available to address any infrastructure or service-related concerns promptly.`,
  },
  {
    icon: ClipboardList,
    title: 'Administration',
    content: `The hostel is administered by the institute under the supervision of a Chief Warden appointed from the faculty. An Assistant Warden and a Hostel Caretaker assist in the day-to-day management of hostel operations.

The Hostel Committee, comprising elected student representatives, works in close coordination with the administration to address student concerns, organise activities and communicate important information to residents. The committee also includes a Mess Committee that oversees dining services and food quality.`,
  },
]

export default function About() {
  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel · MNNIT Allahabad"
        title="About the Hostel"
        subtitle="Learn about Diamond Jubilee Girls Hostel — its history, community and the environment it provides for student life."
      />

      {/* ── INTRO SPLIT ─────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel text="About" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540] mb-5">
                Diamond Jubilee Girls Hostel,<br />MNNIT Allahabad
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Diamond Jubilee Girls Hostel is a premier residential community at Motilal Nehru
                National Institute of Technology Allahabad, one of India's leading technical institutions.
                The hostel accommodates 371 students across 122 rooms in a single 6-floor building,
                providing a safe, comfortable and academically conducive living environment for female
                students enrolled across various programmes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With well-maintained rooms, excellent dining facilities, 4 common halls and a strong
                sense of community, the hostel ensures that students have everything they need to thrive
                — both academically and personally — during their years at MNNIT Allahabad.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin size={14} className="text-[#c9952a]" />
                  Prayagraj, Uttar Pradesh
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar size={14} className="text-[#c9952a]" />
                  Est. 1984
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/facilities"
                  className="inline-flex items-center gap-1.5 bg-[#0b1540] hover:bg-[#1a2f6e] text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
                >
                  View Facilities <ArrowRight size={14} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 border border-[#0b1540] text-[#0b1540] hover:bg-[#0b1540] hover:text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
                >
                  Contact Administration
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div style={{ overflow: 'hidden', height: 'auto', borderRadius: '1rem' }}>
                <img
                  src={ABOUT_IMG}
                  alt="Diamond Jubilee Girls Hostel at sunset"
                  className="w-full object-cover h-64 sm:h-80 lg:h-[480px]"
                  style={{
                    objectPosition: 'center 48%',
                    transform: 'scaleX(1.18)',
                    transformOrigin: 'center center',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE ─────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#0b1540]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-[#c9952a] text-xs font-semibold uppercase tracking-widest mb-2">
              At a Glance
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Key facts about the hostel
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map(s => (
              <div
                key={s.label}
                className="bg-white/8 border border-white/10 rounded-xl p-5 text-center hover:bg-white/12 transition-colors"
              >
                <p className="text-3xl font-bold text-[#f0d06a] font-serif">{s.value}</p>
                <p className="text-white text-sm font-medium mt-1">{s.label}</p>
                <p className="text-gray-400 text-[11px] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-xs mt-4">
            * Figures are indicative. Administrators can update these values as required.
          </p>
        </div>
      </section>

      {/* ── DETAIL SECTIONS ─────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <SectionLabel text="More About Us" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              A closer look at hostel life
            </h2>
          </div>

          <div className="space-y-10">
            {sections.map(({ icon: Icon, title, content }, i) => (
              <div
                key={title}
                className={`flex flex-col sm:flex-row gap-6 pb-10 ${i < sections.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-[#0b1540]/8 flex items-center justify-center">
                    <Icon size={22} className="text-[#1a2f6e]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#0b1540] mb-3">{title}</h3>
                  {content.split('\n\n').map((para, j) => (
                    <p key={j} className="text-gray-600 leading-relaxed mb-3 last:mb-0 text-sm sm:text-base">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-[#faf7f0] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xl font-serif font-bold text-[#0b1540] mb-3">
            Need to get in touch with the hostel administration?
          </h3>
          <p className="text-gray-500 text-sm mb-5">
            Contact the Warden, Caretaker or Hostel Office for any official queries.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#0b1540] hover:bg-[#1a2f6e] text-white font-semibold px-6 py-3 rounded transition-colors"
          >
            View Contact Information <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}
