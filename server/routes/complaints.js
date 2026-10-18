const router    = require('express').Router()
const { body, param, validationResult } = require('express-validator')
const Complaint = require('../models/Complaint')
const { requireAuth } = require('../middleware/auth')

// ── PUBLIC ROUTES ────────────────────────────────────────────────────────────

// POST /api/complaints — submit a new complaint
// Rate limit applied HERE (POST only), not at the router level.
// This means /track and /resolved/recent are NOT affected (audit finding #6).
router.post(
  '/',
  (req, res, next) => {
    // Pull the per-submission limiter from app.locals (set in index.js)
    const limiter = req.app.locals.complaintSubmitLimiter
    if (limiter) return limiter(req, res, next)
    next()
  },
  [
    body('category')
      .isIn(['civil','electrical','plumbing','furniture','cleaning','internet','mess','security','other'])
      .withMessage('Invalid category.'),
    body('description')
      .trim().notEmpty().withMessage('Description is required.')
      .isLength({ max: 2000 }).withMessage('Description too long.'),
    body('block').optional().trim().isLength({ max: 100 }),
    body('floor').optional().trim().isLength({ max: 100 }),
    body('room').optional().trim().isLength({ max: 20 }),
    body('subcategory').optional().trim().isLength({ max: 100 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      const { category, subcategory, block, floor, room, description } = req.body

      const complaint = await Complaint.create({
        category,
        subcategory: subcategory || '',
        block:       floor || block || '',   // accept 'floor' from frontend, store as 'block'
        room:        room || '',
        description,
        timeline: [{ status: 'submitted', note: 'Complaint received.', updatedBy: 'system' }],
      })

      res.status(201).json({
        message:     'Complaint submitted successfully.',
        complaintId: complaint.complaintId,
        status:      complaint.status,
      })
    } catch (err) {
      next(err)
    }
  }
)

// GET /api/complaints/track/:complaintId — public tracking
router.get(
  '/track/:complaintId',
  param('complaintId').trim().matches(/^DJGH-\d{4}-\d{5}$/).withMessage('Invalid complaint ID format.'),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      const complaint = await Complaint.findOne(
        { complaintId: req.params.complaintId.toUpperCase() },
        // Only expose safe fields publicly
        'complaintId category subcategory block description status priority timeline createdAt updatedAt'
      )

      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found. Please check the ID.' })
      }

      res.json({ complaint })
    } catch (err) {
      next(err)
    }
  }
)

// ── ADMIN ROUTES ─────────────────────────────────────────────────────────────

// GET /api/complaints — list all (admin)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { status, category, page = 1, limit = 20 } = req.query
    const filter = {}
    if (status)   filter.status   = status
    if (category) filter.category = category

    const total = await Complaint.countDocuments(filter)
    const complaints = await Complaint.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({ complaints, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
})

// GET /api/complaints/resolved/recent — recently resolved (public) — MUST be before /:id
router.get('/resolved/recent', async (req, res, next) => {
  try {
    const complaints = await Complaint.find(
      { status: 'resolved' },
      'complaintId category description block updatedAt'
    )
      .sort({ updatedAt: -1 })
      .limit(5)

    res.json({ complaints })
  } catch (err) {
    next(err)
  }
})

// GET /api/complaints/:id — single complaint detail (admin)
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
    if (!complaint) return res.status(404).json({ message: 'Complaint not found.' })
    res.json({ complaint })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/complaints/:id — update status / assign / resolve (admin)
router.patch(
  '/:id',
  requireAuth,
  [
    body('status').optional()
      .isIn(['submitted','acknowledged','assigned','in_progress','resolved'])
      .withMessage('Invalid status.'),
    body('priority').optional().isIn(['low','medium','high']),
    body('assignedTo').optional().trim().isLength({ max: 100 }),
    body('resolutionNote').optional().trim().isLength({ max: 1000 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      const complaint = await Complaint.findById(req.params.id)
      if (!complaint) return res.status(404).json({ message: 'Complaint not found.' })

      const { status, priority, assignedTo, resolutionNote, note } = req.body

      if (status && status !== complaint.status) {
        complaint.status = status
        complaint.timeline.push({
          status,
          note:      note || '',
          updatedBy: req.admin.username,
        })
      }
      if (priority)        complaint.priority        = priority
      if (assignedTo)      complaint.assignedTo      = assignedTo
      if (resolutionNote)  complaint.resolutionNote  = resolutionNote

      await complaint.save()
      res.json({ message: 'Complaint updated.', complaint })
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
