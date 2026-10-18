/**
 * Diamond Jubilee Girls Hostel – MNNIT Allahabad
 * Express + MongoDB Backend API
 */

require('dotenv').config()
const express      = require('express')
const mongoose     = require('mongoose')
const cors         = require('cors')
const helmet       = require('helmet')
const rateLimit    = require('express-rate-limit')
const errorHandler = require('./middleware/errorHandler')

// ── ROUTES ───────────────────────────────────────────────────────────────────
const authRoutes       = require('./routes/auth')
const complaintRoutes  = require('./routes/complaints')
const noticeRoutes     = require('./routes/notices')
const messRoutes       = require('./routes/mess')
const committeeRoutes  = require('./routes/committee')
const facilityRoutes   = require('./routes/facilities')
const eventRoutes      = require('./routes/events')
const faqRoutes        = require('./routes/faqs')
const contactRoutes    = require('./routes/contacts')

const app  = express()
const PORT = process.env.PORT || 5000
const isProd = process.env.NODE_ENV === 'production'

// ── SECURITY HEADERS ─────────────────────────────────────────────────────────
app.use(helmet())

// ── CORS ──────────────────────────────────────────────────────────────────────
// In production only the configured CLIENT_ORIGIN is allowed.
// In development, localhost origins are also permitted.
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  ...(!isProd ? ['http://localhost:5173', 'http://localhost:3000'] : []),
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS: origin not allowed — ${origin}`))
  },
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ── RATE LIMITERS ─────────────────────────────────────────────────────────────

// General: 200 requests per 15 min per IP (covers all routes as a backstop)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests. Please try again later.' },
}))

// Auth login: strict — 10 attempts per 15 min per IP (fixes brute-force vulnerability)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again later.' },
  skipSuccessfulRequests: true,   // don't count successful logins against the limit
})

// Complaint submission only: 10 per 15 min per IP
// Applied only to POST /api/complaints — NOT to track/list/resolved routes
const complaintSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many complaints submitted. Please wait before submitting again.' },
})

// ── DATABASE ─────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✔ MongoDB connected'))
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message)
    process.exit(1)
  })

// ── API ROUTES ────────────────────────────────────────────────────────────────
// Auth gets its own strict rate limiter
app.use('/api/auth',       authLimiter, authRoutes)

// Complaint submission limiter is now applied only inside the router (POST /)
// The router itself is NOT wrapped with complaintSubmitLimiter so /track and /resolved work freely
app.use('/api/complaints', complaintRoutes)
app.use('/api/notices',    noticeRoutes)
app.use('/api/mess',       messRoutes)
app.use('/api/committee',  committeeRoutes)
app.use('/api/facilities', facilityRoutes)
app.use('/api/events',     eventRoutes)
app.use('/api/faqs',       faqRoutes)
app.use('/api/contacts',   contactRoutes)

// Export limiter so complaints.js can use it on POST only
app.locals.complaintSubmitLimiter = complaintSubmitLimiter

// ── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status:  'ok',
    service: 'Diamond Jubilee Girls Hostel API',
    time:    new Date().toISOString(),
    db:      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` })
})

// ── ERROR HANDLER ─────────────────────────────────────────────────────────────
app.use(errorHandler)

// ── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 DJGH API Server running on http://localhost:${PORT}`)
  console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`)
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`)
})

module.exports = app
