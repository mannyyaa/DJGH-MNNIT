import React from 'react'
import { Download, FileText, Shield } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'
import { AccordionGroup } from '../components/Accordion'
import { hostelRules } from '../data/siteData'

export default function Rules() {
  const accordionSections = hostelRules.map(section => ({
    heading: section.heading,
    items: section.items.map(item => ({
      question: item.title,
      answer: item.content,
    })),
  }))

  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel"
        title="Hostel Rules & Regulations"
        subtitle="All residents are expected to familiarise themselves with and adhere to the hostel rules. These guidelines ensure a safe, respectful and productive residential environment for everyone."
      />

      {/* ── INTRO ───────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={18} className="text-[#c9952a]" />
                <span className="text-sm font-semibold text-[#0b1540]">Notice to All Residents</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                These rules are framed in accordance with the institute's residential guidelines and
                are subject to revision. Residents are advised to check the notice board regularly
                for any updates. Violation of hostel rules may result in disciplinary action as per
                institute norms.
              </p>
            </div>

            {/* Download button */}
            <div className="bg-[#faf7f0] border border-gray-200 rounded-xl p-5 w-full sm:w-[220px] sm:shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={18} className="text-[#0b1540]" />
                <span className="font-semibold text-[#0b1540] text-sm">Official Rules Document</span>
              </div>
              <p className="text-gray-500 text-xs mb-4 leading-snug">
                Download the complete official hostel rules document for reference.
              </p>
              <button
                className="w-full flex items-center justify-center gap-2 bg-[#0b1540] hover:bg-[#1a2f6e] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                onClick={() => alert('Document will be available when uploaded by the administrator.')}
              >
                <Download size={14} />
                Download PDF
              </button>
              <p className="text-gray-400 text-[10px] text-center mt-2">
                * Updated: August 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RULES ACCORDIONS ────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-[#faf7f0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionLabel text="Rules & Regulations" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0b1540] mb-8">
            Complete Hostel Rules
          </h2>
          <AccordionGroup sections={accordionSections} />
        </div>
      </section>

      {/* ── CONTACT NOTE ────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-sm">
            For queries related to hostel rules or disciplinary matters, please contact the
            Warden or the Hostel Office during office hours.
          </p>
        </div>
      </section>
    </div>
  )
}
