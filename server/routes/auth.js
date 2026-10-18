const router    = require('express').Router()
const jwt       = require('jsonwebtoken')
const bcrypt    = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const AdminUser = require('../models/AdminUser')
const { requireAuth } = require('../middleware/auth')

// Dummy hash used to ensure constant-time comparison even when user doesn't exist.
// Prevents timing-based username enumeration (audit finding #1).
// This is a real bcrypt hash (cost 12) — bcrypt.compare will run the full computation
// against it, making the response time identical whether the user exists or not.
const DUMMY_HASH = '$2a$12$k5w9MO64uyKoW0pYmS1leu7IABZOY6SzpOYMf7YIcIjlP5HPaK8cy'

// POST /api/auth/login
router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('Username is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      const { username, password } = req.body
      const user = await AdminUser.findOne({ username: username.toLowerCase() })

      // Always run bcrypt.compare — even when user not found — to prevent
      // timing attacks that reveal valid usernames (audit finding #1).
      const hashToCompare = user ? user.passwordHash : DUMMY_HASH
      const isMatch       = await bcrypt.compare(password, hashToCompare)

      if (!user || !isMatch) {
        return res.status(401).json({ message: 'Invalid username or password.' })
      }

      // Update last login timestamp
      user.lastLogin = new Date()
      await user.save()

      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      )

      res.json({
        token,
        user: { username: user.username, displayName: user.displayName, role: user.role },
      })
    } catch (err) {
      next(err)
    }
  }
)

// GET /api/auth/me — verify token and return current admin info
router.get('/me', requireAuth, async (req, res) => {
  res.json({ admin: req.admin })
})

module.exports = router
