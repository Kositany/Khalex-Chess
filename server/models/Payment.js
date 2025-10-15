import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  checkoutRequestId: {
    type: String,
    required: true,
    unique: true
  },
  merchantRequestId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  actualAmount: {
    type: Number
  },
  phoneNumber: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  mpesaReceiptNumber: {
    type: String
  },
  transactionDate: {
    type: Date
  },
  resultCode: {
    type: Number
  },
  resultDescription: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Index for faster queries
paymentSchema.index({ checkoutRequestId: 1 })
paymentSchema.index({ phoneNumber: 1 })
paymentSchema.index({ status: 1 })
paymentSchema.index({ timestamp: -1 })

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment