const mongoose = require('mongoose')

const timelineEventSchema = new mongoose.Schema(
  {
    status:  { type: String, required: true },
    note:    { type: String, default: '' },
    updatedBy: { type: String, default: 'system' },
  },
  { timestamps: true }
)

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type:   String,
      unique: true,
    },
    category: {
      type:     String,
      required: true,
      enum:     ['civil', 'electrical', 'plumbing', 'furniture', 'cleaning', 'internet', 'mess', 'security', 'other'],
    },
    subcategory: { type: String, default: '' },
    block:       { type: String, default: '' },
    room:        { type: String, default: '' },
    description: { type: String, required: true, maxlength: 2000 },
    photoUrl:    { type: String, default: '' },

    status: {
      type:    String,
      enum:    ['submitted', 'acknowledged', 'assigned', 'in_progress', 'resolved'],
      default: 'submitted',
    },

    priority: {
      type:    String,
      enum:    ['low', 'medium', 'high'],
      default: 'medium',
    },

    assignedTo:     { type: String, default: '' },
    resolutionNote: { type: String, default: '' },

    timeline: [timelineEventSchema],
  },
  { timestamps: true }
)

// Auto-generate complaint ID before saving
complaintSchema.pre('save', async function (next) {
  if (this.complaintId) return next()
  const year  = new Date().getFullYear()
  const count = await mongoose.model('Complaint').countDocuments()
  this.complaintId = `DJGH-${year}-${String(count + 1).padStart(5, '0')}`
  next()
})

module.exports = mongoose.model('Complaint', complaintSchema)
