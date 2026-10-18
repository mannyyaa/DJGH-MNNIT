const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const Event  = require('../models/Event')
const { requireAuth } = require('../middleware/auth')

// GET /api/events — public
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query
    const filter = { active: true }
    if (category && category !== 'All') filter.category = category
    const events = await Event.find(filter).sort({ displayOrder: 1, createdAt: -1 })
    res.json({ events })
  } catch (err) {
    next(err)
  }
})

// POST /api/events — admin
router.post('/', requireAuth, [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('date').trim().notEmpty().withMessage('Date is required.'),
], async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg })
    const event = await Event.create(req.body)
    res.status(201).json({ message: 'Event added.', event })
  } catch (err) { next(err) }
})

// PATCH /api/events/:id — admin
router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!event) return res.status(404).json({ message: 'Event not found.' })
    res.json({ message: 'Updated.', event })
  } catch (err) { next(err) }
})

// DELETE /api/events/:id — admin
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.json({ message: 'Event deleted.' })
  } catch (err) { next(err) }
})

module.exports = router
