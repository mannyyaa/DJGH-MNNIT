import React, { useState } from 'react'
import { Routes, Route, Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, AlertCircle, Bell, UtensilsCrossed,
  Users, Building2, HelpCircle, Phone, Database,
  LogOut, Menu, X, ChevronDown,
  CheckCircle, Clock, Loader, Eye, Edit2, Trash2,
  Plus, Search, Filter, Download, Upload, Shield,
  Diamond, MessageSquare, MapPin, Mail
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { messAPI } from '../services/api'
import { weeklyMenu as weeklyMenuFallback } from '../data/siteData'

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const DEMO_COMPLAINTS = [
  { id: 'DJGH-2026-00124', category: 'Electrical',  issue: 'Fan not working – Room 204',         block: 'Block A', date: 'Aug 10',  status: 'in_progress', priority: 'high' },
  { id: 'DJGH-2026-00123', category: 'Plumbing',    issue: 'Tap leaking – 2nd floor washroom',   block: 'Block B', date: 'Aug 10',  status: 'submitted',   priority: 'medium' },
  { id: 'DJGH-2026-00122', category: 'Civil',       issue: 'Window latch broken – Room 112',     block: 'Block A', date: 'Aug 9',   status: 'acknowledged',priority: 'low' },
  { id: 'DJGH-2026-00121', category: 'Cleaning',    issue: 'Corridor cleaning pending – 3F',     block: 'Block B', date: 'Aug 9',   status: 'assigned',    priority: 'medium' },
  { id: 'DJGH-2026-00120', category: 'Internet',    issue: 'Wi-Fi not working – Block B wing',   block: 'Block B', date: 'Aug 8',   status: 'resolved',    priority: 'high' },
  { id: 'DJGH-2026-00119', category: 'Mess',        issue: 'Food quality concern – dinner',      block: 'Mess',    date: 'Aug 8',   status: 'resolved',    priority: 'low' },
  { id: 'DJGH-2026-00118', category: 'Electrical',  issue: 'Socket not working – Room 308',      block: 'Block A', date: 'Aug 7',   status: 'resolved',    priority: 'medium' },
  { id: 'DJGH-2026-00117', category: 'Furniture',   issue: 'Bed broken – Room 215',              block: 'Block B', date: 'Aug 7',   status: 'in_progress', priority: 'high' },
]

const DEMO_NOTICES = [
  { id: 1, title: 'Mess Timing Change – Winter Schedule', category: 'Mess',           date: 'Aug 10', important: true,  status: 'published' },
  { id: 2, title: 'Hostel Gate Closing Time – Revised',  category: 'Hostel',          date: 'Aug 8',  important: true,  status: 'published' },
  { id: 3, title: 'Annual Hostel Day – Volunteers',       category: 'Events',          date: 'Aug 7',  important: false, status: 'published' },
  { id: 4, title: 'Block B Plumbing Maintenance',         category: 'Maintenance',     date: 'Aug 6',  important: false, status: 'published' },
  { id: 5, title: 'Hostel Fee Payment Deadline',          category: 'Administration',  date: 'Aug 4',  important: true,  status: 'draft' },
]

const STATUS_CONFIG = {
  submitted:    { label: 'Submitted',    bg: 'bg-gray-100',   text: 'text-gray-600',  dot: 'bg-gray-400' },
  acknowledged: { label: 'Acknowledged', bg: 'bg-blue-100',   text: 'text-blue-700',  dot: 'bg-blue-500' },
  assigned:     { label: 'Assigned',     bg: 'bg-purple-100', text: 'text-purple-700',dot: 'bg-purple-500' },
  in_progress:  { label: 'In Progress',  bg: 'bg-amber-100',  text: 'text-amber-700', dot: 'bg-amber-500' },
  resolved:     { label: 'Resolved',     bg: 'bg-green-100',  text: 'text-green-700', dot: 'bg-green-500' },
}

const PRIORITY_CONFIG = {
  high:   { bg: 'bg-red-100',    text: 'text-red-700' },
  medium: { bg: 'bg-amber-100',  text: 'text-amber-700' },
  low:    { bg: 'bg-gray-100',   text: 'text-gray-600' },
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, color }) {
  const colors = {
    blue:   'bg-blue-50   text-blue-600   border-blue-100',
    amber:  'bg-amber-50  text-amber-600  border-amber-100',
    green:  'bg-green-50  text-green-600  border-green-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    red:    'bg-red-50    text-red-600    border-red-100',
    navy:   'bg-[#0b1540]/8 text-[#0b1540] border-[#0b1540]/10',
  }
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#0b1540] mt-1 font-serif">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colors[color] || colors.navy}`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.submitted
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.low
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
      {priority}
    </span>
  )
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

const sidebarLinks = [
  { to: '/admin',           label: 'Dashboard',        icon: LayoutDashboard, end: true },
  { to: '/admin/complaints',label: 'Complaints',       icon: AlertCircle },
  { to: '/admin/notices',   label: 'Notices',          icon: Bell },
  { to: '/admin/mess',      label: 'Mess Menu',        icon: UtensilsCrossed },
  { to: '/admin/mess-feedback', label: 'Mess Feedback', icon: MessageSquare },
  { to: '/admin/directory', label: 'Directory',        icon: Database },
  { to: '/admin/committee', label: 'Committee',        icon: Users },
  { to: '/admin/facilities',label: 'Facilities',       icon: Building2 },
  { to: '/admin/faq',       label: 'FAQs',             icon: HelpCircle },
  { to: '/admin/contacts',  label: 'Contacts',         icon: Phone },
]

