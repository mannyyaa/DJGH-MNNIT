const router  = require('express').Router()
const { body, validationResult } = require('express-validator')
const CommitteeMember = require('../models/CommitteeMember')
const { requireAuth } = require('../middleware/auth')

const VALID_TYPES = ['administration', 'hostel', 'mess']

// GET /api/committee — public: all active members
router.get('/', async (req, res, next) => {
  try {
    const { type } = req.query
    const filter = { active: true }
    if (type) filter.committeeType = type

    const members = await CommitteeMember.find(filter).sort({ displayOrder: 1, createdAt: 1 })
    res.json({ members })
  } catch (err) {
    next(err)
  }
})

// POST /api/committee — admin: add member
router.post(
  '/',
  requireAuth,
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('position').trim().notEmpty().withMessage('Position is required.'),
    body('committeeType').isIn(VALID_TYPES).withMessage('Invalid committee type.'),
    body('department').optional().trim().isLength({ max: 200 }),
    body('contact').optional().trim().isLength({ max: 100 }),
    body('responsibilities').optional().trim().isLength({ max: 500 }),
    body('displayOrder').optional().isInt({ min: 0 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      // Whitelist fields — prevent mass assignment (audit finding #7)
      const { name, position, committeeType, department, contact, responsibilities, displayOrder } = req.body
      const member = await CommitteeMember.create({
        name,
        position,
        committeeType,
        department:      department      || '',
        contact:         contact         || '',
        responsibilities: responsibilities || '',
        displayOrder:    displayOrder    || 0,
      })
      res.status(201).json({ message: 'Member added.', member })
    } catch (err) {
      next(err)
    }
  }
)

// PATCH /api/committee/:id — admin: update member
router.patch(
  '/:id',
  requireAuth,
  [
    body('name').optional().trim().notEmpty(),
    body('position').optional().trim().notEmpty(),
    body('committeeType').optional().isIn(VALID_TYPES).withMessage('Invalid committee type.'),
    body('department').optional().trim().isLength({ max: 200 }),
    body('contact').optional().trim().isLength({ max: 100 }),
    body('responsibilities').optional().trim().isLength({ max: 500 }),
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
      const { name, position, committeeType, department, contact, responsibilities, displayOrder, active } = req.body
      const updates = {}
      if (name             !== undefined) updates.name             = name
      if (position         !== undefined) updates.position         = position
      if (committeeType    !== undefined) updates.committeeType    = committeeType
      if (department       !== undefined) updates.department       = department
      if (contact          !== undefined) updates.contact          = contact
      if (responsibilities !== undefined) updates.responsibilities = responsibilities
      if (displayOrder     !== undefined) updates.displayOrder     = displayOrder
      if (active           !== undefined) updates.active           = active

      const member = await CommitteeMember.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      )
      if (!member) return res.status(404).json({ message: 'Member not found.' })
      res.json({ message: 'Member updated.', member })
    } catch (err) {
      next(err)
    }
  }
)

// DELETE /api/committee/:id — admin: delete member
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const member = await CommitteeMember.findByIdAndDelete(req.params.id)
    if (!member) return res.status(404).json({ message: 'Member not found.' })
    res.json({ message: 'Member deleted.' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
