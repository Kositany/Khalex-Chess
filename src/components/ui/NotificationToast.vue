<template>
  <teleport to="body">
    <div class="notification-container">
      <transition-group name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'notification',
            'toast',
            `toast-${notification.type}`
          ]"
        >
          <div class="notification-content">
            <div class="notification-icon">
              <i :class="getIcon(notification.type)"></i>
            </div>
            <div class="notification-message">
              {{ notification.message }}
            </div>
            <button
              @click="removeNotification(notification.id)"
              class="notification-close"
              aria-label="Close notification"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/store/notification'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)
const { removeNotification } = notificationStore

const getIcon = (type) => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  }
  return icons[type] || icons.info
}
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  top: 80px;
  right: $space-4;
  z-index: $z-toast;
  display: flex;
  flex-direction: column;
  gap: $space-3;
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    top: 70px;
    right: $space-2;
    left: $space-2;
    max-width: none;
  }
}

.notification {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: $radius-lg;
  box-shadow: $shadow-xl;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
  }

  &.toast-success::before {
    background-color: $success;
  }

  &.toast-error::before {
    background-color: $error;
  }

  &.toast-warning::before {
    background-color: $warning;
  }

  &.toast-info::before {
    background-color: $info;
  }
}

.notification-content {
  display: flex;
  align-items: flex-start;
  gap: $space-3;
  padding: $space-4;
}

.notification-icon {
  margin-top: 2px;
  
  .toast-success & i { color: $success; }
  .toast-error & i { color: $error; }
  .toast-warning & i { color: $warning; }
  .toast-info & i { color: $info; }
}

.notification-message {
  flex: 1;
  color: var(--text-primary);
  font-size: $text-sm;
  line-height: 1.5;
}

.notification-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $radius-sm;
  transition: all $duration-fast $ease-out;

  &:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
  }

  i {
    font-size: $text-xs;
  }
}

// Transition animations
.notification-enter-active,
.notification-leave-active {
  transition: all $duration-base $ease-out;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform $duration-base $ease-out;
}

// Responsive adjustments
@media (max-width: 480px) {
  .notification-content {
    padding: $space-3;
    gap: $space-2;
  }

  .notification-message {
    font-size: $text-xs;
  }
}
</style>