function Sidebar({ open, onClose, onSignOut }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-[#070c1e] z-40 flex flex-col
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-screen
      `}>
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c9952a] flex items-center justify-center">
              <Diamond size={15} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-xs font-serif leading-tight">DJGH Admin</p>
              <p className="text-[#6080ff] text-[10px]">MNNIT Allahabad</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 px-3 mb-2 font-semibold">Management</p>
          <div className="space-y-0.5">
            {sidebarLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors
                   ${isActive
                     ? 'bg-[#c9952a]/15 text-[#c9952a] font-semibold'
                     : 'text-gray-400 hover:text-white hover:bg-white/6'}`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/8">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/6 transition-colors"
          >
            <Eye size={16} />
            View Public Site
          </Link>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-colors mt-0.5"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}

// ─── TOPBAR ──────────────────────────────────────────────────────────────────

function Topbar({ title, onMenuClick }) {
  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-semibold text-[#0b1540] text-base">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
          <Shield size={14} className="text-[#c9952a]" />
          Admin
        </div>
        <div className="w-8 h-8 rounded-full bg-[#0b1540] flex items-center justify-center text-white font-bold text-xs">
          A
        </div>
      </div>
    </header>
  )
}

// ─── ADMIN PAGES ─────────────────────────────────────────────────────────────

function AdminHome() {
  const { complaints, notices, messFeedback } = useAdmin()

  const total      = complaints.length
  const pending    = complaints.filter(c => ['submitted','acknowledged'].includes(c.status)).length
  const inProgress = complaints.filter(c => ['assigned','in_progress'].includes(c.status)).length
  const resolved   = complaints.filter(c => c.status === 'resolved').length
  const unreviewed = messFeedback.filter(f => !f.reviewed).length
  const published  = notices.filter(n => n.status === 'published').length

  const stats = [
    { icon: AlertCircle,   label: 'Total Complaints', value: total,      sub: 'All time',        color: 'blue' },
    { icon: Clock,         label: 'Pending',           value: pending,    sub: 'Awaiting action', color: 'amber' },
    { icon: Loader,        label: 'In Progress',        value: inProgress, sub: 'Being addressed', color: 'purple' },
    { icon: CheckCircle,   label: 'Resolved',           value: resolved,   sub: 'Total resolved',  color: 'green' },
    { icon: MessageSquare, label: 'New Feedback',       value: unreviewed, sub: 'Unreviewed',      color: 'navy' },
    { icon: Bell,          label: 'Active Notices',     value: published,  sub: 'Published',       color: 'red' },
  ]

  const recent = complaints.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Recent complaints */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0b1540] text-sm">Recent Complaints</h2>
          <Link to="/admin/complaints" className="text-xs text-[#1a2f6e] hover:text-[#c9952a] font-medium">
            View All →
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">No complaints yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-semibold">ID</th>
                  <th className="text-left px-3 py-3 font-semibold">Category</th>
                  <th className="text-left px-3 py-3 font-semibold">Issue</th>
                  <th className="text-left px-3 py-3 font-semibold">Date</th>
                  <th className="text-left px-3 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map(c => (
                  <tr key={c._id || c.complaintId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">{c.complaintId}</td>
                    <td className="px-3 py-3 text-gray-700 text-xs font-medium capitalize">{c.category}</td>
                    <td className="px-3 py-3 text-gray-600 text-xs max-w-[200px] truncate">{c.description}</td>
                    <td className="px-3 py-3 text-gray-400 text-xs">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                    </td>
                    <td className="px-3 py-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Post a Notice',    icon: Bell,           to: '/admin/notices',   color: 'bg-blue-50 text-blue-700 border-blue-100' },
          { label: 'Update Mess Menu', icon: UtensilsCrossed,to: '/admin/mess',      color: 'bg-amber-50 text-amber-700 border-amber-100' },
          { label: 'Add Committee',    icon: Users,          to: '/admin/committee', color: 'bg-purple-50 text-purple-700 border-purple-100' },
        ].map(a => (
          <Link key={a.label} to={a.to} className={`flex items-center gap-3 border rounded-xl p-4 hover:shadow-sm transition-shadow ${a.color}`}>
            <a.icon size={18} />
            <span className="font-semibold text-xs">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function AdminComplaints() {
  const { complaints, updateComplaint, loadComplaints } = useAdmin()
  const [search, setSearch]             = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected]         = useState(null)
  const [newStatus, setNewStatus]       = useState('')
  const [note, setNote]                 = useState('')
  const [saving, setSaving]             = useState(false)

  const filtered = complaints.filter(c => {
    const id   = c.complaintId || ''
    const cat  = c.category    || ''
    const desc = c.description || ''
    const matchSearch = id.toLowerCase().includes(search.toLowerCase()) ||
      cat.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || c.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleUpdate = async () => {
    if (!newStatus || !selected) return
    setSaving(true)
    try {
      // MongoDB _id for the PATCH route, plus note for the timeline
      await updateComplaint(selected._id, { status: newStatus, note })
      setSelected(null)
      setNewStatus('')
      setNote('')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search complaints…"
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-gray-400 shrink-0" />
          {['all', 'submitted', 'in_progress', 'resolved'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
                ${filterStatus === s ? 'bg-[#0b1540] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {s === 'all' ? 'All' : STATUS_CONFIG[s]?.label || s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
                <th className="text-left px-4 py-3 font-semibold">ID</th>
                <th className="text-left px-3 py-3 font-semibold">Category</th>
                <th className="text-left px-3 py-3 font-semibold">Issue</th>
                <th className="text-left px-3 py-3 font-semibold">Floor</th>
                <th className="text-left px-3 py-3 font-semibold">Date</th>
                <th className="text-left px-3 py-3 font-semibold">Status</th>
                <th className="text-left px-3 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c._id || c.complaintId} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{c.complaintId}</td>
                  <td className="px-3 py-3 text-xs font-medium text-gray-700 capitalize">{c.category}</td>
                  <td className="px-3 py-3 text-xs text-gray-600 max-w-[160px] truncate">{c.description}</td>
                  <td className="px-3 py-3 text-xs text-gray-500">{c.block || '—'}</td>
                  <td className="px-3 py-3 text-xs text-gray-400">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                  </td>
                  <td className="px-3 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => { setSelected(c); setNewStatus(c.status) }}
                      className="flex items-center gap-1 text-xs text-[#1a2f6e] hover:text-[#c9952a] font-medium transition-colors"
                    >
                      <Edit2 size={12} /> Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">No complaints found.</div>
        )}
      </div>

      {/* Update modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-serif font-bold text-[#0b1540] text-lg mb-1">Update Complaint</h3>
            <p className="text-gray-500 text-xs font-mono mb-4">{selected.complaintId}</p>

            <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 text-sm">
              <p className="font-medium text-[#0b1540]">{selected.description}</p>
              <p className="text-gray-400 text-xs mt-0.5 capitalize">{selected.category} · {selected.block || 'No floor specified'}</p>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">New Status</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => setNewStatus(key)}
                    className={`text-xs font-semibold px-2 py-2 rounded-lg border transition-all
                      ${newStatus === key
                        ? 'border-[#0b1540] bg-[#0b1540] text-white'
                        : `${cfg.bg} ${cfg.text} border-transparent hover:border-gray-200`}`}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Resolution Note (optional)</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={3}
                placeholder="Add a note for internal reference…"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleUpdate} disabled={saving} className="flex-1 bg-[#0b1540] hover:bg-[#1a2f6e] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
                {saving ? 'Saving…' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AdminNotices() {
  const { notices, addNotice, deleteNotice, updateNotice } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [form, setForm]         = useState({ title: '', category: 'General', important: false, description: '' })

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    setSaving(true)
    try {
      await addNotice(form)
      setForm({ title: '', category: 'General', important: false, description: '' })
      setShowForm(false)
    } catch (err) {
      alert(err.message || 'Failed to save notice.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this notice?')) return
    try { await deleteNotice(id) } catch (err) { alert(err.message) }
  }

  const handleToggleStatus = async (n) => {
    try {
      await updateNotice(n._id || n.id, { status: n.status === 'published' ? 'draft' : 'published' })
    } catch (err) { alert(err.message) }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{notices.filter(n => n.status === 'published').length} published · {notices.length} total</p>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#0b1540] hover:bg-[#1a2f6e] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} /> New Notice
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 space-y-4">
          <h3 className="font-semibold text-[#0b1540] text-sm">Add New Notice</h3>
          <input
            required
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Notice title *"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
            >
              {['General','Hostel','Mess','Maintenance','Events','Administration','Important'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer px-1">
              <input
                type="checkbox"
                checked={form.important}
                onChange={e => setForm(f => ({ ...f, important: e.target.checked }))}
                className="rounded accent-[#c9952a]"
              />
              Mark as Important
            </label>
          </div>
          <textarea
            required
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Notice description *"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20 resize-none"
          />
          <div className="flex gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 bg-[#0b1540] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#1a2f6e] disabled:opacity-60">
              {saving ? 'Saving…' : 'Save & Publish'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
                <th className="text-left px-4 py-3 font-semibold">Title</th>
                <th className="text-left px-3 py-3 font-semibold">Category</th>
                <th className="text-left px-3 py-3 font-semibold">Date</th>
                <th className="text-left px-3 py-3 font-semibold">Status</th>
                <th className="text-left px-3 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {notices.map(n => (
                <tr key={n.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {n.important && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />}
                      <span className="text-xs font-medium text-gray-700 max-w-[220px] truncate">{n.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-500">{n.category}</td>
                  <td className="px-3 py-3 text-xs text-gray-400">
                    {n.date ? new Date(n.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => handleToggleStatus(n)}
                      className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full transition-colors cursor-pointer
                        ${n.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {n.status || 'draft'}
                    </button>
                  </td>
                  <td className="px-3 py-3">
                    <button onClick={() => handleDelete(n._id || n.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {notices.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">No notices yet.</div>
        )}
      </div>
    </div>
  )
}

function AdminMessMenu() {
  const { messMenu, loadMessMenu } = useAdmin()
  const days  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const meals = ['Breakfast', 'Lunch', 'Eve. Snacks', 'Dinner']

  // Build local editing state from the API messMenu, or from static fallback
  const [menu, setMenu]       = useState(() => buildLocalMenu(messMenu))
  const [editing, setEditing] = useState(null)
  const [editVal, setEditVal] = useState('')
  const [saving, setSaving]   = useState(false)

  // When messMenu from API loads/changes, sync local editing state
  React.useEffect(() => {
    setMenu(buildLocalMenu(messMenu))
  }, [messMenu])

  function buildLocalMenu(apiMenu) {
    if (!apiMenu?.menu) {
      // Use static fallback from siteData
      return {
        Breakfast:    weeklyMenuFallback.Breakfast,
        Lunch:        weeklyMenuFallback.Lunch,
        'Eve. Snacks': weeklyMenuFallback['Eve. Snacks'] || weeklyMenuFallback.Snacks || new Array(7).fill(''),
        Dinner:       weeklyMenuFallback.Dinner,
      }
    }
    // API returns a Map-like object keyed 0-6
    const result = { Breakfast: [], Lunch: [], 'Eve. Snacks': [], Dinner: [] }
    for (let i = 0; i < 7; i++) {
      const day = apiMenu.menu[String(i)] || apiMenu.menu.get?.(String(i)) || {}
      result.Breakfast.push(day.breakfast || '')
      result.Lunch.push(day.lunch || '')
      result['Eve. Snacks'].push(day.snacks || '')
      result.Dinner.push(day.dinner || '')
    }
    return result
  }

  const startEdit = (meal, dayIdx) => {
    setEditing({ meal, dayIdx })
    setEditVal(menu[meal][dayIdx])
  }

  const saveEdit = () => {
    if (!editing) return
    setMenu(prev => ({
      ...prev,
      [editing.meal]: prev[editing.meal].map((v, i) => i === editing.dayIdx ? editVal : v),
    }))
    setEditing(null)
  }

  const handleSaveMenu = async () => {
    setSaving(true)
    try {
      const apiMenu = {}
      for (let i = 0; i < 7; i++) {
        apiMenu[String(i)] = {
          breakfast: menu.Breakfast[i]      || '',
          lunch:     menu.Lunch[i]          || '',
          snacks:    menu['Eve. Snacks'][i] || '',
          dinner:    menu.Dinner[i]         || '',
        }
      }
      await messAPI.updateMenu({ menu: apiMenu, weekLabel: 'Current Week' })
      await loadMessMenu()
      alert('Menu saved successfully.')
    } catch (err) {
      alert(err.message || 'Failed to save menu.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">Click any cell to edit the menu for that day and meal.</p>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[700px]">
            <thead>
              <tr className="bg-[#0b1540]">
                <th className="text-left text-white font-semibold px-4 py-3 w-24">Meal</th>
                {days.map(d => (
                  <th key={d} className="text-center text-white font-semibold px-3 py-3">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {meals.map((meal, ri) => (
                <tr key={meal} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                  <td className="px-4 py-3 font-bold text-[#0b1540] text-[10px] uppercase tracking-wide">{meal}</td>
                  {days.map((_, ci) => (
                    <td key={ci} className="px-2 py-2">
                      {editing?.meal === meal && editing?.dayIdx === ci ? (
                        <div className="flex gap-1">
                          <input
                            value={editVal}
                            onChange={e => setEditVal(e.target.value)}
                            className="w-full border border-[#0b1540]/30 rounded px-2 py-1 text-xs focus:outline-none"
                            autoFocus
                          />
                          <button onClick={saveEdit} className="text-green-600 hover:text-green-700 shrink-0">
                            <CheckCircle size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(meal, ci)}
                          className="w-full text-left text-gray-600 hover:text-[#0b1540] hover:bg-[#0b1540]/5 rounded px-1.5 py-1 transition-colors leading-snug"
                        >
                          {menu[meal][ci]}
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={handleSaveMenu}
        disabled={saving}
        className="flex items-center gap-2 bg-[#0b1540] hover:bg-[#1a2f6e] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
      >
        <CheckCircle size={15} /> {saving ? 'Saving…' : 'Save Menu'}
      </button>
    </div>
  )
}

// ─── MESS FEEDBACK ───────────────────────────────────────────────────────────

function AdminMessFeedback() {
  const { messFeedback, markFeedbackReviewed } = useAdmin()

  const avgRating = (field) => {
    const vals = messFeedback.map(f => f.ratings?.[field] || 0).filter(v => v > 0)
    if (!vals.length) return '—'
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
  }

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Food Quality', key: 'foodQuality' },
          { label: 'Taste',        key: 'taste' },
          { label: 'Hygiene',      key: 'hygiene' },
          { label: 'Variety',      key: 'variety' },
          { label: 'Timeliness',   key: 'timeliness' },
          { label: 'Overall',      key: 'overall' },
        ].map(({ label, key }) => (
          <div key={key} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-[#c9952a] font-serif">{avgRating(key)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500">{messFeedback.length} total submissions · {messFeedback.filter(f => !f.reviewed).length} unreviewed</p>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[540px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase tracking-wide text-[10px]">
                <th className="text-left px-4 py-2.5 font-semibold">Name</th>
                <th className="text-left px-3 py-2.5 font-semibold">Room</th>
                <th className="text-left px-3 py-2.5 font-semibold">Category</th>
                <th className="text-left px-3 py-2.5 font-semibold">Overall</th>
                <th className="text-left px-3 py-2.5 font-semibold">Comment</th>
                <th className="text-left px-3 py-2.5 font-semibold">Date</th>
                <th className="px-3 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {messFeedback.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-gray-400">No feedback submitted yet.</td></tr>
              ) : messFeedback.map(f => (
                <tr key={f.id} className={`hover:bg-gray-50/50 ${!f.reviewed ? 'bg-amber-50/30' : ''}`}>
                  <td className="px-4 py-2.5 font-medium text-[#0b1540]">{f.name || '—'}</td>
                  <td className="px-3 py-2.5 text-gray-500">{f.room || '—'}</td>
                  <td className="px-3 py-2.5 text-gray-600">{f.category}</td>
                  <td className="px-3 py-2.5 font-bold text-[#c9952a]">{f.ratings?.overall || '—'}/5</td>
                  <td className="px-3 py-2.5 text-gray-500 max-w-[180px] truncate">{f.comment || '—'}</td>
                  <td className="px-3 py-2.5 text-gray-400">
                    {f.date ? new Date(f.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                  </td>
                  <td className="px-3 py-2.5">
                    {f.reviewed ? (
                      <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Reviewed</span>
                    ) : (
                      <button
                        onClick={() => markFeedbackReviewed(f._id || f.id)}
                        className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full hover:bg-amber-200 transition-colors"
                      >
                        Mark Reviewed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── DIRECTORY ───────────────────────────────────────────────────────────────

const STUDENT_YEARS = ['1st Year', '2nd Year']
const STAFF_CATS    = ['Mess Staff', 'Housekeeping', 'Security', 'Other Staff']

const STUDENT_FIELDS = ['Name', 'Roll No.', 'Branch', 'Room No.', 'Phone']
const STAFF_FIELDS   = ['Name', 'Role', 'Department', 'Phone', 'Employee ID']

function parseCSV(text, fields) {
  const lines = text.trim().split('\n').filter(l => l.trim())
  // skip header line if it matches field names
  const start = lines[0]?.toLowerCase().includes(fields[0].toLowerCase()) ? 1 : 0
  return lines.slice(start).map(line => {
    const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''))
    const obj = {}
    fields.forEach((f, i) => { obj[f] = cols[i] || '' })
    obj._id = Date.now() + Math.random()
    return obj
  })
}

function toCSV(rows, fields) {
  const header = fields.join(',')
  const body   = rows.map(r => fields.map(f => `"${(r[f] || '').replace(/"/g, '""')}"`).join(','))
  return [header, ...body].join('\n')
}

function DirectoryTable({ rows, fields, onDelete, onEdit }) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Database size={32} className="mx-auto mb-2 opacity-40" />
        <p className="text-sm">No entries yet. Add one below or import a CSV.</p>
      </div>
    )
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-xs min-w-[540px]">
        <thead>
          <tr className="bg-[#0b1540] text-white">
            <th className="text-left px-3 py-2.5 font-semibold w-8">#</th>
            {fields.map(f => (
              <th key={f} className="text-left px-3 py-2.5 font-semibold uppercase tracking-wide">{f}</th>
            ))}
            <th className="px-3 py-2.5 font-semibold w-16">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((row, i) => (
            <tr key={row._id} className="hover:bg-gray-50/60 transition-colors">
              <td className="px-3 py-2.5 text-gray-400">{i + 1}</td>
              {fields.map(f => (
                <td key={f} className="px-3 py-2.5 text-gray-700">{row[f] || '—'}</td>
              ))}
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(row)} className="text-[#1a2f6e] hover:text-[#c9952a] transition-colors">
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => onDelete(row._id)} className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AddEditModal({ fields, editRow, onSave, onClose }) {
  const [form, setForm] = React.useState(() => {
    const init = {}
    fields.forEach(f => { init[f] = editRow?.[f] || '' })
    return init
  })

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <h3 className="font-serif font-bold text-[#0b1540] text-lg mb-4">
          {editRow ? 'Edit Entry' : 'Add New Entry'}
        </h3>
        <div className="space-y-3">
          {fields.map(f => (
            <div key={f}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{f}</label>
              <input
                value={form[f]}
                onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
                placeholder={f}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-lg hover:bg-gray-50">Cancel</button>
          <button
            onClick={() => onSave({ ...form, _id: editRow?._id || Date.now() + Math.random() })}
            className="flex-1 bg-[#0b1540] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#1a2f6e]"
          >
            {editRow ? 'Save Changes' : 'Add Entry'}
          </button>
        </div>
      </div>
    </div>
  )
}

function DirectorySection({ label, tabs, fields }) {
  const [activeTab, setActiveTab]   = React.useState(tabs[0])
  const [search, setSearch]         = React.useState('')
  const [showModal, setShowModal]   = React.useState(false)
  const [editRow, setEditRow]       = React.useState(null)
  const [data, setData]             = React.useState(() => {
    // initialise empty arrays for every tab
    const init = {}
    tabs.forEach(t => { init[t] = [] })
    return init
  })

  const rows = data[activeTab] || []

  const filtered = rows.filter(r =>
    fields.some(f => (r[f] || '').toLowerCase().includes(search.toLowerCase()))
  )

  const handleSave = (row) => {
    setData(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].some(r => r._id === row._id)
        ? prev[activeTab].map(r => r._id === row._id ? row : r)
        : [...prev[activeTab], row],
    }))
    setShowModal(false)
    setEditRow(null)
  }

  const handleDelete = (id) => {
    setData(prev => ({ ...prev, [activeTab]: prev[activeTab].filter(r => r._id !== id) }))
  }

  const handleEdit = (row) => {
    setEditRow(row)
    setShowModal(true)
  }

  const handleExport = () => {
    if (rows.length === 0) return
    const csv  = toCSV(rows, fields)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `DJGH_${label}_${activeTab.replace(/\s/g,'_')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const imported = parseCSV(ev.target.result, fields)
      setData(prev => ({ ...prev, [activeTab]: [...prev[activeTab], ...imported] }))
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-gray-100 pb-1">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => { setActiveTab(t); setSearch('') }}
            className={`shrink-0 px-4 py-1.5 rounded-t-lg text-xs font-semibold transition-colors border-b-2
              ${activeTab === t
                ? 'border-[#c9952a] text-[#0b1540] bg-amber-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {t}
            <span className="ml-1.5 bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded-full">
              {(data[t] || []).length}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={13} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${activeTab}…`}
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Import CSV */}
          <label className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <Upload size={13} />
            Import CSV
            <input type="file" accept=".csv" className="hidden" onChange={handleImport} />
          </label>

          {/* Export CSV */}
          <button
            onClick={handleExport}
            disabled={rows.length === 0}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40"
          >
            <Download size={13} />
            Export CSV
          </button>

          {/* Add entry */}
          <button
            onClick={() => { setEditRow(null); setShowModal(true) }}
            className="flex items-center gap-1.5 bg-[#0b1540] text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#1a2f6e] transition-colors"
          >
            <Plus size={13} />
            Add Entry
          </button>
        </div>
      </div>

      {/* CSV format hint */}
      <p className="text-[10px] text-gray-400">
        CSV column order: <span className="font-mono">{fields.join(', ')}</span>
      </p>

      {/* Table */}
      <DirectoryTable rows={filtered} fields={fields} onDelete={handleDelete} onEdit={handleEdit} />

      {/* Total */}
      {rows.length > 0 && (
        <p className="text-xs text-gray-400 text-right">
          {filtered.length} of {rows.length} entries
        </p>
      )}

      {showModal && (
        <AddEditModal
          fields={fields}
          editRow={editRow}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditRow(null) }}
        />
      )}
    </div>
  )
}

function AdminDirectory() {
  const [activeSection, setActiveSection] = React.useState('students')

  return (
    <div className="space-y-6">
      {/* Section switcher */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveSection('students')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all
            ${activeSection === 'students'
              ? 'bg-[#0b1540] text-white border-[#0b1540] shadow'
              : 'bg-white text-gray-600 border-gray-200 hover:border-[#0b1540]/30'}`}
        >
          <Users size={15} />
          Students
        </button>
        <button
          onClick={() => setActiveSection('staff')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all
            ${activeSection === 'staff'
              ? 'bg-[#0b1540] text-white border-[#0b1540] shadow'
              : 'bg-white text-gray-600 border-gray-200 hover:border-[#0b1540]/30'}`}
        >
          <Database size={15} />
          Employees & Staff
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-2.5">
        <Database size={15} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-blue-700 text-xs leading-relaxed">
          {activeSection === 'students'
            ? 'Student records are stored locally in this session. Use Export CSV to save and Import CSV to restore data. Each year is managed in a separate tab.'
            : 'Employee records are separated by department. Use Import CSV to bulk-upload and Export CSV to download a backup of any category.'}
        </p>
      </div>

      {activeSection === 'students' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#0b1540]/8 flex items-center justify-center">
              <Users size={16} className="text-[#0b1540]" />
            </div>
            <div>
              <h2 className="font-semibold text-[#0b1540] text-sm">Student Directory</h2>
              <p className="text-gray-400 text-xs">Residents organised by year of study</p>
            </div>
          </div>
          <DirectorySection
            label="Students"
            tabs={STUDENT_YEARS}
            fields={STUDENT_FIELDS}
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#0b1540]/8 flex items-center justify-center">
              <Database size={16} className="text-[#0b1540]" />
            </div>
            <div>
              <h2 className="font-semibold text-[#0b1540] text-sm">Employee & Staff Directory</h2>
              <p className="text-gray-400 text-xs">Mess staff, housekeeping, security and other employees</p>
            </div>
          </div>
          <DirectorySection
            label="Staff"
            tabs={STAFF_CATS}
            fields={STAFF_FIELDS}
          />
        </div>
      )}
    </div>
  )
}

// ─── REUSABLE INLINE EDIT MODAL ──────────────────────────────────────────────

function EditModal({ title, fields, data, onSave, onClose }) {
  const [form, setForm] = useState({ ...data })
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h3 className="font-serif font-bold text-[#0b1540] text-lg mb-5">{title}</h3>
        <div className="space-y-4">
          {fields.map(({ key, label, type = 'text', options }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
              {type === 'textarea' ? (
                <textarea
                  value={form[key] || ''}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20 resize-none"
                />
              ) : type === 'select' ? (
                <select
                  value={form[key] || ''}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
                >
                  {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={type}
                  value={form[key] || ''}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-lg hover:bg-gray-50">Cancel</button>
          <button type="button" onClick={() => onSave(form)} className="flex-1 bg-[#0b1540] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#1a2f6e]">Save Changes</button>
        </div>
      </div>
    </div>
  )
}

// ─── WORKING PLACEHOLDER TABS ────────────────────────────────────────────────

function AdminCommittee() {
  const { members, addMember, updateMember, deleteMember } = useAdmin()
  const [editTarget, setEditTarget] = useState(null)
  const [showAdd, setShowAdd]       = useState(false)
  const [addGroup, setAddGroup]     = useState('administration')

  const groups = {
    'Administration':   { key: 'administration', label: 'Administration' },
    'Hostel Committee': { key: 'hostel',          label: 'Hostel Committee' },
    'Mess Committee':   { key: 'mess',            label: 'Mess Committee' },
  }

  const memberFields = [    { key: 'name',             label: 'Name' },
    { key: 'position',         label: 'Position' },
    { key: 'department',       label: 'Department' },
    { key: 'contact',          label: 'Phone / Contact' },
    { key: 'responsibilities', label: 'Responsibilities', type: 'textarea' },
    { key: 'committeeType',    label: 'Committee Group', type: 'select', options: ['administration', 'hostel', 'mess'] },
  ]

  const emptyMember = { name: '', position: '', department: '', contact: '', responsibilities: '', committeeType: addGroup }

  return (
    <div className="space-y-8">
      {Object.entries(groups).map(([groupLabel, { key }]) => {
        const groupMembers = members.filter(m => (m.committeeType || m.group) === key)
        return (
          <div key={key} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-[#0b1540] text-sm">{groupLabel} ({groupMembers.length})</h3>
              <button
                onClick={() => { setAddGroup(key); setShowAdd(true) }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0b1540] hover:text-[#c9952a] transition-colors"
              >
                <Plus size={13} /> Add
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[480px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wide text-[10px]">
                    <th className="text-left px-4 py-2.5 font-semibold">Name</th>
                    <th className="text-left px-3 py-2.5 font-semibold">Position</th>
                    <th className="text-left px-3 py-2.5 font-semibold">Contact</th>
                    <th className="text-left px-3 py-2.5 font-semibold">Responsibilities</th>
                    <th className="px-3 py-2.5 w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {groupMembers.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-6 text-gray-400 text-xs">No members yet.</td></tr>
                  ) : groupMembers.map(m => (
                    <tr key={m.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-2.5 font-medium text-[#0b1540]">{m.name}</td>
                      <td className="px-3 py-2.5 text-[#c9952a] font-semibold">{m.position}</td>
                      <td className="px-3 py-2.5 text-gray-500">{m.contact || m.department || '—'}</td>
                      <td className="px-3 py-2.5 text-gray-400 max-w-[180px] truncate">{m.responsibilities || '—'}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex gap-2">
                          <button onClick={() => setEditTarget(m)} className="text-[#1a2f6e] hover:text-[#c9952a] transition-colors"><Edit2 size={13} /></button>
                          <button onClick={() => deleteMember(m._id || m.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}

      {editTarget && (
        <EditModal
          title="Edit Committee Member"
          fields={memberFields}
          data={editTarget}
          onSave={(updated) => { updateMember(editTarget._id || editTarget.id, updated); setEditTarget(null) }}
          onClose={() => setEditTarget(null)}
        />
      )}
      {showAdd && (
        <EditModal
          title="Add Committee Member"
          fields={memberFields}
          data={{ ...emptyMember, committeeType: addGroup }}
          onSave={(data) => { addMember(data); setShowAdd(false) }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  )
}

function AdminFacilities() {
  const { facilities, addFacility, updateFacility, deleteFacility } = useAdmin()
  const [editTarget, setEditTarget] = useState(null)
  const [showAdd, setShowAdd]       = useState(false)

  const CATEGORIES = ['Accommodation', 'Academic', 'Recreation', 'Essential Services', 'Safety']

  const facilityFields = [
    { key: 'name',        label: 'Facility Name' },
    { key: 'category',    label: 'Category', type: 'select', options: CATEGORIES },
    { key: 'description', label: 'Description', type: 'textarea' },
  ]

  const grouped = CATEGORIES.map(cat => ({
    cat,
    items: facilities.filter(f => f.category === cat),
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#0b1540] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1a2f6e]"
        >
          <Plus size={14} /> Add Facility
        </button>
      </div>
      {grouped.map(({ cat, items }) => (
        <div key={cat} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <h3 className="font-semibold text-[#0b1540] text-sm">{cat} ({items.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[360px]">
              <thead>
                <tr className="border-b border-gray-50 text-gray-400 uppercase tracking-wide text-[10px]">
                  <th className="text-left px-4 py-2.5 font-semibold">Facility</th>
                  <th className="text-left px-3 py-2.5 font-semibold">Description</th>
                  <th className="px-3 py-2.5 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.length === 0 ? (
                  <tr><td colSpan={3} className="text-center py-4 text-gray-400 text-xs">No facilities in this category.</td></tr>
                ) : items.map(item => (
                  <tr key={String(item.id)} className="hover:bg-gray-50/50">
                    <td className="px-4 py-2.5 font-medium text-[#0b1540]">{item.name}</td>
                    <td className="px-3 py-2.5 text-gray-500 max-w-[260px] truncate">{item.description}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-2">
                        <button onClick={() => setEditTarget(item)} className="text-[#1a2f6e] hover:text-[#c9952a] transition-colors"><Edit2 size={13} /></button>
                        <button onClick={() => deleteFacility(item._id || item.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {editTarget && (
        <EditModal
          title="Edit Facility"
          fields={facilityFields}
          data={editTarget}
          onSave={(updated) => { updateFacility(editTarget._id || editTarget.id, updated); setEditTarget(null) }}
          onClose={() => setEditTarget(null)}
        />
      )}
      {showAdd && (
        <EditModal
          title="Add Facility"
          fields={facilityFields}
          data={{ name: '', category: 'Accommodation', description: '' }}
          onSave={(data) => { addFacility(data); setShowAdd(false) }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  )
}

function AdminFAQ() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useAdmin()
  const [editTarget, setEditTarget] = useState(null)
  const [showAdd, setShowAdd]       = useState(false)

  const faqFields = [
    { key: 'question', label: 'Question' },
    { key: 'answer',   label: 'Answer', type: 'textarea' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#0b1540] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1a2f6e]"
        >
          <Plus size={14} /> Add FAQ
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[400px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase tracking-wide text-[10px]">
                <th className="text-left px-4 py-2.5 font-semibold w-8">#</th>
                <th className="text-left px-3 py-2.5 font-semibold">Question</th>
                <th className="text-left px-3 py-2.5 font-semibold">Answer</th>
                <th className="px-3 py-2.5 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {faqs.map((faq, i) => (
                <tr key={faq.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 text-gray-400">{i + 1}</td>
                  <td className="px-3 py-2.5 font-medium text-[#0b1540] max-w-[200px]">{faq.question}</td>
                  <td className="px-3 py-2.5 text-gray-500 max-w-[260px] truncate">{faq.answer}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-2">
                      <button onClick={() => setEditTarget(faq)} className="text-[#1a2f6e] hover:text-[#c9952a] transition-colors"><Edit2 size={13} /></button>
                      <button onClick={() => deleteFAQ(faq._id || faq.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400 text-xs">No FAQs yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editTarget && (
        <EditModal
          title="Edit FAQ"
          fields={faqFields}
          data={editTarget}
          onSave={(updated) => { updateFAQ(editTarget._id || editTarget.id, updated); setEditTarget(null) }}
          onClose={() => setEditTarget(null)}
        />
      )}
      {showAdd && (
        <EditModal
          title="Add FAQ"
          fields={faqFields}
          data={{ question: '', answer: '' }}
          onSave={(data) => { addFAQ(data); setShowAdd(false) }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  )
}

function AdminContacts() {
  const { contacts, addContact, updateContact, deleteContact } = useAdmin()
  const [editTarget, setEditTarget] = useState(null)
  const [showAdd, setShowAdd]       = useState(false)

  const contactFields = [
    { key: 'title',       label: 'Title' },
    { key: 'number',      label: 'Phone Number' },
    { key: 'available',   label: 'Availability (e.g. 24/7, Office Hours)' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'color',       label: 'Card Color', type: 'select', options: ['navy', 'red', 'orange', 'gold', 'teal', 'gray'] },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#0b1540] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1a2f6e]"
        >
          <Plus size={14} /> Add Contact
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[400px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase tracking-wide text-[10px]">
                <th className="text-left px-4 py-2.5 font-semibold">Title</th>
                <th className="text-left px-3 py-2.5 font-semibold">Number</th>
                <th className="text-left px-3 py-2.5 font-semibold">Available</th>
                <th className="text-left px-3 py-2.5 font-semibold">Description</th>
                <th className="px-3 py-2.5 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contacts.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 font-medium text-[#0b1540]">{c.title}</td>
                  <td className="px-3 py-2.5 font-mono text-[#c9952a] font-semibold">{c.number}</td>
                  <td className="px-3 py-2.5 text-gray-500">{c.available}</td>
                  <td className="px-3 py-2.5 text-gray-400 max-w-[200px] truncate">{c.description}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-2">
                      <button onClick={() => setEditTarget(c)} className="text-[#1a2f6e] hover:text-[#c9952a] transition-colors"><Edit2 size={13} /></button>
                      <button onClick={() => deleteContact(c._id || c.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400 text-xs">No contacts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editTarget && (
        <EditModal
          title="Edit Contact"
          fields={contactFields}
          data={editTarget}
          onSave={(updated) => { updateContact(editTarget._id || editTarget.id, updated); setEditTarget(null) }}
          onClose={() => setEditTarget(null)}
        />
      )}
      {showAdd && (
        <EditModal
          title="Add Emergency Contact"
          fields={contactFields}
          data={{ title: '', number: '', available: '24 / 7', description: '', color: 'navy' }}
          onSave={(data) => { addContact(data); setShowAdd(false) }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  )
}
// ─── LOGIN GATE ──────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }) {
  const { login } = useAdmin()
  const [creds, setCreds]     = useState({ username: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(creds.username.trim(), creds.password)
      onLogin()
    } catch (err) {
      setError(err.message || 'Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1540] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#c9952a] flex items-center justify-center mx-auto mb-4">
            <Diamond size={26} className="text-white" />
          </div>
          <h1 className="text-xl font-serif font-bold text-[#0b1540]">Admin Portal</h1>
          <p className="text-gray-400 text-xs mt-1">Diamond Jubilee Girls Hostel, MNNIT</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2.5 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Username</label>
            <input
              type="text" required
              value={creds.username} onChange={e => setCreds(c => ({ ...c, username: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
              placeholder="Enter username"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
            <input
              type="password" required
              value={creds.password} onChange={e => setCreds(c => ({ ...c, password: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0b1540] hover:bg-[#1a2f6e] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader size={16} className="animate-spin" /> Signing in…</> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── MAIN DASHBOARD LAYOUT ───────────────────────────────────────────────────

const routeTitles = {
  '/admin':            'Dashboard Overview',
  '/admin/complaints': 'Complaint Management',
  '/admin/notices':    'Notice Management',
  '/admin/mess':          'Mess Menu Editor',
  '/admin/mess-feedback': 'Mess Feedback',
  '/admin/directory':  'Directory',
  '/admin/committee':  'Committee',
  '/admin/facilities': 'Facilities',
  '/admin/faq':        'FAQ Management',
  '/admin/contacts':   'Emergency Contacts',
}

export default function AdminDashboard() {
  const { isLoggedIn, logout } = useAdmin()
  const [authed, setAuthed]       = useState(isLoggedIn)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Sync with context auth (e.g. token already in localStorage from previous session)
  React.useEffect(() => { setAuthed(isLoggedIn) }, [isLoggedIn])

  const handleSignOut = () => {
    logout()
    setAuthed(false)
    navigate('/')
  }

  const title = Object.entries(routeTitles).find(([k]) => location.pathname === k)?.[1] || 'Admin'

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onSignOut={handleSignOut} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} onMenuClick={() => setSidebarOpen(s => !s)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Routes>
            <Route index                    element={<AdminHome />} />
            <Route path="complaints"        element={<AdminComplaints />} />
            <Route path="notices"           element={<AdminNotices />} />
            <Route path="mess"              element={<AdminMessMenu />} />
            <Route path="mess-feedback"     element={<AdminMessFeedback />} />
            <Route path="directory"         element={<AdminDirectory />} />
            <Route path="committee"          element={<AdminCommittee />} />
            <Route path="facilities"         element={<AdminFacilities />} />
            <Route path="faq"                element={<AdminFAQ />} />
            <Route path="contacts"           element={<AdminContacts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
