const mongoose = require('mongoose')

// Weekly menu — one document per week (or current active menu)
const messMenuSchema = new mongoose.Schema(
  {
    weekLabel: { type: String, default: 'Current Week' },
    isActive:  { type: Boolean, default: true },

    // Keyed by day index 0-6 (Mon-Sun), then by meal
    menu: {
      type: Map,
      of: new mongoose.Schema({
        breakfast: { type: String, default: '' },
        lunch:     { type: String, default: '' },
        snacks:    { type: String, default: '' },
        dinner:    { type: String, default: '' },
      }, { _id: false }),
    },

    timings: {
      breakfast: { type: String, default: '7:00 AM – 9:00 AM' },
      lunch:     { type: String, default: '12:00 PM – 2:00 PM' },
      snacks:    { type: String, default: '5:00 PM – 6:00 PM' },
      dinner:    { type: String, default: '7:30 PM – 9:30 PM' },
    },

    updatedBy: { type: String, default: 'Admin' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('MessMenu', messMenuSchema)
