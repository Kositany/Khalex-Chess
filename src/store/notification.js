import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])

  const addNotification = (notification) => {
    const id = Date.now()
    notifications.value.push({
      id,
      type: 'info',
      duration: 5000,
      ...notification
    })

    // Auto-remove after duration
    setTimeout(() => {
      removeNotification(id)
    }, notification.duration || 5000)

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const success = (message, duration) => {
    return addNotification({
      type: 'success',
      message,
      duration
    })
  }

  const error = (message, duration) => {
    return addNotification({
      type: 'error',
      message,
      duration: duration || 8000
    })
  }

  const warning = (message, duration) => {
    return addNotification({
      type: 'warning',
      message,
      duration
    })
  }

  const info = (message, duration) => {
    return addNotification({
      type: 'info',
      message,
      duration
    })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info
  }
})