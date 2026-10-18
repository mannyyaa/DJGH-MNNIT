const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    category: {
      type:  String,
      enum:  ['Events', 'Festivals', 'Sports', 'Cultural', 'Community', 'Activities'],
      default: 'Events',
    },
    date:        { type: String, required: true },   // display date string
    description: { type: String, default: '' },
    imageUrl:    { type: String, default: '' },
    active:      { type: Boolean, default: true },
    displayOrder:{ type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)
