import React, { useState } from 'react'
import { Search, X, HelpCircle, MessageSquare } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'
import { Accordion } from '../components/Accordion'
import { useAdmin } from '../context/AdminContext'
import { Link } from 'react-router-dom'

export default function FAQ() {
  const { faqs } = useAdmin()
  const [query, setQuery] = useState('')

  const filtered = faqs.filter(
    f => f.question.toLowerCase().includes(query.toLowerCase()) ||
         f.answer.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel"
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about life, services and procedures at Diamond Jubilee Girls Hostel."
      />

      {/* ── SEARCH ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0b1540] pb-10">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full pl-11 pr-10 py-3 border border-white/10 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ LIST ────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-[#faf7f0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {query && (
            <p className="text-sm text-gray-500 mb-5">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{query}"
            </p>
          )}

          {filtered.length > 0 ? (
            <>
              <SectionLabel text="Questions & Answers" />
              <div className="mt-4">
                <Accordion items={filtered} />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <HelpCircle size={36} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-medium">No results found</p>
              <p className="text-gray-400 text-xs mt-1">Try a different search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT STRIP ───────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#0b1540]/8 flex items-center justify-center mx-auto mb-3">
            <MessageSquare size={22} className="text-[#0b1540]" />
          </div>
          <h3 className="font-serif font-bold text-[#0b1540] text-xl mb-2">
            Didn't find your answer?
          </h3>
          <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
            Contact the Hostel Committee or the Hostel Office directly. You can also submit a complaint or grievance through our online form.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0b1540] hover:bg-[#1a2f6e] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Contact Administration
            </Link>
            <Link
              to="/complaints"
              className="inline-flex items-center gap-2 border border-[#0b1540] text-[#0b1540] hover:bg-[#0b1540] hover:text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Submit a Complaint
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
