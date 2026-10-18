import React from 'react'
import {
  ShieldCheck, Users, UtensilsCrossed,
  MessageSquare, Wrench, Calendar, ClipboardList, Heart
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'
import { administration, hostelCommittee, messCommittee } from '../data/siteData'
import { useAdmin } from '../context/AdminContext'

function AdminCard({ member }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-[#0b1540] px-6 py-5">
        <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center text-white font-bold text-2xl font-serif mx-auto mb-3">
          {member.name.replace('Dr. ', '').charAt(0)}
        </div>
        <p className="text-white font-semibold text-center text-sm">{member.name}</p>
        <p className="text-[#c9952a] text-xs text-center font-medium mt-0.5">{member.position}</p>
      </div>
      <div className="px-5 py-4 space-y-2">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Department</p>
          <p className="text-gray-700 text-sm mt-0.5">{member.department}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Contact</p>
          <p className="text-gray-700 text-sm mt-0.5">{member.contact}</p>
        </div>
      </div>
    </div>
  )
}

function CommitteeMemberCard({ member, accent = 'navy' }) {
  const initial = member.name.replace('Dr. ', '').replace('[','').charAt(0)
  const colors = accent === 'gold'
    ? 'bg-[#c9952a] text-white'
    : 'bg-[#0b1540]/10 text-[#0b1540]'

  return (
    <div className="card-hover bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base font-serif shrink-0 ${colors}`}>
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#0b1540] text-sm leading-tight">{member.name}</p>
          <p className="text-[#c9952a] text-xs font-semibold mt-0.5">{member.position}</p>
        </div>
      </div>
      <p className="text-gray-500 text-[11px] leading-snug mt-3 sm:pl-[60px]">{member.responsibilities}</p>
    </div>
  )
}

const committeeRoles = [
  { icon: Heart,         title: 'Student Welfare',              desc: 'Advocating for the needs and well-being of all hostel residents.' },
  { icon: Calendar,      title: 'Hostel Activities',            desc: 'Organising cultural, sports and community events for residents.' },
  { icon: MessageSquare, title: 'Administration Liaison',       desc: 'Communicating student concerns to hostel and institute administration.' },
  { icon: Wrench,        title: 'Maintenance Coordination',     desc: 'Coordinating with maintenance staff for prompt resolution of issues.' },
  { icon: ClipboardList, title: 'Student Representation',       desc: 'Representing student interests in all hostel-related decisions.' },
  { icon: Users,         title: 'Community Initiatives',        desc: 'Fostering a sense of community and belonging among all residents.' },
]

export default function Committee() {
  const { members } = useAdmin()
  const adminMembers  = members.filter(m => (m.group || m.committeeType) === 'administration')
  const hostelMembers = members.filter(m => (m.group || m.committeeType) === 'hostel')
  const messMembers   = members.filter(m => (m.group || m.committeeType) === 'mess')

  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel"
        title="Hostel Committee"
        subtitle="Meet the administration and the elected student representatives who manage and support hostel life."
      />

      {/* ── ADMINISTRATION ──────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="Administration" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              Hostel Administration
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              The hostel is administered by faculty appointed by the institute and supported by dedicated hostel staff.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {adminMembers.map(m => <AdminCard key={m.id} member={m} />)}
          </div>

          {/* Hostel office info */}
          <div className="mt-8 max-w-2xl mx-auto bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#0b1540]/8 flex items-center justify-center">
                <ClipboardList size={18} className="text-[#0b1540]" />
              </div>
              <h3 className="font-semibold text-[#0b1540]">Hostel Office</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Phone</p>
                <p className="text-gray-700 mt-0.5">[Hostel Office Number]</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Email</p>
                <p className="text-gray-700 mt-0.5">djgh@mnnit.ac.in</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Office Hours</p>
                <p className="text-gray-700 mt-0.5">Mon–Fri, 9:00 AM – 5:00 PM</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Location</p>
                <p className="text-gray-700 mt-0.5">Ground Floor, Hostel Building</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT DOES THE COMMITTEE DO ──────────────────────────────────── */}
      <section className="py-14 bg-[#0b1540]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-[#c9952a] text-xs font-semibold uppercase tracking-widest mb-2">Purpose</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              What does the Hostel Committee do?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {committeeRoles.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/8 border border-white/10 rounded-xl p-5 hover:bg-white/12 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#c9952a]/15 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-[#c9952a]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOSTEL COMMITTEE MEMBERS ────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="Student Committee" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              Hostel Committee Members
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Elected student representatives who work to ensure resident welfare, community activities and smooth hostel operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {hostelMembers.map(m => (
              <CommitteeMemberCard key={m.id} member={m} accent={m.position === 'Hostel President' || m.position === 'President' ? 'gold' : 'navy'} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MESS COMMITTEE ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#faf7f0] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="Mess Committee" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              Mess Committee Members
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              The Mess Committee oversees dining services, food quality, hygiene and student feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {messMembers.map(m => (
              <CommitteeMemberCard key={m.id} member={m} accent="gold" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
