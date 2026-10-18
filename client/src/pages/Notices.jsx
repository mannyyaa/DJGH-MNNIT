import React, { useState, useMemo } from 'react'
import { Search, Bell, AlertTriangle, Calendar, ChevronRight, X } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'
import { useAdmin } from '../context/AdminContext'

const CATEGORIES = ['All', 'Important', 'Hostel', 'Mess', 'Maintenance', 'Events', 'Administration', 'General']

const catColors = {
  Important:      'bg-red-100 text-red-700',
  Hostel:         'bg-blue-100 text-blue-700',
  Mess:           'bg-amber-100 text-amber-700',
  Maintenance:    'bg-orange-100 text-orange-700',
  Events:         'bg-purple-100 text-purple-700',
  Administration: 'bg-teal-100 text-teal-700',
  General:        'bg-gray-100 text-gray-600',
}

function formatDate(date) {
  if (!date) return ''
  // Handle both ISO date strings and plain date strings like "2026-08-10"
  const d = new Date(date)
  if (isNaN(d)) return date
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
function NoticeModal({ notice, onClose }) {
  if (!notice) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${catColors[notice.category] || catColors.General}`}>
            {notice.category}
          </span>
          {notice.important && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <AlertTriangle size={11} />
              Important
            </span>
          )}
        </div>
        <h3 className="font-serif font-bold text-[#0b1540] text-xl mb-2">{notice.title}</h3>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
          <Calendar size={12} />
          {formatDate(notice.date)}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{notice.description}</p>
        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Issued by: Diamond Jubilee Girls Hostel Administration, MNNIT Allahabad
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Notices() {
  const { notices } = useAdmin()
  const [query, setQuery]           = useState('')
  const [activeCategory, setCat]    = useState('All')
  const [openNotice, setOpenNotice] = useState(null)

  const filtered = useMemo(() => {
    return notices.filter(n => {
      const matchCat = activeCategory === 'All' || n.category === activeCategory
      const matchQ   = n.title.toLowerCase().includes(query.toLowerCase()) ||
                       (n.description || '').toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQ
    })
  }, [notices, query, activeCategory])

  const important = filtered.filter(n => n.important)
  const regular   = filtered.filter(n => !n.important)

  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel"
        title="Notice Board"
        subtitle="Official announcements from Diamond Jubilee Girls Hostel administration."
      />

      {/* ── SEARCH & FILTER ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search notices…"
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCat(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
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

      <section className="py-10 sm:py-14 bg-[#faf7f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Important notices */}
          {important.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={15} className="text-amber-600" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-amber-700">
                  Important Notices
                </h2>
              </div>
              <div className="space-y-3">
                {important.map(n => (
                  <button
                    key={n.id}
                    onClick={() => setOpenNotice(n)}
                    className="w-full text-left notice-important bg-white border border-amber-100 rounded-xl px-5 py-4 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${catColors[n.category] || catColors.General}`}>
                            {n.category}
                          </span>
                          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-600">
                            <AlertTriangle size={10} /> Important
                          </span>
                        </div>
                        <p className="font-semibold text-[#0b1540] text-sm leading-snug">{n.title}</p>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{n.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <Calendar size={11} />
                          {formatDate(n.date)}
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-[#c9952a] ml-auto mt-1 transition-colors" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Regular notices */}
          {regular.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bell size={15} className="text-[#1a2f6e]" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a2f6e]">
                  {activeCategory === 'All' ? 'All Notices' : activeCategory}
                </h2>
              </div>
              <div className="space-y-3">
                {regular.map(n => (
                  <button
                    key={n.id}
                    onClick={() => setOpenNotice(n)}
                    className="w-full text-left bg-white border border-gray-100 rounded-xl px-5 py-4 hover:shadow-md hover:border-gray-200 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${catColors[n.category] || catColors.General}`}>
                            {n.category}
                          </span>
                        </div>
                        <p className="font-semibold text-[#0b1540] text-sm leading-snug">{n.title}</p>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{n.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="flex items-center gap-1 text-gray-400 text-xs justify-end">
                          <Calendar size={11} />
                          {formatDate(n.date)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#1a2f6e] group-hover:text-[#c9952a] justify-end mt-1 transition-colors">
                          Read More <ChevronRight size={12} />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Bell size={36} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm font-medium">No notices found</p>
              <p className="text-gray-400 text-xs mt-1">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </section>

      <NoticeModal notice={openNotice} onClose={() => setOpenNotice(null)} />
    </div>
  )
}
