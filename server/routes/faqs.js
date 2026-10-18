const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const FAQ    = require('../models/FAQ')
const { requireAuth } = require('../middleware/auth')

// GET /api/faqs — public
router.get('/', async (req, res, next) => {
  try {
    const faqs = await FAQ.find({ active: true }).sort({ displayOrder: 1 })
    res.json({ faqs })
  } catch (err) { next(err) }
})

// POST /api/faqs — admin
router.post(
  '/',
  requireAuth,
  [
    body('question').trim().notEmpty().withMessage('Question is required.').isLength({ max: 500 }),
    body('answer').trim().notEmpty().withMessage('Answer is required.').isLength({ max: 2000 }),
    body('displayOrder').optional().isInt({ min: 0 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg })

      // Whitelist fields — prevent mass assignment (audit finding #7)
      const { question, answer, displayOrder } = req.body
      const faq = await FAQ.create({ question, answer, displayOrder: displayOrder || 0 })
      res.status(201).json({ message: 'FAQ added.', faq })
    } catch (err) { next(err) }
  }
)

// PATCH /api/faqs/:id — admin
router.patch(
  '/:id',
  requireAuth,
  [
    body('question').optional().trim().notEmpty().isLength({ max: 500 }),
    body('answer').optional().trim().notEmpty().isLength({ max: 2000 }),
    body('displayOrder').optional().isInt({ min: 0 }),
    body('active').optional().isBoolean(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg })

      // Whitelist fields — prevent mass assignment (audit finding #7)
      const { question, answer, displayOrder, active } = req.body
      const updates = {}
      if (question     !== undefined) updates.question     = question
      if (answer       !== undefined) updates.answer       = answer
      if (displayOrder !== undefined) updates.displayOrder = displayOrder
      if (active       !== undefined) updates.active       = active

      const faq = await FAQ.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true })
      if (!faq) return res.status(404).json({ message: 'FAQ not found.' })
      res.json({ message: 'Updated.', faq })
    } catch (err) { next(err) }
  }
)

// DELETE /api/faqs/:id — admin
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id)
    res.json({ message: 'FAQ deleted.' })
  } catch (err) { next(err) }
})

module.exports = router
