const router   = require('express').Router()
const { body, validationResult } = require('express-validator')
const Facility = require('../models/Facility')
const { requireAuth } = require('../middleware/auth')

const VALID_CATEGORIES = ['Accommodation','Academic','Recreation','Essential Services','Safety']

// GET /api/facilities — public
router.get('/', async (req, res, next) => {
  try {
    const facilities = await Facility.find({ active: true }).sort({ category: 1, displayOrder: 1 })
    res.json({ facilities })
  } catch (err) {
    next(err)
  }
})

// POST /api/facilities — admin
router.post(
  '/',
  requireAuth,
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('category').isIn(VALID_CATEGORIES).withMessage('Invalid category.'),
    body('description').optional().trim().isLength({ max: 500 }),
    body('icon').optional().trim().isLength({ max: 50 }),
    body('displayOrder').optional().isInt({ min: 0 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      // Whitelist fields — prevent mass assignment (audit finding #7)
      const { name, category, description, icon, displayOrder } = req.body
      const facility = await Facility.create({
        name,
        category,
        description:  description  || '',
        icon:         icon         || 'Wrench',
        displayOrder: displayOrder || 0,
      })
      res.status(201).json({ message: 'Facility added.', facility })
    } catch (err) {
      next(err)
    }
  }
)

// PATCH /api/facilities/:id — admin
router.patch(
  '/:id',
  requireAuth,
  [
    body('name').optional().trim().notEmpty(),
    body('category').optional().isIn(VALID_CATEGORIES).withMessage('Invalid category.'),
    body('description').optional().trim().isLength({ max: 500 }),
    body('icon').optional().trim().isLength({ max: 50 }),
    body('displayOrder').optional().isInt({ min: 0 }),
    body('active').optional().isBoolean(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      // Whitelist fields — prevent mass assignment (audit finding #7)
      const { name, category, description, icon, displayOrder, active } = req.body
      const updates = {}
      if (name         !== undefined) updates.name         = name
      if (category     !== undefined) updates.category     = category
      if (description  !== undefined) updates.description  = description
      if (icon         !== undefined) updates.icon         = icon
      if (displayOrder !== undefined) updates.displayOrder = displayOrder
      if (active       !== undefined) updates.active       = active

      const facility = await Facility.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      )
      if (!facility) return res.status(404).json({ message: 'Facility not found.' })
      res.json({ message: 'Updated.', facility })
    } catch (err) {
      next(err)
    }
  }
)

// DELETE /api/facilities/:id — admin
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await Facility.findByIdAndDelete(req.params.id)
    res.json({ message: 'Facility deleted.' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
