<template>
  <form @submit.prevent="handleSubmit" class="newsletter-form" :class="{ 'loading': isLoading }">
    <div class="form-group">
      <div class="input-group">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="form-input"
          :class="{ 'error': emailError }"
          required
          :disabled="isLoading"
        >
        <button
          type="submit"
          class="btn btn-primary btn-submit"
          :disabled="isLoading || !email"
        >
          <i v-if="isLoading" class="fas fa-spinner animate-spin"></i>
          <i v-else class="fas fa-paper-plane"></i>
          Subscribe
        </button>
      </div>
      <div v-if="emailError" class="form-error">
        {{ emailError }}
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useNotificationStore } from '@/store/notification'
import { subscribeToNewsletter } from '@/composables/useApi'

// Store
const notificationStore = useNotificationStore()

// Form state
const email = ref('')
const emailError = ref('')
const isLoading = ref(false)

// Validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Submit handler
const handleSubmit = async () => {
  // Reset errors
  emailError.value = ''
  
  // Validate email
  if (!email.value) {
    emailError.value = 'Email is required'
    return
  }
  
  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }
  
  // Submit
  isLoading.value = true
  
  try {
    await subscribeToNewsletter(email.value)
    
    // Success
    notificationStore.success('Successfully subscribed to our newsletter!')
    email.value = '' // Clear form
    
  } catch (error) {
    // Error
    notificationStore.error(
      error.response?.data?.message || 'Failed to subscribe. Please try again.'
    )
    
    // Set field error if it's a validation error
    if (error.response?.status === 400) {
      emailError.value = 'Please enter a valid email address'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.newsletter-form {
  width: 100%;
  max-width: 400px;

  &.loading {
    pointer-events: none;
  }
}

.input-group {
  display: flex;
  gap: $space-2;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.form-input {
  flex: 1;
  min-width: 0;
  font-size: $text-sm;
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }

  &:focus::placeholder {
    opacity: 0.5;
  }
}

.btn-submit {
  white-space: nowrap;
  font-size: $text-sm;
  padding: $space-3 $space-4;
  
  i {
    margin-right: $space-1;
    font-size: $text-xs;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
}

.form-error {
  margin-top: $space-2;
}

// Animation for spinning icon
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