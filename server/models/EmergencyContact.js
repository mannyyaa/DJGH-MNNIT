const mongoose = require('mongoose')

const emergencyContactSchema = new mongoose.Schema(
  {
    title:        { type: String, required: true, trim: true },
    number:       { type: String, required: true, trim: true },
    description:  { type: String, default: '' },
    icon:         { type: String, default: 'Phone' },
    color:        { type: String, default: 'navy' },
    available:    { type: String, default: '24 / 7' },
    displayOrder: { type: Number, default: 0 },
    active:       { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema)
