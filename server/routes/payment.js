import express from 'express'
import axios from 'axios'
import crypto from 'crypto'
import { validatePayment } from '../middleware/validation.js'
import { logger } from '../utils/logger.js'
import Payment from '../models/Payment.js'

const router = express.Router()

// MPESA credentials from environment variables
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET
const SHORTCODE = process.env.MPESA_SHORTCODE
const PASSKEY = process.env.MPESA_PASSKEY
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL || 'https://khalexchess.com/api/callback'

// Get OAuth token from Safaricom
const getAccessToken = async () => {
  try {
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')
    
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )
    
    return response.data.access_token
  } catch (error) {
    logger.error('Error getting access token:', error.message)
    throw new Error('Failed to get access token')
  }
}

// Generate password for STK Push
const generatePassword = () => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
  const password = Buffer.from(SHORTCODE + PASSKEY + timestamp).toString('base64')
  return { password, timestamp }
}

// Initiate STK Push payment
router.post('/pay', validatePayment, async (req, res) => {
  try {
    const { amount, phoneNumber, productId, productName } = req.body
    
    // Validate phone number format (Kenyan format)
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    let formattedPhone
    
    if (cleanPhone.startsWith('254')) {
      formattedPhone = cleanPhone
    } else if (cleanPhone.startsWith('0')) {
      formattedPhone = '254' + cleanPhone.slice(1)
    } else if (cleanPhone.startsWith('7') || cleanPhone.startsWith('1')) {
      formattedPhone = '254' + cleanPhone
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      })
    }
    
    const accessToken = await getAccessToken()
    const { password, timestamp } = generatePassword()
    
    const stkPushData = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: `KHALEX-${productId}`,
      TransactionDesc: `Payment for ${productName}`
    }
    
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkPushData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    
    // Save payment record
    const payment = new Payment({
      checkoutRequestId: response.data.CheckoutRequestID,
      merchantRequestId: response.data.MerchantRequestID,
      amount: amount,
      phoneNumber: formattedPhone,
      productId: productId,
      productName: productName,
      status: 'pending',
      timestamp: new Date()
    })
    
    await payment.save()
    
    logger.info(`STK Push initiated for phone: ${formattedPhone}, amount: ${amount}`)
    
    res.status(200).json({
      success: true,
      message: 'STK Push sent successfully',
      data: {
        checkoutRequestId: response.data.CheckoutRequestID,
        merchantRequestId: response.data.MerchantRequestID
      }
    })
    
  } catch (error) {
    logger.error('STK Push error:', error.response?.data || error.message)
    res.status(500).json({
      success: false,
      message: 'Payment initiation failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
})

// MPESA callback endpoint
router.post('/callback', async (req, res) => {
  try {
    const { Body } = req.body
    const { stkCallback } = Body
    
    const checkoutRequestId = stkCallback.CheckoutRequestID
    const merchantRequestId = stkCallback.MerchantRequestID
    const resultCode = stkCallback.ResultCode
    const resultDesc = stkCallback.ResultDesc
    
    // Find the payment record
    const payment = await Payment.findOne({ checkoutRequestId })
    
    if (!payment) {
      logger.error(`Payment not found for CheckoutRequestID: ${checkoutRequestId}`)
      return res.status(404).json({ message: 'Payment not found' })
    }
    
    if (resultCode === 0) {
      // Payment successful
      const callbackMetadata = stkCallback.CallbackMetadata?.Item || []
      const amount = callbackMetadata.find(item => item.Name === 'Amount')?.Value
      const mpesaReceiptNumber = callbackMetadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value
      const transactionDate = callbackMetadata.find(item => item.Name === 'TransactionDate')?.Value
      const phoneNumber = callbackMetadata.find(item => item.Name === 'PhoneNumber')?.Value
      
      // Update payment record
      payment.status = 'completed'
      payment.mpesaReceiptNumber = mpesaReceiptNumber
      payment.transactionDate = transactionDate ? new Date(transactionDate.toString()) : new Date()
      payment.actualAmount = amount
      payment.resultCode = resultCode
      payment.resultDescription = resultDesc
      
      await payment.save()
      
      logger.info(`Payment completed: Receipt ${mpesaReceiptNumber}, Amount: ${amount}`)
      
    } else {
      // Payment failed
      payment.status = 'failed'
      payment.resultCode = resultCode
      payment.resultDescription = resultDesc
      await payment.save()
      
      logger.error(`Payment failed: ${resultDesc}`)
    }
    
    // Acknowledge callback
    res.status(200).json({ ResultCode: 0, ResultDesc: 'Success' })
    
  } catch (error) {
    logger.error('Callback processing error:', error.message)
    res.status(500).json({ ResultCode: 1, ResultDesc: 'Error' })
  }
})

// Check payment status
router.get('/payment-status/:checkoutRequestId', async (req, res) => {
  try {
    const { checkoutRequestId } = req.params
    
    const payment = await Payment.findOne({ checkoutRequestId })
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      })
    }
    
    res.status(200).json({
      success: true,
      data: {
        status: payment.status,
        amount: payment.amount,
        mpesaReceiptNumber: payment.mpesaReceiptNumber,
        transactionDate: payment.transactionDate,
        resultDescription: payment.resultDescription
      }
    })
    
  } catch (error) {
    logger.error('Payment status check error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to check payment status'
    })
  }
})

export default router