# M-Pesa Integration Roadmap - Khalex Chess

## Overview

This document outlines the planned M-Pesa payment integration for the Khalex Chess e-commerce platform. The current system uses a call-to-order approach, but this roadmap details the implementation of full M-Pesa STK Push payments for automated online transactions.

## Current State

- **Status**: Call-to-order system implemented
- **Payment Method**: Phone/WhatsApp contact for order placement
- **Payment Processing**: Manual (cash on delivery or M-Pesa on delivery)

## Planned Implementation

### Phase 1: M-Pesa STK Push Integration

#### 1.1 Backend API Development

**Required Endpoints:**

```typescript
// Payment initiation endpoint
POST /api/payments/initiate
{
  "amount": number,
  "phoneNumber": string,
  "productId": string,
  "productName": string,
  "customerName": string,
  "customerEmail": string
}

// Payment status check endpoint
GET /api/payments/status/:checkoutRequestId

// Webhook for payment completion
POST /api/payments/webhook
```

**Backend Technology Stack:**
- **Framework**: Node.js with Express or Nest.js
- **Database**: PostgreSQL or MongoDB
- **Environment**: Production and staging environments
- **Security**: HTTPS, API key authentication, webhook validation

#### 1.2 M-Pesa Integration Requirements

**Safaricom Developer Account Setup:**
1. Register at [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Create application for M-Pesa Express (STK Push)
3. Obtain production credentials:
   - Consumer Key
   - Consumer Secret
   - Business Short Code
   - Pass Key

**API Integration:**
```javascript
// M-Pesa configuration
const mpesaConfig = {
  environment: 'production', // or 'sandbox' for testing
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  businessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
  passkey: process.env.MPESA_PASSKEY,
  callbackUrl: process.env.MPESA_CALLBACK_URL,
  accountReference: 'KhalexChess',
  transactionDesc: 'Chess Equipment Purchase'
}
```

#### 1.3 Database Schema

**Payments Table:**
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  checkout_request_id VARCHAR(255) UNIQUE NOT NULL,
  merchant_request_id VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  product_id VARCHAR(50),
  product_name VARCHAR(255),
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
  mpesa_receipt_number VARCHAR(255),
  transaction_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_checkout_request_id ON payments(checkout_request_id);
CREATE INDEX idx_status ON payments(status);
CREATE INDEX idx_created_at ON payments(created_at);
```

**Orders Table:**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  payment_id UUID REFERENCES payments(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(15) NOT NULL,
  delivery_address TEXT,
  order_items JSON NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Phase 2: Frontend Integration

#### 2.1 Payment Modal Enhancement

**Updated PaymentModal.vue Features:**
- M-Pesa phone number validation
- Real-time payment status updates
- Error handling and retry logic
- Loading states and progress indicators

**Key Components:**
```vue
<template>
  <div class="payment-modal">
    <!-- Payment form -->
    <form @submit.prevent="initiatePayment">
      <input v-model="phoneNumber" type="tel" placeholder="254712345678" />
      <button :disabled="isProcessing">
        Pay Ksh {{ amount.toLocaleString() }}
      </button>
    </form>
    
    <!-- Payment status -->
    <div v-if="paymentStatus" class="payment-status">
      <div v-if="paymentStatus === 'pending'" class="status-pending">
        <i class="fas fa-spinner fa-spin"></i>
        Check your phone for M-Pesa prompt...
      </div>
      
      <div v-if="paymentStatus === 'completed'" class="status-success">
        <i class="fas fa-check-circle"></i>
        Payment successful!
      </div>
      
      <div v-if="paymentStatus === 'failed'" class="status-error">
        <i class="fas fa-times-circle"></i>
        Payment failed. Please try again.
      </div>
    </div>
  </div>
</template>
```

#### 2.2 API Integration Service

**usePayments Composable:**
```typescript
// composables/usePayments.ts
export function usePayments() {
  const initiatePayment = async (paymentData: PaymentRequest) => {
    const response = await fetch('/api/payments/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(paymentData)
    })
    
    return response.json()
  }
  
  const checkPaymentStatus = async (checkoutRequestId: string) => {
    const response = await fetch(`/api/payments/status/${checkoutRequestId}`)
    return response.json()
  }
  
  return {
    initiatePayment,
    checkPaymentStatus
  }
}
```

### Phase 3: Security & Compliance

#### 3.1 Security Measures

**Authentication & Authorization:**
- JWT tokens for API authentication
- Rate limiting on payment endpoints
- IP whitelisting for webhook endpoints
- Request signature validation

**Data Protection:**
- Encrypt sensitive payment data
- PCI compliance considerations
- Secure logging (no sensitive data in logs)
- Regular security audits

#### 3.2 Webhook Security

**Webhook Validation:**
```javascript
const validateWebhook = (req, res, next) => {
  const signature = req.headers['x-mpesa-signature']
  const payload = JSON.stringify(req.body)
  
  const expectedSignature = crypto
    .createHmac('sha256', process.env.MPESA_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex')
  
  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' })
  }
  
  next()
}
```

### Phase 4: Testing Strategy

#### 4.1 Sandbox Testing

**Test Scenarios:**
1. Successful payment flow
2. Failed payment handling
3. Timeout scenarios
4. Network connectivity issues
5. Invalid phone number handling
6. Insufficient funds scenarios

**Test Data:**
```javascript
const testPhoneNumbers = {
  success: '254708374149',
  insufficientFunds: '254708374149',
  invalidPin: '254708374149',
  timeout: '254708374149'
}
```

#### 4.2 Production Testing

**Gradual Rollout:**
1. Internal team testing
2. Beta user testing (limited users)
3. Soft launch (percentage of users)
4. Full production rollout

### Phase 5: Monitoring & Analytics

#### 5.1 Payment Monitoring

**Key Metrics:**
- Payment success rate
- Average payment processing time
- Failed payment reasons
- User abandonment rates

**Monitoring Tools:**
- Application performance monitoring (APM)
- Error tracking (Sentry, Bugsnag)
- Custom dashboard for payment metrics
- Real-time alerts for payment failures

#### 5.2 Analytics Integration

**Payment Analytics:**
```javascript
// Track payment events
analytics.track('Payment Initiated', {
  amount: payment.amount,
  productId: payment.productId,
  paymentMethod: 'mpesa'
})

