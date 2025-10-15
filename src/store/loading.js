import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  const loadingMessage = ref('')

  const setLoading = (loading, message = '') => {
    isLoading.value = loading
    loadingMessage.value = message
  }

  return {
    isLoading,
    loadingMessage,
    setLoading
  }
})