<template>
  <div class="loading-spinner-overlay" v-if="isLoading">
    <div class="loading-spinner-container">
      <div class="chess-loader">
        <div class="chess-piece">
          <i class="fas fa-chess-king"></i>
        </div>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p v-if="loadingMessage" class="loading-message">{{ loadingMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/store/loading'

const loadingStore = useLoadingStore()
const { isLoading, loadingMessage } = storeToRefs(loadingStore)
</script>

<style lang="scss" scoped>
.loading-spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-modal + 10;
  backdrop-filter: blur(4px);
}

.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
}

.chess-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
}

.chess-piece {
  font-size: 3rem;
  color: var(--text-accent);
  animation: bounce 1.5s ease-in-out infinite;
}

.loading-dots {
  display: flex;
  gap: $space-1;

  span {
    width: 8px;
    height: 8px;
    background-color: var(--text-accent);
    border-radius: 50%;
    animation: loading-pulse 1.4s ease-in-out infinite both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }
}

.loading-message {
  color: var(--text-primary);
  font-size: $text-sm;
  text-align: center;
  margin: 0;
  max-width: 200px;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
}

@keyframes loading-pulse {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>