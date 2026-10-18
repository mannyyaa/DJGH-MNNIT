const router       = require('express').Router()
const { body, validationResult } = require('express-validator')
const MessMenu     = require('../models/MessMenu')
const MessFeedback = require('../models/MessFeedback')
const { requireAuth } = require('../middleware/auth')

// ── MENU ─────────────────────────────────────────────────────────────────────

// GET /api/mess/menu — public: get active menu
router.get('/menu', async (req, res, next) => {
  try {
    const menu = await MessMenu.findOne({ isActive: true }).sort({ updatedAt: -1 })
    res.json({ menu: menu || null })
  } catch (err) {
    next(err)
  }
})

// PUT /api/mess/menu — admin: replace active menu
router.put('/menu', requireAuth, async (req, res, next) => {
  try {
    const { menu, timings, weekLabel } = req.body

    // Deactivate existing active menus
    await MessMenu.updateMany({ isActive: true }, { isActive: false })

    const newMenu = await MessMenu.create({
      weekLabel: weekLabel || 'Current Week',
      menu,
      timings,
      isActive:  true,
      updatedBy: req.admin.username,
    })

    res.json({ message: 'Menu updated.', menu: newMenu })
  } catch (err) {
    next(err)
  }
})

// ── FEEDBACK ─────────────────────────────────────────────────────────────────

// POST /api/mess/feedback — public: submit feedback
router.post(
  '/feedback',
  [
    body('category').optional()
      .isIn(['Food Quality','Taste','Hygiene','Variety','Timeliness','Overall Experience']),
    body('comment').optional().trim().isLength({ max: 1000 }),
    body('ratings').optional().isObject(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      const { category, ratings, comment } = req.body
      const feedback = await MessFeedback.create({ category, ratings, comment })
      res.status(201).json({ message: 'Feedback submitted. Thank you!', id: feedback._id })
    } catch (err) {
      next(err)
    }
  }
)

// GET /api/mess/feedback — admin: list feedback
router.get('/feedback', requireAuth, async (req, res, next) => {
  try {
    const feedback = await MessFeedback.find().sort({ createdAt: -1 }).limit(50)
    res.json({ feedback })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/mess/feedback/:id/reviewed — admin: mark reviewed
router.patch('/feedback/:id/reviewed', requireAuth, async (req, res, next) => {
  try {
    const fb = await MessFeedback.findByIdAndUpdate(
      req.params.id,
      { reviewed: true },
      { new: true }
    )
    if (!fb) return res.status(404).json({ message: 'Feedback not found.' })
    res.json({ message: 'Marked as reviewed.', feedback: fb })
  } catch (err) {
    next(err)
  }
})

module.exports = router
