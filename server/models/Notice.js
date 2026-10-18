const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: true,
      trim:     true,
      maxlength: 200,
    },
    category: {
      type:    String,
      enum:    ['Important', 'Hostel', 'Mess', 'Maintenance', 'Events', 'Administration', 'General'],
      default: 'General',
    },
    description: { type: String, required: true, maxlength: 5000 },
    important:   { type: Boolean, default: false },
    status: {
      type:    String,
      enum:    ['draft', 'published', 'archived'],
      default: 'published',
    },
    publishedBy: { type: String, default: 'Admin' },
    expiresAt:   { type: Date },
  },
  { timestamps: true }
)

// Index for fast querying of published notices
noticeSchema.index({ status: 1, createdAt: -1 })

module.exports = mongoose.model('Notice', noticeSchema)
