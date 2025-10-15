<template>
  <div class="payment-modal-overlay" @click="closeModal">
    <div class="payment-modal" @click.stop>
      <div class="modal-header">
        <h3>Complete Your Purchase</h3>
        <button @click="closeModal" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="product-summary">
          <div class="product-info">
            <i :class="product.icon"></i>
            <div>
              <h4>{{ product.name }}</h4>
              <p class="product-price">Ksh {{ product.price.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="processPayment" class="payment-form">
          <div class="form-group">
            <label class="form-label">Phone Number (M-Pesa)</label>
            <input
              v-model="paymentForm.phoneNumber"
              type="tel"
              placeholder="254712345678"
              class="form-input"
              :class="{ 'error': errors.phoneNumber }"
              required
            >
            <div v-if="errors.phoneNumber" class="form-error">
              {{ errors.phoneNumber }}
            </div>
          </div>

          <div class="payment-info">
            <div class="info-item">
              <i class="fas fa-mobile-alt"></i>
              <span>You will receive an M-Pesa STK push notification</span>
            </div>
            <div class="info-item">
              <i class="fas fa-shield-alt"></i>
              <span>Secure payment processed by Safaricom</span>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn btn-ghost">
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="isProcessing"
            >
              <i v-if="isProcessing" class="fas fa-spinner animate-spin"></i>
              <i v-else class="fas fa-credit-card"></i>
              {{ isProcessing ? 'Processing...' : `Pay Ksh ${product.price.toLocaleString()}` }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useNotificationStore } from '@/store/notification'
import { initiatePayment, checkPaymentStatus } from '@/composables/useApi'

// Props and emits
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])

// Store
const notificationStore = useNotificationStore()

// Form state
const paymentForm = reactive({
  phoneNumber: ''
})

const errors = ref({})
const isProcessing = ref(false)

// Methods
const validateForm = () => {
  errors.value = {}
  
  if (!paymentForm.phoneNumber) {
    errors.value.phoneNumber = 'Phone number is required'
    return false
  }
  
  // Validate Kenyan phone number format
  const phoneRegex = /^(\+254|254|0)[17]\d{8}$/
  if (!phoneRegex.test(paymentForm.phoneNumber)) {
    errors.value.phoneNumber = 'Please enter a valid Kenyan phone number (e.g., 254712345678)'
    return false
  }
  
  return true
}

const processPayment = async () => {
  if (!validateForm()) return
  
  isProcessing.value = true
  
  try {
    const paymentData = {
      amount: props.product.price,
      phoneNumber: paymentForm.phoneNumber,
      productId: props.product.id.toString(),
      productName: props.product.name
    }
    
    const response = await initiatePayment(paymentData)
    
    if (response.success) {
      notificationStore.success('Payment request sent! Please check your phone for M-Pesa prompt.')
      
      // Poll for payment status
      const checkoutRequestId = response.data.checkoutRequestId
      pollPaymentStatus(checkoutRequestId)
      
    } else {
      throw new Error(response.message || 'Payment failed')
    }
    
  } catch (error) {
    console.error('Payment error:', error)
    notificationStore.error(
      error.response?.data?.message || 'Payment failed. Please try again.'
    )
    isProcessing.value = false
  }
}

const pollPaymentStatus = async (checkoutRequestId) => {
  let attempts = 0
  const maxAttempts = 30 // 30 seconds total
  
  const poll = async () => {
    try {
      const statusResponse = await checkPaymentStatus(checkoutRequestId)
      
      if (statusResponse.success) {
        const { status } = statusResponse.data
        
        if (status === 'completed') {
          notificationStore.success('Payment successful!')
          emit('success')
          isProcessing.value = false
          return
        } else if (status === 'failed') {
          notificationStore.error('Payment failed. Please try again.')
          isProcessing.value = false
          return
        }
      }
      
      // Continue polling if still pending
      attempts++
      if (attempts < maxAttempts) {
        setTimeout(poll, 1000) // Check every second
      } else {
        notificationStore.warning('Payment is taking longer than expected. Please check your M-Pesa messages.')
        isProcessing.value = false
      }
      
    } catch (error) {
      console.error('Status check error:', error)
      attempts++
      if (attempts < maxAttempts) {
        setTimeout(poll, 1000)
      } else {
        notificationStore.error('Unable to verify payment status. Please contact support.')
        isProcessing.value = false
      }
    }
  }
  
  // Start polling after 2 seconds
  setTimeout(poll, 2000)
}

const closeModal = () => {
  if (!isProcessing.value) {
    emit('close')
  }
}
</script>

<style lang="scss" scoped>
.payment-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-modal;
  padding: $space-4;
}

.payment-modal {
  background-color: var(--bg-primary);
  border-radius: $radius-xl;
  box-shadow: $shadow-2xl;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space-6;
  border-bottom: 1px solid var(--border-color);

  h3 {
    color: var(--text-primary);
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: $text-lg;
    cursor: pointer;
    padding: $space-2;
    border-radius: $radius-sm;
    transition: all $duration-fast $ease-out;

    &:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }
  }
}

.modal-body {
  padding: $space-6;
}

.product-summary {
  background-color: var(--bg-secondary);
  border-radius: $radius-lg;
  padding: $space-4;
  margin-bottom: $space-6;

  .product-info {
    display: flex;
    align-items: center;
    gap: $space-4;

    i {
      font-size: $text-2xl;
      color: var(--text-accent);
    }

    h4 {
      color: var(--text-primary);
      margin-bottom: $space-1;
    }

    .product-price {
      color: var(--text-accent);
      font-weight: $font-bold;
      font-size: $text-lg;
      margin: 0;
    }
  }
}

.payment-form {
  .form-group {
    margin-bottom: $space-6;
  }

  .form-input {
    font-size: 16px; // Prevent zoom on iOS
  }
}

.payment-info {
  background-color: var(--bg-secondary);
  border-radius: $radius-lg;
  padding: $space-4;
  margin-bottom: $space-6;

  .info-item {
    display: flex;
    align-items: center;
    gap: $space-3;
    color: var(--text-secondary);
    font-size: $text-sm;
    margin-bottom: $space-2;

    &:last-child {
      margin-bottom: 0;
    }

    i {
      color: var(--text-accent);
      flex-shrink: 0;
    }
  }
}

.modal-actions {
  display: flex;
  gap: $space-3;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column;
  }

  .btn {
    min-width: 120px;

    @media (max-width: 480px) {
      width: 100%;
    }

    i {
      margin-right: $space-2;
    }
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>