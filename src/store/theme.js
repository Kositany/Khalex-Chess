import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('khalex-chess-theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    } else {
      // Default to dark mode as per brand requirements
      isDarkMode.value = true
    }
    updateTheme()
  }

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    updateTheme()
    localStorage.setItem('khalex-chess-theme', isDarkMode.value ? 'dark' : 'light')
  }

  const updateTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    isDarkMode,
    initializeTheme,
    toggleTheme
  }
})