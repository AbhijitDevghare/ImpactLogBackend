const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  registration_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration', required: true },
  token_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VerificationToken', default: null },
  verification_status: { type: String, enum: ['PENDING', 'VERIFIED', 'FAILED'], default: 'PENDING' },
  verified_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Assuming admin is a User
  verified_at: { type: Date, default: null },
  remarks: { type: String, default: '' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Verification', verificationSchema);