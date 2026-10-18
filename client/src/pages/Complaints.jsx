import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Building2, Zap, Droplets, Armchair, Sparkles,
  Wifi, UtensilsCrossed, ShieldCheck, HelpCircle,
  Upload, Send, Search, CheckCircle, Clock,
  AlertCircle, ChevronDown, Copy, X
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'
import StatusTimeline from '../components/StatusTimeline'
import { useToast } from '../context/ToastContext'
import { complaintsAPI } from '../services/api'
import { useAdmin } from '../context/AdminContext'

const CATEGORIES = [
  {
    id: 'civil',
    label: 'Civil / Infrastructure',
    icon: Building2,
    color: 'bg-stone-50 border-stone-200 text-stone-700',
    iconBg: 'bg-stone-100',
    subcategories: ['Walls', 'Flooring', 'Doors', 'Windows', 'Ceiling', 'Leakage', 'Structural Issues', 'Other'],
  },
  {
    id: 'electrical',
    label: 'Electrical',
    icon: Zap,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    iconBg: 'bg-yellow-100',
    subcategories: ['Lights', 'Fans', 'Switches', 'Sockets', 'Power Supply', 'Electrical Appliances', 'Other'],
  },
  {
    id: 'plumbing',
    label: 'Plumbing / Water',
    icon: Droplets,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    iconBg: 'bg-blue-100',
    subcategories: ['Taps', 'Washbasins', 'Toilets', 'Water Supply', 'Leakage', 'Drainage', 'Other'],
  },
  {
    id: 'furniture',
    label: 'Furniture',
    icon: Armchair,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    iconBg: 'bg-orange-100',
    subcategories: ['Beds', 'Tables', 'Chairs', 'Cupboards', 'Study Furniture', 'Other'],
  },
  {
    id: 'cleaning',
    label: 'Cleaning / Sanitation',
    icon: Sparkles,
    color: 'bg-teal-50 border-teal-200 text-teal-700',
    iconBg: 'bg-teal-100',
    subcategories: ['Room Cleaning', 'Washrooms', 'Common Areas', 'Waste Disposal', 'Pest-Related', 'Other'],
  },
  {
    id: 'internet',
    label: 'Internet / Wi-Fi',
    icon: Wifi,
    color: 'bg-violet-50 border-violet-200 text-violet-700',
    iconBg: 'bg-violet-100',
    subcategories: ['Connectivity', 'Speed', 'Router / Access Point', 'Network Outage', 'Other'],
  },
  {
    id: 'mess',
    label: 'Mess',
    icon: UtensilsCrossed,
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    iconBg: 'bg-amber-100',
    subcategories: ['Food Quality', 'Hygiene', 'Menu', 'Timing', 'Mess Service', 'Other'],
  },
  {
    id: 'security',
    label: 'Security',
    icon: ShieldCheck,
    color: 'bg-red-50 border-red-200 text-red-700',
    iconBg: 'bg-red-100',
    subcategories: ['Security Concerns', 'Access Issues', 'Lighting / Security Infrastructure', 'Other'],
  },
  {
    id: 'other',
    label: 'Other',
    icon: HelpCircle,
    color: 'bg-gray-50 border-gray-200 text-gray-700',
    iconBg: 'bg-gray-100',
    subcategories: ['General Issue', 'Other'],
  },
]

const BLOCKS = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Fourth Floor', 'Fifth Floor', 'Sixth Floor', 'Common Area']

