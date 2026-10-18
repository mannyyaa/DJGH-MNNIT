const mongoose = require('mongoose')

const committeeMemberSchema = new mongoose.Schema(
  {
    name:            { type: String, required: true, trim: true },
    position:        { type: String, required: true, trim: true },
    committeeType: {
      type:  String,
      enum:  ['administration', 'hostel', 'mess'],
      required: true,
    },
    year:            { type: String, default: '' },
    department:      { type: String, default: '' },
    responsibilities:{ type: String, default: '' },
    contact:         { type: String, default: '' },
    officeHours:     { type: String, default: '' },
    photoUrl:        { type: String, default: '' },
    displayOrder:    { type: Number, default: 0 },
    active:          { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('CommitteeMember', committeeMemberSchema)
