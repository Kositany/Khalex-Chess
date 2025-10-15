<template>
  <form @submit.prevent="handleSubmit" class="contact-form" :class="{ 'loading': isLoading }">
    <h3>Send us a Message</h3>
    <p>Fill out the form below and we'll get back to you within 24 hours.</p>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Name *</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Your full name"
          class="form-input"
          :class="{ 'error': errors.name }"
          required
        >
        <div v-if="errors.name" class="form-error">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label class="form-label">Email *</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="your.email@example.com"
          class="form-input"
          :class="{ 'error': errors.email }"
          required
        >
        <div v-if="errors.email" class="form-error">{{ errors.email }}</div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Phone Number *</label>
      <input
        v-model="form.phone"
        type="tel"
        placeholder="254712345678"
        class="form-input"
        :class="{ 'error': errors.phone }"
        required
      >
      <div v-if="errors.phone" class="form-error">{{ errors.phone }}</div>
    </div>

    <div class="form-group">
      <label class="form-label">Message *</label>
      <textarea
        v-model="form.message"
        placeholder="Tell us about your chess training needs, questions, or how we can help you..."
        class="form-textarea"
        :class="{ 'error': errors.message }"
        rows="6"
        required
      ></textarea>
      <div v-if="errors.message" class="form-error">{{ errors.message }}</div>
    </div>

    <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading">
      <i v-if="isLoading" class="fas fa-spinner animate-spin"></i>
      <i v-else class="fas fa-paper-plane"></i>
      {{ isLoading ? 'Sending...' : 'Send Message' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useNotificationStore } from '@/store/notification'
import { sendContactMessage } from '@/composables/useApi'

// Store
const notificationStore = useNotificationStore()

// Form state
const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const errors = ref({})
const isLoading = ref(false)

// Validation
const validateForm = () => {
  errors.value = {}
  
  if (!form.name.trim()) {
    errors.value.name = 'Name is required'
  } else if (form.name.trim().length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
  }
  
  if (!form.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (!form.phone.trim()) {
    errors.value.phone = 'Phone number is required'
  } else if (!/^(\+254|254|0)[17]\d{8}$/.test(form.phone.replace(/\s/g, ''))) {
    errors.value.phone = 'Please enter a valid Kenyan phone number'
  }
  
  if (!form.message.trim()) {
    errors.value.message = 'Message is required'
  } else if (form.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters'
  }
  
  return Object.keys(errors.value).length === 0
}

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    await sendContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.replace(/\s/g, ''),
      message: form.message.trim()
    })
    
    // Success
    notificationStore.success('Message sent successfully! We\'ll get back to you soon.')
    
    // Reset form
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
    
  } catch (error) {
    // Error
    notificationStore.error(
      error.response?.data?.message || 'Failed to send message. Please try again.'
    )
    
    // Set field errors if it's a validation error
    if (error.response?.status === 400 && error.response?.data?.errors) {
      errors.value = error.response.data.errors.reduce((acc, err) => {
        const field = err.toLowerCase().includes('name') ? 'name' :
                     err.toLowerCase().includes('email') ? 'email' :
                     err.toLowerCase().includes('phone') ? 'phone' :
                     err.toLowerCase().includes('message') ? 'message' : null
        if (field) acc[field] = err
        return acc
      }, {})
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.contact-form {
  background-color: var(--bg-primary);
  border-radius: $radius-xl;
  padding: $space-8;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);

  &.loading {
    pointer-events: none;
    opacity: 0.7;
  }

  h3 {
    color: var(--text-primary);
    margin-bottom: $space-3;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: $space-8;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-4;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: $space-6;
}

.form-input,
.form-textarea {
  font-size: 16px; // Prevent zoom on iOS
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }

  &:focus::placeholder {
    opacity: 0.5;
  }
}

.btn {
  width: 100%;
  justify-content: center;

  i {
    margin-right: $space-2;
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

@media (max-width: 768px) {
  .contact-form {
    padding: $space-6;
  }
}
</style>