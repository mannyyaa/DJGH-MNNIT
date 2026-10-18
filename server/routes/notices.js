const router = require('express').Router()
const { body, param, validationResult } = require('express-validator')
const Notice = require('../models/Notice')
const { requireAuth } = require('../middleware/auth')

const VALID_CATEGORIES = ['Important','Hostel','Mess','Maintenance','Events','Administration','General']
const VALID_STATUSES   = ['draft','published','archived']

// GET /api/notices — public: list published notices
router.get('/', async (req, res, next) => {
  try {
    const { category, q } = req.query
    const filter = { status: 'published' }
    if (category && category !== 'All') filter.category = category
    if (q) {
      filter.$or = [
        { title:       { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ]
    }

    const notices = await Notice.find(filter)
      .sort({ important: -1, createdAt: -1 })
      .limit(50)

    res.json({ notices })
  } catch (err) {
    next(err)
  }
})

// GET /api/notices/all — admin: list all notices incl. drafts
router.get('/all', requireAuth, async (req, res, next) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 })
    res.json({ notices })
  } catch (err) {
    next(err)
  }
})

// GET /api/notices/:id — single notice (public)
router.get('/:id', async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id)
    if (!notice) return res.status(404).json({ message: 'Notice not found.' })
    res.json({ notice })
  } catch (err) {
    next(err)
  }
})

// POST /api/notices — create (admin)
router.post(
  '/',
  requireAuth,
  [
    body('title').trim().notEmpty().withMessage('Title is required.').isLength({ max: 200 }),
    body('description').trim().notEmpty().withMessage('Description is required.'),
    body('category').optional().isIn(VALID_CATEGORIES).withMessage('Invalid category.'),
    body('important').optional().isBoolean(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      // Explicitly pick only safe fields — no mass assignment
      const { title, description, category, important } = req.body
      const notice = await Notice.create({
        title,
        description,
        category:    category    || 'General',
        important:   important   ?? false,
        publishedBy: req.admin.username,
        status:      'published',
      })
      res.status(201).json({ message: 'Notice created.', notice })
    } catch (err) {
      next(err)
    }
  }
)

// PATCH /api/notices/:id — update (admin)
// Whitelists only fields an admin should be able to change (fix for audit finding #7).
router.patch(
  '/:id',
  requireAuth,
  [
    body('title').optional().trim().notEmpty().isLength({ max: 200 }),
    body('description').optional().trim().notEmpty(),
    body('category').optional().isIn(VALID_CATEGORIES).withMessage('Invalid category.'),  // was missing — audit finding #16
    body('important').optional().isBoolean(),
    body('status').optional().isIn(VALID_STATUSES).withMessage('Invalid status.'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      // Whitelist — only these fields can be changed via PATCH (audit finding #7)
      const { title, description, category, important, status } = req.body
      const updates = {}
      if (title       !== undefined) updates.title       = title
      if (description !== undefined) updates.description = description
      if (category    !== undefined) updates.category    = category
      if (important   !== undefined) updates.important   = important
      if (status      !== undefined) updates.status      = status

      const notice = await Notice.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      )
      if (!notice) return res.status(404).json({ message: 'Notice not found.' })
      res.json({ message: 'Notice updated.', notice })
    } catch (err) {
      next(err)
    }
  }
)

// DELETE /api/notices/:id — delete (admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id)
    if (!notice) return res.status(404).json({ message: 'Notice not found.' })
    res.json({ message: 'Notice deleted.' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
