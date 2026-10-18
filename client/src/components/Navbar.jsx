import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, AlertCircle, Diamond } from 'lucide-react'

const navLinks = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/facilities',  label: 'Facilities' },
  { to: '/mess',        label: 'Mess' },
  { to: '/complaints',  label: 'Complaints' },
  { to: '/notices',     label: 'Notices' },
  { to: '/committee',   label: 'Committee' },
  { to: '/faq',         label: 'FAQ' },
  { to: '/contact',     label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-[#0b1540] shadow-lg' : 'bg-[#0b1540]/95 backdrop-blur-sm'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#c9952a] flex items-center justify-center shrink-0">
              <Diamond size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm leading-tight font-serif truncate">
                Diamond Jubilee Girls Hostel
              </p>
              <p className="text-[#93aeff] text-[10px] leading-tight tracking-wide uppercase">
                MNNIT Allahabad
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 text-[12px] font-medium rounded transition-colors duration-150
                   ${isActive
                     ? 'text-[#c9952a] bg-white/10'
                     : 'text-gray-300 hover:text-white hover:bg-white/8'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right CTA + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/complaints"
              className="hidden lg:flex items-center gap-1.5 bg-[#c9952a] hover:bg-[#a87620] text-white text-xs font-semibold px-3 py-2 rounded transition-colors duration-150"
            >
              <AlertCircle size={13} />
              Report an Issue
            </Link>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden text-gray-300 hover:text-white p-1.5 rounded transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a1232] border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                   ${isActive
                     ? 'text-[#c9952a] bg-white/10'
                     : 'text-gray-300 hover:text-white hover:bg-white/8'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/complaints"
              className="mt-2 flex items-center justify-center gap-2 bg-[#c9952a] hover:bg-[#a87620] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <AlertCircle size={15} />
              Report an Issue
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
