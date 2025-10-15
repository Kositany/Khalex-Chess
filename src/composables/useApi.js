import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded')
    } else if (error.response?.status >= 500) {
      console.error('Server error')
    }
    return Promise.reject(error)
  }
)

// API functions

// Newsletter subscription
export const subscribeToNewsletter = async (email) => {
  const response = await api.post('/newsletter', { email })
  return response.data
}

// Contact form
export const sendContactMessage = async (formData) => {
  const response = await api.post('/contact', formData)
  return response.data
}

// Payment functions
export const initiatePayment = async (paymentData) => {
  const response = await api.post('/pay', paymentData)
  return response.data
}

export const checkPaymentStatus = async (checkoutRequestId) => {
  const response = await api.get(`/payment-status/${checkoutRequestId}`)
  return response.data
}

// Health check
export const checkServerHealth = async () => {
  const response = await api.get('/health')
  return response.data
}

export default api