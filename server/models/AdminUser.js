const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const adminUserSchema = new mongoose.Schema(
  {
    username: {
      type:     String,
      required: true,
      unique:   true,
      trim:     true,
      lowercase: true,
    },
    passwordHash: {
      type:     String,
      required: true,
    },
    role: {
      type:    String,
      enum:    ['superadmin', 'warden', 'caretaker'],
      default: 'warden',
    },
    displayName: { type: String, default: '' },
    lastLogin:   { type: Date },
  },
  { timestamps: true }
)

// Hash password before saving
adminUserSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next()
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12)
  next()
})

// Verify password
adminUserSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash)
}

module.exports = mongoose.model('AdminUser', adminUserSchema)
