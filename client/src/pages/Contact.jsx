import React from 'react'
import {
  Phone, Mail, MapPin, Clock, Shield,
  HeartPulse, Flame, User, Wrench
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'
import { useAdmin } from '../context/AdminContext'

const emergencyIconMap = { Shield, HeartPulse, Flame, User, Wrench, Phone }

const emergencyBg = {
  navy:   { card: 'bg-[#0b1540]',   icon: 'bg-white/15 text-white', num: 'text-[#f0d06a]' },
  red:    { card: 'bg-red-700',     icon: 'bg-white/20 text-white', num: 'text-yellow-200' },
  orange: { card: 'bg-orange-600',  icon: 'bg-white/20 text-white', num: 'text-yellow-200' },
  gold:   { card: 'bg-[#a87620]',   icon: 'bg-white/20 text-white', num: 'text-yellow-100' },
  teal:   { card: 'bg-teal-700',    icon: 'bg-white/20 text-white', num: 'text-teal-100' },
  gray:   { card: 'bg-gray-700',    icon: 'bg-white/15 text-white', num: 'text-gray-100' },
}

export default function Contact() {
  const { members, contacts } = useAdmin()
  const adminMembers = members.filter(m => (m.group || m.committeeType) === 'administration')
  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel"
        title="Contact & Emergency"
        subtitle="Reach out to the hostel administration or use the emergency contacts provided below."
      />

      {/* ── EMERGENCY CONTACTS ──────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <Shield size={12} />
              EMERGENCY CONTACTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              Emergency Contacts
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Keep these numbers saved. In an emergency, every second counts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map(contact => {
              const Icon = emergencyIconMap[contact.icon] || Phone
              const colors = emergencyBg[contact.color] || emergencyBg.gray
              return (
                <div
                  key={contact.id}
                  className={`${colors.card} rounded-2xl p-5 text-white`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.icon}`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-white/60 text-xs border border-white/20 px-2 py-0.5 rounded-full">
                      {contact.available}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-0.5">{contact.title}</h3>
                  <p className={`${colors.num} text-2xl font-bold font-mono tracking-wide mb-2`}>
                    {contact.number}
                  </p>
                  <p className="text-white/70 text-xs leading-relaxed">{contact.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl px-5 py-4 max-w-2xl mx-auto text-center">
            <p className="text-red-700 text-sm font-medium">
              In a life-threatening emergency, always call <strong>112</strong> (National Emergency Number) immediately.
            </p>
          </div>
        </div>
      </section>

      {/* ── ADMINISTRATION CONTACTS ─────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="Administration" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              Hostel Administration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {adminMembers.map(person => (
              <div
                key={person.id}
                className="bg-[#faf7f0] border border-gray-100 rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-11 h-11 rounded-full bg-[#0b1540]/10 flex items-center justify-center text-[#0b1540] font-bold text-lg font-serif">
                    {person.name.replace('Dr. ','').replace('[','').charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0b1540] text-sm">{person.name}</p>
                    <p className="text-[#c9952a] text-xs font-medium">{person.position}</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 text-sm">
                    <Phone size={14} className="text-[#c9952a] mt-0.5 shrink-0" />
                    <span className="text-gray-600">{person.contact}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Hostel Office */}
            <div className="bg-[#0b1540] rounded-2xl p-5 text-white sm:col-span-2 lg:col-span-1">
              <h3 className="font-semibold text-base mb-4 pb-3 border-b border-white/15">
                Hostel Office
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Phone, label: '[Hostel Office Number]' },
                  { icon: Mail,  label: 'djgh@mnnit.ac.in' },
                  { icon: Clock, label: 'Mon–Fri: 9:00 AM – 5:00 PM' },
                  { icon: MapPin, label: 'Ground Floor, Diamond Jubilee Girls Hostel, MNNIT Allahabad' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <Icon size={14} className="text-[#c9952a] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#faf7f0] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <SectionLabel text="Location" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0b1540]">
              Find Us on Campus
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Address card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-[#0b1540] mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-[#c9952a]" />
                Postal Address
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Diamond Jubilee Girls Hostel<br />
                Motilal Nehru National Institute of Technology Allahabad<br />
                Teliarganj, Prayagraj<br />
                Uttar Pradesh – 211004<br />
                India
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={13} className="text-[#c9952a]" />
                  [Hostel Office Number]
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={13} className="text-[#c9952a]" />
                  djgh@mnnit.ac.in
                </div>
              </div>
            </div>

            {/* Map embed placeholder */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100 h-64 sm:h-80 flex items-center justify-center">
                <iframe
                  title="MNNIT Allahabad Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.9944127065!2d81.86623531501634!3d25.49308538375547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acb2c2b4b6b3b%3A0x5cb11bcc23f85cce!2sMotilal%20Nehru%20National%20Institute%20of%20Technology%20Allahabad!5e0!3m2!1sen!2sin!4v1691000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