export default function Complaints() {
  const { addToast } = useToast()
  const { addComplaint, complaints: allComplaints, updateComplaint } = useAdmin()
  const location = useLocation()

  // Form state
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [form, setForm] = useState({ subcategory: '', block: '', room: '', description: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState(null)

  // Auto-select category if navigated from mess page
  useEffect(() => {
    if (location.state?.category === 'mess') {
      const messCat = CATEGORIES.find(c => c.id === 'mess')
      if (messCat) {
        setSelectedCategory(messCat)
        setForm(f => ({ ...f, subcategory: messCat.subcategories[0] }))
        // Scroll to the form
        setTimeout(() => {
          document.getElementById('complaint-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
    }
  }, [location.state])

  // Tracking state
  const [trackId, setTrackId]         = useState('')
  const [tracking, setTracking]       = useState(false)
  const [trackResult, setTrackResult] = useState(null)
  const [trackError, setTrackError]   = useState(false)

  // Recently resolved — fetched from API for public transparency
  const [recentResolved, setRecentResolved] = useState([])
  useEffect(() => {
    complaintsAPI.recentResolved()
      .then(d => setRecentResolved(d.complaints || []))
      .catch(() => setRecentResolved([]))
  }, [])

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat)
    setForm(f => ({ ...f, subcategory: cat.subcategories[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedCategory) { addToast('Please select a complaint category.', 'error'); return }
    if (!form.description.trim()) { addToast('Please describe your issue.', 'error'); return }

    setSubmitting(true)
    try {
      const c = await addComplaint({
        category:    selectedCategory.id,
        subcategory: form.subcategory,
        floor:       form.block,
        room:        form.room,
        description: form.description,
      })
      setSubmittedId(c.complaintId)
      addToast(`Complaint submitted. Your ID is ${c.complaintId}`, 'success', 6000)
    } catch (err) {
      addToast(err.message || 'Could not submit complaint. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!trackId.trim()) return
    setTracking(true)
    setTrackResult(null)
    setTrackError(false)
    const id = trackId.trim().toUpperCase()
    try {
      const data = await complaintsAPI.track(id)
      setTrackResult(data.complaint)
    } catch (err) {
      // fallback: search in context (covers complaints submitted this session before reload)
      const found = allComplaints.find(c => c.complaintId === id)
      if (found) { setTrackResult(found) } else { setTrackError(true) }
    } finally {
      setTracking(false)
    }
  }

  const copyId = (id) => {
    navigator.clipboard?.writeText(id)
    addToast('Complaint ID copied to clipboard.', 'info')
  }

  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel"
        title="Hostel Complaint & Grievance Redressal"
        subtitle="Report an issue. Track its progress. Help us improve your hostel."
      />

      {/* ── CATEGORIES ──────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <SectionLabel text="Step 1" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0b1540]">
              Select a Complaint Category
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon
              const active = selectedCategory?.id === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat)}
                  className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border-2 text-center transition-all cursor-pointer
                    ${active
                      ? 'border-[#0b1540] bg-[#0b1540] text-white shadow-lg scale-[1.02]'
                      : `${cat.color} hover:shadow-md hover:scale-[1.01]`}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                    ${active ? 'bg-white/20' : cat.iconBg}`}>
                    <Icon size={20} className={active ? 'text-white' : ''} />
                  </div>
                  <span className="text-xs font-semibold leading-tight">{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── COMPLAINT FORM ──────────────────────────────────────────────── */}
      <section id="complaint-form" className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <SectionLabel text="Step 2" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0b1540]">
              Describe Your Issue
            </h2>
          </div>

          {submittedId ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <CheckCircle size={44} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-green-800 font-bold text-xl mb-2">Complaint Submitted</h3>
              <p className="text-green-700 text-sm mb-5">
                Your complaint has been registered. Use the ID below to track its status.
              </p>
              <div className="inline-flex items-center gap-3 bg-white border border-green-300 rounded-xl px-5 py-3">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Complaint ID</p>
                  <p className="font-bold text-[#0b1540] text-base sm:text-lg tracking-wider font-mono break-all">{submittedId}</p>
                </div>
                <button
                  onClick={() => copyId(submittedId)}
                  className="text-gray-400 hover:text-[#0b1540] transition-colors"
                  title="Copy ID"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  <Clock size={12} />
                  Status: SUBMITTED
                </span>
              </div>
              <button
                onClick={() => { setSubmittedId(null); setSelectedCategory(null); setForm({ subcategory: '', block: '', room: '', description: '' }) }}
                className="mt-6 text-sm text-[#0b1540] hover:text-[#c9952a] font-medium transition-colors"
              >
                Submit another complaint
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
              {selectedCategory && (
                <div className="flex items-center gap-2 bg-[#0b1540]/5 border border-[#0b1540]/10 rounded-lg px-4 py-2.5">
                  <selectedCategory.icon size={16} className="text-[#0b1540]" />
                  <span className="text-sm font-medium text-[#0b1540]">{selectedCategory.label}</span>
                  <button type="button" onClick={() => setSelectedCategory(null)} className="ml-auto text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Subcategory */}
              <div>
                <label className="block text-sm font-medium text-[#0b1540] mb-1.5">
                  Subcategory
                </label>
                <div className="relative">
                  <select
                    value={form.subcategory}
                    onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
                    disabled={!selectedCategory}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20 bg-white pr-8 disabled:opacity-50"
                  >
                    {(selectedCategory?.subcategories || ['Select a category first']).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Block */}
              <div>
                <label className="block text-sm font-medium text-[#0b1540] mb-1.5">
                  Floor
                </label>
                <div className="relative">
                  <select
                    value={form.block}
                    onChange={e => setForm(f => ({ ...f, block: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20 bg-white pr-8"
                  >
                    <option value="">Select block / floor</option>
                    {BLOCKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Room number */}
              <div>
                <label className="block text-sm font-medium text-[#0b1540] mb-1.5">
                  Room Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.room}
                  onChange={e => setForm(f => ({ ...f, room: e.target.value }))}
                  placeholder="e.g. 204"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#0b1540] mb-1.5">
                  Description of Issue <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  required
                  placeholder="Describe the issue clearly. Include any relevant details such as since when the problem exists, severity, etc."
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20 resize-none"
                />
              </div>

              {/* Photo upload */}
              <div>
                <label className="block text-sm font-medium text-[#0b1540] mb-1.5">
                  Photograph <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-[#0b1540]/40 hover:bg-gray-50 transition-colors">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload a photograph</p>
                  <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP up to 5 MB</p>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                <p className="text-blue-700 text-xs">
                  No unnecessary personal information is collected. Your complaint will be assigned a unique ID for tracking.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-[#0b1540] hover:bg-[#1a2f6e] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
              >
                <Send size={15} />
                {submitting ? 'Submitting…' : 'Submit Complaint'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── TRACKING ────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#faf7f0] border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <SectionLabel text="Track" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0b1540]">
              Track Your Complaint
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter your Complaint ID to view the current status.
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex gap-3 mb-6">
            <input
              type="text"
              value={trackId}
              onChange={e => setTrackId(e.target.value)}
              placeholder="e.g. DJGH-2026-00124"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20 font-mono"
            />
            <button
              type="submit"
              disabled={tracking}
              className="flex items-center gap-2 bg-[#0b1540] hover:bg-[#1a2f6e] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
            >
              <Search size={15} />
              <span className="hidden sm:inline">{tracking ? 'Tracking…' : 'Track'}</span>
            </button>
          </form>

          {trackError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <p className="text-red-700 text-sm">Complaint ID not found. Please check and try again.</p>
            </div>
          )}

          {trackResult && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Complaint ID</p>
                  <p className="font-bold text-[#0b1540] text-lg font-mono">{trackResult.complaintId}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  <Clock size={11} />
                  {trackResult.status?.replace('_',' ').toUpperCase()}
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-0.5">Category</p>
                  <p className="text-gray-700 font-medium capitalize">{trackResult.category}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-0.5">Date Submitted</p>
                  <p className="text-gray-700 font-medium">
                    {trackResult.createdAt ? new Date(trackResult.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-0.5">Issue</p>
                  <p className="text-gray-700 font-medium">{trackResult.description}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-0.5">Last Updated</p>
                  <p className="text-gray-700 font-medium">
                    {trackResult.updatedAt ? new Date(trackResult.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-4">Status Timeline</p>
                <StatusTimeline currentStatus={trackResult.status} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── RECENTLY RESOLVED ───────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <SectionLabel text="Transparency" />
            <h2 className="text-xl font-serif font-bold text-[#0b1540]">Recently Resolved Issues</h2>
            <p className="text-gray-500 text-sm mt-1">
              These complaints have been successfully resolved by the hostel maintenance team.
            </p>
          </div>

          <div className="space-y-3">
            {recentResolved.map(item => (
              <div
                key={item.complaintId}
                className="flex items-center justify-between gap-4 bg-green-50 border border-green-100 rounded-xl px-5 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-[#0b1540]">{item.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 font-mono">{item.complaintId}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle size={14} />
                    <span className="text-xs font-semibold">Resolved</span>
                  </div>
                  {item.updatedAt && (
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {new Date(item.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
