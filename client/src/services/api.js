/**
 * Frontend API service layer.
 * All backend calls go through these functions so the URL is centralised.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── Helpers ──────────────────────────────────────────────────────────────────

function getToken() {
  return localStorage.getItem('djgh_admin_token')
}

async function request(path, options = {}) {
  const token = getToken()

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err = new Error(data.message || `Request failed: ${res.status}`)
    err.status = res.status
    throw err
  }

  return data
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export const authAPI = {
  login: (username, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  me: () => request('/auth/me'),
}

// ── Complaints ───────────────────────────────────────────────────────────────

export const complaintsAPI = {
  submit: (data) =>
    request('/complaints', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  track: (complaintId) =>
    request(`/complaints/track/${encodeURIComponent(complaintId)}`),

  recentResolved: () =>
    request('/complaints/resolved/recent'),

  // Admin
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/complaints${qs ? '?' + qs : ''}`)
  },

  get: (id) => request(`/complaints/${id}`),

  update: (id, data) =>
    request(`/complaints/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
}

// ── Notices ──────────────────────────────────────────────────────────────────

export const noticesAPI = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/notices${qs ? '?' + qs : ''}`)
  },

  listAll: () => request('/notices/all'),           // admin

  get: (id) => request(`/notices/${id}`),

  create: (data) =>
    request('/notices', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    request(`/notices/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (id) =>
    request(`/notices/${id}`, { method: 'DELETE' }),
}

// ── Mess ─────────────────────────────────────────────────────────────────────

export const messAPI = {
  getMenu: () => request('/mess/menu'),

  updateMenu: (data) =>
    request('/mess/menu', { method: 'PUT', body: JSON.stringify(data) }),

  submitFeedback: (data) =>
    request('/mess/feedback', { method: 'POST', body: JSON.stringify(data) }),

  listFeedback: () => request('/mess/feedback'),          // admin

  markReviewed: (id) =>
    request(`/mess/feedback/${id}/reviewed`, { method: 'PATCH' }),
}

// ── Committee ────────────────────────────────────────────────────────────────

export const committeeAPI = {
  list: (type) => request(`/committee${type ? '?type=' + type : ''}`),

  add: (data) =>
    request('/committee', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    request(`/committee/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (id) =>
    request(`/committee/${id}`, { method: 'DELETE' }),
}

// ── Facilities ───────────────────────────────────────────────────────────────

export const facilitiesAPI = {
  list: () => request('/facilities'),

  add: (data) =>
    request('/facilities', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    request(`/facilities/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (id) =>
    request(`/facilities/${id}`, { method: 'DELETE' }),
}

// ── Events ───────────────────────────────────────────────────────────────────

export const eventsAPI = {
  list: (category) => request(`/events${category ? '?category=' + category : ''}`),

  add: (data) =>
    request('/events', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    request(`/events/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (id) =>
    request(`/events/${id}`, { method: 'DELETE' }),
}

// ── FAQs ─────────────────────────────────────────────────────────────────────

export const faqsAPI = {
  list: () => request('/faqs'),

  add: (data) =>
    request('/faqs', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    request(`/faqs/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (id) =>
    request(`/faqs/${id}`, { method: 'DELETE' }),
}

// ── Emergency Contacts ───────────────────────────────────────────────────────

export const contactsAPI = {
  list: () => request('/contacts'),

  add: (data) =>
    request('/contacts', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    request(`/contacts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (id) =>
    request(`/contacts/${id}`, { method: 'DELETE' }),
}

// ── Health ───────────────────────────────────────────────────────────────────

export const healthAPI = {
  check: () => request('/health'),
}
