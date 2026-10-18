/**
 * AdminContext — API-driven data layer.
 * All data comes from the backend API and MongoDB.
 * Static siteData.js values are used ONLY as initial loading state, never as stored truth.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  noticesData, administration, hostelCommittee, messCommittee,
  facilitiesData, faqData, emergencyContacts as emergencyContactsData,
} from '../data/siteData'
import {
  authAPI, noticesAPI, complaintsAPI, messAPI,
  committeeAPI, facilitiesAPI, faqsAPI, contactsAPI,
} from '../services/api'

const AdminContext = createContext(null)

// ── Static fallback builders (used only while API loads) ─────────────────────
const staticNotices    = () => noticesData.map(n => ({ ...n, status: 'published' }))
const staticMembers    = () => [
  ...administration.map(m => ({ ...m, committeeType: 'administration', group: 'administration' })),
  ...hostelCommittee.map(m => ({ ...m, committeeType: 'hostel',        group: 'hostel' })),
  ...messCommittee.map(m => ({ ...m, committeeType: 'mess',            group: 'mess' })),
]
const staticFacilities = () =>
  facilitiesData.flatMap(cat =>
    cat.items.map(item => ({ ...item, category: cat.category, id: `${cat.category}-${item.name}` }))
  )
const staticFAQs     = () => faqData.map((f, i) => ({ ...f, id: i + 1 }))
const staticContacts = () => emergencyContactsData.map(c => ({ ...c }))

// ── Provider ─────────────────────────────────────────────────────────────────
export function AdminProvider({ children }) {
  // Auth
  const [adminUser, setAdminUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('djgh_admin_user')) || null } catch { return null }
  })

  // Public data — seeded from static, replaced by API on first load
  const [notices,     setNotices]    = useState(staticNotices)
  const [members,     setMembers]    = useState(staticMembers)
  const [facilities,  setFacilities] = useState(staticFacilities)
  const [faqs,        setFaqs]       = useState(staticFAQs)
  const [contacts,    setContacts]   = useState(staticContacts)

  // Dynamic data — always from API
  const [complaints,   setComplaints]   = useState([])
  const [messFeedback, setMessFeedback] = useState([])
  const [messMenu,     setMessMenu]     = useState(null)

  // Loading flags
  const [loading, setLoading] = useState({
    notices: false, members: false, facilities: false,
    faqs: false, contacts: false, complaints: false,
    messFeedback: false, messMenu: false,
  })

  const isLoggedIn = !!adminUser

  // ── Auth ───────────────────────────────────────────────────────────────────
  const login = async (username, password) => {
    const data = await authAPI.login(username, password)
    localStorage.setItem('djgh_admin_token', data.token)
    localStorage.setItem('djgh_admin_user', JSON.stringify(data.user))
    setAdminUser(data.user)
    return data
  }

  const logout = () => {
    localStorage.removeItem('djgh_admin_token')
    localStorage.removeItem('djgh_admin_user')
    setAdminUser(null)
  }

  // ── Generic fetch helper ───────────────────────────────────────────────────
  const fetchData = useCallback(async (key, apiFn, setter, transform) => {
    setLoading(l => ({ ...l, [key]: true }))
    try {
      const data = await apiFn()
      setter(transform ? transform(data) : data)
    } catch (err) {
      console.warn(`[AdminContext] ${key} fetch failed:`, err.message)
      // Keep static fallback — don't crash
    } finally {
      setLoading(l => ({ ...l, [key]: false }))
    }
  }, [])

  // ── Public data: load on mount, refresh after mutations ───────────────────
  const loadNotices   = useCallback(() => fetchData('notices',    () => noticesAPI.list(),    setNotices,    d => d.notices   || []), [fetchData])
  const loadMembers   = useCallback(() => fetchData('members',    () => committeeAPI.list(),  setMembers,    d => (d.members  || []).map(m => ({ ...m, group: m.committeeType }))), [fetchData])
  const loadFacilities= useCallback(() => fetchData('facilities', () => facilitiesAPI.list(), setFacilities, d => d.facilities|| []), [fetchData])
  const loadFAQs      = useCallback(() => fetchData('faqs',       () => faqsAPI.list(),       setFaqs,       d => d.faqs      || []), [fetchData])
  const loadContacts  = useCallback(() => fetchData('contacts',   () => contactsAPI.list(),   setContacts,   d => d.contacts  || []), [fetchData])
  const loadMessMenu  = useCallback(() => fetchData('messMenu',   () => messAPI.getMenu(),    setMessMenu,   d => d.menu      || null), [fetchData])

  // Admin-only data
  const loadComplaints   = useCallback(() => fetchData('complaints',   () => complaintsAPI.list(),       setComplaints,   d => d.complaints   || []), [fetchData])
  const loadMessFeedback = useCallback(() => fetchData('messFeedback', () => messAPI.listFeedback(),     setMessFeedback, d => d.feedback      || []), [fetchData])
  const loadAllNotices   = useCallback(() => fetchData('notices',      () => noticesAPI.listAll(),       setNotices,      d => d.notices       || []), [fetchData])

  // Load public data on mount
  useEffect(() => {
    loadNotices()
    loadMembers()
    loadFacilities()
    loadFAQs()
    loadContacts()
    loadMessMenu()
  }, [])  // eslint-disable-line

  // Load admin data when logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadAllNotices()
      loadComplaints()
      loadMessFeedback()
    }
  }, [isLoggedIn])  // eslint-disable-line

  // ── NOTICES ────────────────────────────────────────────────────────────────
  const addNotice = async (notice) => {
    const data = await noticesAPI.create(notice)
    await loadAllNotices()
    return data.notice
  }

  const updateNotice = async (id, updates) => {
    await noticesAPI.update(id, updates)
    await (isLoggedIn ? loadAllNotices : loadNotices)()
  }

  const deleteNotice = async (id) => {
    await noticesAPI.delete(id)
    await loadAllNotices()
  }

  // ── COMPLAINTS ─────────────────────────────────────────────────────────────
  const addComplaint = async (complaint) => {
    const data = await complaintsAPI.submit(complaint)
    // Return a shape the public complaints page expects
    return { complaintId: data.complaintId, status: data.status }
  }

  const updateComplaint = async (mongoId, updates) => {
    await complaintsAPI.update(mongoId, updates)
    await loadComplaints()
  }

  // ── MESS FEEDBACK ──────────────────────────────────────────────────────────
  const addMessFeedback = async (fb) => {
    await messAPI.submitFeedback(fb)
    // No reload needed — feedback is write-only from public side
  }

  const markFeedbackReviewed = async (id) => {
    await messAPI.markReviewed(id)
    await loadMessFeedback()
  }

  // ── COMMITTEE ──────────────────────────────────────────────────────────────
  const addMember = async (member) => {
    await committeeAPI.add(member)
    await loadMembers()
  }

  const updateMember = async (id, updates) => {
    await committeeAPI.update(id, updates)
    await loadMembers()
  }

  const deleteMember = async (id) => {
    await committeeAPI.delete(id)
    await loadMembers()
  }

  // ── FACILITIES ─────────────────────────────────────────────────────────────
  const addFacility = async (facility) => {
    await facilitiesAPI.add(facility)
    await loadFacilities()
  }

  const updateFacility = async (id, updates) => {
    await facilitiesAPI.update(id, updates)
    await loadFacilities()
  }

  const deleteFacility = async (id) => {
    await facilitiesAPI.delete(id)
    await loadFacilities()
  }

  // ── FAQs ───────────────────────────────────────────────────────────────────
  const addFAQ = async (faq) => {
    await faqsAPI.add(faq)
    await loadFAQs()
  }

  const updateFAQ = async (id, updates) => {
    await faqsAPI.update(id, updates)
    await loadFAQs()
  }

  const deleteFAQ = async (id) => {
    await faqsAPI.delete(id)
    await loadFAQs()
  }

  // ── CONTACTS ───────────────────────────────────────────────────────────────
  const addContact = async (contact) => {
    await contactsAPI.add(contact)
    await loadContacts()
  }

  const updateContact = async (id, updates) => {
    await contactsAPI.update(id, updates)
    await loadContacts()
  }

  const deleteContact = async (id) => {
    await contactsAPI.delete(id)
    await loadContacts()
  }

  return (
    <AdminContext.Provider value={{
      // auth
      adminUser, isLoggedIn, login, logout,
      // loading
      loading,
      // refresh helpers (for admin tabs)
      loadComplaints, loadAllNotices, loadMessFeedback,
      // notices
      notices, addNotice, updateNotice, deleteNotice,
      // complaints
      complaints, addComplaint, updateComplaint,
      // mess
      messFeedback, addMessFeedback, markFeedbackReviewed,
      messMenu, loadMessMenu,
      // committee
      members, addMember, updateMember, deleteMember,
      // facilities
      facilities, addFacility, updateFacility, deleteFacility,
      // faqs
      faqs, addFAQ, updateFAQ, deleteFAQ,
      // contacts
      contacts, addContact, updateContact, deleteContact,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
