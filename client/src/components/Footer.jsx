import React from 'react'
import { Link } from 'react-router-dom'
import { Diamond, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

const quickLinks = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/facilities',  label: 'Facilities' },
  { to: '/mess',        label: 'Mess' },
  { to: '/complaints',  label: 'Complaints' },
  { to: '/notices',     label: 'Notices' },
]

const moreLinks = [
  { to: '/committee',   label: 'Committee' },
  { to: '/rules',       label: 'Hostel Rules' },
  { to: '/faq',         label: 'FAQ' },
  { to: '/contact',     label: 'Contact' },
  { to: '/admin',       label: 'Admin Portal' },
]

export default function Footer() {
  return (
    <footer className="bg-[#070c1e] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#c9952a] flex items-center justify-center">
                <Diamond size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold font-serif text-sm leading-tight">
                  Diamond Jubilee Girls Hostel
                </p>
                <p className="text-[#6080ff] text-[11px] tracking-wide uppercase">MNNIT Allahabad</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              A safe, supportive and vibrant residential community for students of Motilal Nehru National Institute of Technology Allahabad.
            </p>
            <a
              href="https://mnnit.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#c9952a] hover:text-[#f0d06a] text-sm font-medium transition-colors"
            >
              MNNIT Allahabad
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-[#c9952a] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              More
            </h3>
            <ul className="space-y-2">
              {moreLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-[#c9952a] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2.5">
                <MapPin size={15} className="text-[#c9952a] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400 leading-snug">
                  Diamond Jubilee Girls Hostel,<br />
                  MNNIT Allahabad,<br />
                  Prayagraj – 211004
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#c9952a] shrink-0" />
                <span className="text-sm text-gray-400">Hostel Office: [Contact No.]</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#c9952a] shrink-0" />
                <span className="text-sm text-gray-400">djgh@mnnit.ac.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Diamond Jubilee Girls Hostel, MNNIT Allahabad. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Official Hostel Portal
          </p>
        </div>
      </div>
    </footer>
  )
}
