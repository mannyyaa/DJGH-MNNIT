const mongoose = require('mongoose')

const messFeedbackSchema = new mongoose.Schema(
  {
    category: {
      type:    String,
      enum:    ['Food Quality', 'Taste', 'Hygiene', 'Variety', 'Timeliness', 'Overall Experience'],
      default: 'Overall Experience',
    },
    ratings: {
      foodQuality: { type: Number, min: 1, max: 5 },
      taste:       { type: Number, min: 1, max: 5 },
      hygiene:     { type: Number, min: 1, max: 5 },
      variety:     { type: Number, min: 1, max: 5 },
      timeliness:  { type: Number, min: 1, max: 5 },
      overall:     { type: Number, min: 1, max: 5 },
    },
    comment: {
      type:      String,
      maxlength: 1000,
      default:   '',
    },
    // Deliberately no student personal info stored
    reviewed: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('MessFeedback', messFeedbackSchema)
