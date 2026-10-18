const mongoose = require('mongoose')

const facilitySchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    category: {
      type:  String,
      enum:  ['Accommodation', 'Academic', 'Recreation', 'Essential Services', 'Safety'],
      required: true,
    },
    icon:        { type: String, default: 'Wrench' },  // lucide icon name
    description: { type: String, default: '' },
    photoUrl:    { type: String, default: '' },
    displayOrder:{ type: Number, default: 0 },
    active:      { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Facility', facilitySchema)