analytics.track('Payment Completed', {
  amount: payment.amount,
  transactionId: payment.mpesaReceiptNumber,
  processingTime: payment.processingTime
})
```

### Phase 6: Error Handling & Recovery

#### 6.1 Error Categories

**Technical Errors:**
- Network timeouts
- M-Pesa API downtime
- Database connection issues
- Server errors

**Business Logic Errors:**
- Invalid phone numbers
- Insufficient funds
- Transaction limits exceeded
- Duplicate transactions

#### 6.2 Recovery Mechanisms

**Retry Logic:**
```javascript
const retryPayment = async (paymentData, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await initiatePayment(paymentData)
    } catch (error) {
      if (attempt === maxRetries) throw error
      await delay(attempt * 1000) // Exponential backoff
    }
  }
}
```

**Fallback Options:**
- Manual payment verification
- Customer service contact integration
- Alternative payment methods

## Implementation Timeline

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up Safaricom developer account
- [ ] Obtain M-Pesa API credentials
- [ ] Design database schema
- [ ] Set up backend infrastructure

### Phase 2: Backend Development (Weeks 3-4)
- [ ] Implement M-Pesa API integration
- [ ] Create payment endpoints
- [ ] Set up webhook handling
- [ ] Implement security measures

### Phase 3: Frontend Integration (Weeks 5-6)
- [ ] Update PaymentModal component
- [ ] Implement payment status polling
- [ ] Add error handling UI
- [ ] Create payment success/failure flows

### Phase 4: Testing (Weeks 7-8)
- [ ] Sandbox testing
- [ ] Security testing
- [ ] Performance testing
- [ ] User acceptance testing

### Phase 5: Deployment (Weeks 9-10)
- [ ] Production environment setup
- [ ] Monitoring and analytics setup
- [ ] Soft launch with limited users
- [ ] Full production rollout

## Environment Configuration

### Development Environment
```env
# M-Pesa Sandbox Configuration
MPESA_ENVIRONMENT=sandbox
MPESA_CONSUMER_KEY=your_sandbox_consumer_key
MPESA_CONSUMER_SECRET=your_sandbox_consumer_secret
MPESA_BUSINESS_SHORTCODE=174379
MPESA_PASSKEY=sandbox_passkey
MPESA_CALLBACK_URL=https://your-app.com/api/payments/webhook
```

### Production Environment
```env
# M-Pesa Production Configuration
MPESA_ENVIRONMENT=production
MPESA_CONSUMER_KEY=your_production_consumer_key
MPESA_CONSUMER_SECRET=your_production_consumer_secret
MPESA_BUSINESS_SHORTCODE=your_business_shortcode
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_URL=https://khalexchess.com/api/payments/webhook

# Security
JWT_SECRET=your_jwt_secret
WEBHOOK_SECRET=your_webhook_secret

# Database
DATABASE_URL=postgresql://user:password@localhost/khalex_chess
```

## Documentation & Resources

### Official Documentation
- [Safaricom Developer Portal](https://developer.safaricom.co.ke)
- [M-Pesa Express API Documentation](https://developer.safaricom.co.ke/docs)
- [STK Push API Reference](https://developer.safaricom.co.ke/mpesa/stkpush)

### Code Examples
- [M-Pesa Node.js SDK](https://github.com/safaricom/mpesa-node-sdk)
- [Community Examples](https://github.com/topics/mpesa-stk-push)

### Support Contacts
- Safaricom Developer Support: support@safaricom.co.ke
- M-Pesa Integration Team: (contact information to be obtained)

## Risk Assessment & Mitigation

### Technical Risks
1. **API Downtime**: Implement retry logic and fallback mechanisms
2. **Transaction Failures**: Comprehensive error handling and recovery
3. **Security Breaches**: Regular security audits and monitoring

### Business Risks
1. **Payment Disputes**: Clear refund policy and customer service
2. **Regulatory Changes**: Stay updated with payment regulations
3. **User Experience**: Thorough testing and user feedback integration

## Success Metrics

### Technical KPIs
- Payment success rate > 95%
- Average payment processing time < 30 seconds
- API uptime > 99.5%

### Business KPIs
- Conversion rate improvement
- Reduced cart abandonment
- Customer satisfaction scores
- Revenue growth from online payments

---

**Document Status**: Draft  
**Version**: 1.0  
**Last Updated**: December 2024  
**Next Review**: Upon implementation start

## Notes

This is a comprehensive roadmap for M-Pesa integration. The current call-to-order system serves as an interim solution while this automated payment system is being developed. Priority should be given to security, user experience, and regulatory compliance throughout the implementation process.