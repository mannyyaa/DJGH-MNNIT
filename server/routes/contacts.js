const router           = require('express').Router()
const { body, validationResult } = require('express-validator')
const EmergencyContact = require('../models/EmergencyContact')
const { requireAuth }  = require('../middleware/auth')

const VALID_COLORS = ['navy', 'red', 'orange', 'gold', 'teal', 'gray']

// GET /api/contacts — public
router.get('/', async (req, res, next) => {
  try {
    const contacts = await EmergencyContact.find({ active: true }).sort({ displayOrder: 1 })
    res.json({ contacts })
  } catch (err) { next(err) }
})

// POST /api/contacts — admin
router.post(
  '/',
  requireAuth,
  [
    body('title').trim().notEmpty().withMessage('Title is required.').isLength({ max: 100 }),
    body('number').trim().notEmpty().withMessage('Number is required.').isLength({ max: 50 }),
    body('description').optional().trim().isLength({ max: 300 }),
    body('available').optional().trim().isLength({ max: 50 }),
    body('color').optional().isIn(VALID_COLORS).withMessage('Invalid color.'),
    body('icon').optional().trim().isLength({ max: 50 }),
    body('displayOrder').optional().isInt({ min: 0 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg })

      // Whitelist fields — prevent mass assignment (audit finding #7)
      const { title, number, description, available, color, icon, displayOrder } = req.body
      const contact = await EmergencyContact.create({
        title,
        number,
        description:  description  || '',
        available:    available    || '24 / 7',
        color:        color        || 'navy',
        icon:         icon         || 'Phone',
        displayOrder: displayOrder || 0,
      })
      res.status(201).json({ message: 'Contact added.', contact })
    } catch (err) { next(err) }
  }
)

// PATCH /api/contacts/:id — admin
router.patch(
  '/:id',
  requireAuth,
  [
    body('title').optional().trim().notEmpty().isLength({ max: 100 }),
    body('number').optional().trim().notEmpty().isLength({ max: 50 }),
    body('description').optional().trim().isLength({ max: 300 }),
    body('available').optional().trim().isLength({ max: 50 }),
    body('color').optional().isIn(VALID_COLORS).withMessage('Invalid color.'),
    body('icon').optional().trim().isLength({ max: 50 }),
    body('displayOrder').optional().isInt({ min: 0 }),
    body('active').optional().isBoolean(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg })

      // Whitelist fields — prevent mass assignment (audit finding #7)
      const { title, number, description, available, color, icon, displayOrder, active } = req.body
      const updates = {}
      if (title        !== undefined) updates.title        = title
      if (number       !== undefined) updates.number       = number
      if (description  !== undefined) updates.description  = description
      if (available    !== undefined) updates.available    = available
      if (color        !== undefined) updates.color        = color
      if (icon         !== undefined) updates.icon         = icon
      if (displayOrder !== undefined) updates.displayOrder = displayOrder
      if (active       !== undefined) updates.active       = active

      const contact = await EmergencyContact.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      )
      if (!contact) return res.status(404).json({ message: 'Contact not found.' })
      res.json({ message: 'Updated.', contact })
    } catch (err) { next(err) }
  }
)

// DELETE /api/contacts/:id — admin
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await EmergencyContact.findByIdAndDelete(req.params.id)
    res.json({ message: 'Contact deleted.' })
  } catch (err) { next(err) }
})

module.exports = router
