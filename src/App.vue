<template>
  <div id="app" :class="{ dark: isDarkMode }">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
    <LoadingSpinner v-if="isLoading" />
    <NotificationToast />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import NotificationToast from '@/components/ui/NotificationToast.vue'
import { useThemeStore } from '@/store/theme'
import { useLoadingStore } from '@/store/loading'

const themeStore = useThemeStore()
const loadingStore = useLoadingStore()

const { isDarkMode } = storeToRefs(themeStore)
const { isLoading } = storeToRefs(loadingStore)

// Theme initialized in main.js prior to mount to prevent FOUC
</script>

<style>
/* Global app styles will be in main.scss */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>