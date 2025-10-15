<template>
  <header class="app-header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <nav class="nav-main">
        <!-- Logo/Brand -->
        <router-link to="/" class="brand" @click="closeMobileMenu">
          <div class="brand-content">
            <i class="fas fa-chess-king brand-icon"></i>
            <div class="brand-text">
              <span class="brand-name">Khalex Chess</span>
              <span class="brand-tagline">Unleash Young Minds</span>
            </div>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="nav-links desktop-only">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
          <router-link to="/shop" class="nav-link" active-class="active">Shop</router-link>
          <router-link to="/contact" class="nav-link" active-class="active">Contact</router-link>
        </div>

        <!-- Header Actions -->
        <div class="header-actions">
          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme" 
            class="btn btn-ghost btn-icon theme-toggle"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            aria-label="Toggle theme"
          >
            <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>

          <!-- Cart -->
          <router-link to="/shop" class="btn btn-ghost btn-icon cart-btn" title="Shopping Cart" @click="closeMobileMenu">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </router-link>

          <!-- Mobile Menu Toggle -->
          <button 
            @click="toggleMobileMenu" 
            class="mobile-menu-toggle mobile-only"
            aria-label="Toggle mobile menu"
            :class="{ 'active': isMobileMenuOpen }"
          >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Navigation Overlay -->
    <transition name="mobile-overlay">
      <div v-if="isMobileMenuOpen" class="mobile-overlay mobile-only" @click="closeMobileMenu">
        <nav class="mobile-nav" @click.stop>
          <div class="mobile-nav-header">
            <div class="mobile-brand">
              <i class="fas fa-chess-king"></i>
              <span>Khalex Chess</span>
            </div>
            <button @click="closeMobileMenu" class="mobile-close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="mobile-nav-content">
            <router-link 
              to="/" 
              class="mobile-nav-link" 
              @click="closeMobileMenu"
              active-class="active"
            >
              <div class="mobile-nav-icon">
                <i class="fas fa-home"></i>
              </div>
              <div class="mobile-nav-text">
                <span class="nav-title">Home</span>
                <span class="nav-subtitle">Main page</span>
              </div>
              <i class="fas fa-chevron-right nav-arrow"></i>
            </router-link>
            
            <router-link 
              to="/about" 
              class="mobile-nav-link" 
              @click="closeMobileMenu"
              active-class="active"
            >
              <div class="mobile-nav-icon">
                <i class="fas fa-info-circle"></i>
              </div>
              <div class="mobile-nav-text">
                <span class="nav-title">About</span>
                <span class="nav-subtitle">Our story</span>
              </div>
              <i class="fas fa-chevron-right nav-arrow"></i>
            </router-link>
            
            <router-link 
              to="/shop" 
              class="mobile-nav-link" 
              @click="closeMobileMenu"
              active-class="active"
            >
              <div class="mobile-nav-icon">
                <i class="fas fa-store"></i>
              </div>
              <div class="mobile-nav-text">
                <span class="nav-title">Shop</span>
                <span class="nav-subtitle">Chess products</span>
              </div>
              <div class="nav-badge" v-if="cartCount > 0">{{ cartCount }}</div>
              <i class="fas fa-chevron-right nav-arrow"></i>
            </router-link>
            
            <router-link 
              to="/contact" 
              class="mobile-nav-link" 
              @click="closeMobileMenu"
              active-class="active"
            >
              <div class="mobile-nav-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="mobile-nav-text">
                <span class="nav-title">Contact</span>
                <span class="nav-subtitle">Get in touch</span>
              </div>
              <i class="fas fa-chevron-right nav-arrow"></i>
            </router-link>
          </div>

          <div class="mobile-nav-footer">
            <div class="theme-switch">
              <span class="theme-label">{{ isDarkMode ? 'Dark' : 'Light' }} Mode</span>
              <button @click="toggleTheme" class="theme-toggle-mobile">
                <i :class="isDarkMode ? 'fas fa-moon' : 'fas fa-sun'"></i>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme'
import { useCartStore } from '@/store/cart'

// Stores
const themeStore = useThemeStore()
const cartStore = useCartStore()

// Store refs
const { isDarkMode } = storeToRefs(themeStore)
const { cartCount } = storeToRefs(cartStore)

// Local state
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

// Computed properties
const scrollThreshold = 50

// Methods
const toggleTheme = () => {
  themeStore.toggleTheme()
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > scrollThreshold
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  cartStore.loadCart() // Load cart from localStorage
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = '' // Cleanup
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(var(--bg-primary-rgb), 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: $z-fixed;
  transition: all $duration-base $ease-out;

  &.header-scrolled {
    background-color: rgba(var(--bg-primary-rgb), 0.98);
    box-shadow: var(--shadow);
  }
}

.nav-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space-4 0;
  min-height: 70px;
}

.brand {
  text-decoration: none;
  color: inherit;
  transition: transform $duration-base $ease-out;

  &:hover {
    transform: scale(1.02);
  }

  .brand-content {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  .brand-icon {
    font-size: $text-2xl;
    color: var(--text-accent);
  }

  .brand-text {
    display: flex;
    flex-direction: column;

    .brand-name {
      font-family: $font-display;
      font-size: $text-xl;
      font-weight: $font-bold;
      color: var(--text-primary);
      line-height: 1;
    }

    .brand-tagline {
      font-size: $text-xs;
      color: var(--text-secondary);
      line-height: 1;
    }
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: $space-12; // Increased from $space-8 for better spacing on large screens

  @media (min-width: 1200px) {
    gap: $space-16; // Even more space on very large screens
  }

  .nav-link {
    position: relative;
    color: var(--text-secondary);
    font-weight: $font-medium;
    text-decoration: none;
    padding: $space-2 $space-3; // Added horizontal padding for larger touch targets
    transition: color $duration-base $ease-out;

    &:hover,
    &.active {
      color: var(--text-accent);
    }

    &.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--text-accent);
      border-radius: 1px;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: $space-2;
}

.theme-toggle {
  i {
    transition: transform $duration-base $ease-out;
  }

  &:hover i {
    transform: rotate(15deg) scale(1.1);
  }
}

.cart-btn {
  position: relative;

  .cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background-color: var(--text-accent);
    color: $black;
    font-size: $text-xs;
    font-weight: $font-bold;
    padding: 2px 6px;
    border-radius: $radius-full;
    min-width: 18px;
    text-align: center;
    line-height: 1;
  }
}

/* Perfectly spaced mobile hamburger menu */
.mobile-menu-toggle {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between; /* <--- evenly spaces lines */
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding:  10px;
//   width: 40px;         /* width of hamburger */
//   height: 36px;        /* height of container */
  transition: background-color 0.3s ease-out;
}

.hamburger-line {
  display: block;
  margin-bottom: 0.4rem;
  width: 29px;         /* line width */
  height: 3px;         /* line thickness */
  background-color: var(--text-accent); /* gold/accent color */
  border-radius: 2px;
  transition: all 0.3s ease-out;
  transform-origin: center;
  color: var(--text-primary);
}

/* Active X Animation */
.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}

/* Optional hover effect */
.mobile-menu-toggle:hover .hamburger-line {
  transform: scaleX(1.1);
}


// Mobile navigation overlay
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: $z-modal-backdrop;
  backdrop-filter: blur(5px);
}

.mobile-nav {
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(85vw, 400px);
  background-color: var(--bg-primary);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: $z-modal;
}

.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space-6;
  border-bottom: 1px solid var(--border-color);

  .mobile-brand {
    display: flex;
    align-items: center;
    gap: $space-3;
    font-family: $font-display;
    font-weight: $font-bold;
    font-size: $text-lg;
    color: var(--text-primary);

    i {
      color: var(--text-accent);
      font-size: $text-xl;
    }
  }

  .mobile-close-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    color: var(--text-secondary);
    font-size: $text-lg;
    cursor: pointer;
    border-radius: $radius-lg;
    transition: all $duration-base $ease-out;

    &:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }
  }
}

.mobile-nav-content {
  flex: 1;
  padding: $space-4 0;
  overflow-y: auto;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: $space-4 $space-6;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all $duration-base $ease-out;
  min-height: 72px;
  position: relative;

  &:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    
    .nav-arrow {
      transform: translateX(4px);
    }
  }

  &.active {
    background-color: rgba(var(--text-accent), 0.1);
    color: var(--text-accent);
    border-right: 3px solid var(--text-accent);

    .mobile-nav-icon {
      background-color: var(--text-accent);
      color: $black;
    }
  }

  .mobile-nav-icon {
    width: 44px;
    height: 44px;
    border-radius: $radius-xl;
    background-color: var(--bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: $space-4;
    transition: all $duration-base $ease-out;

    i {
      font-size: $text-lg;
    }
  }

  .mobile-nav-text {
    flex: 1;
    display: flex;
    flex-direction: column;

    .nav-title {
      font-weight: $font-medium;
      font-size: $text-base;
      line-height: 1.2;
    }

    .nav-subtitle {
      font-size: $text-sm;
      color: var(--text-secondary);
      opacity: 0.8;
    }
  }

  .nav-badge {
    background-color: var(--text-accent);
    color: $black;
    font-size: $text-xs;
    font-weight: $font-bold;
    padding: 4px 8px;
    border-radius: $radius-full;
    margin-right: $space-2;
  }

  .nav-arrow {
    color: var(--text-secondary);
    font-size: $text-sm;
    transition: transform $duration-base $ease-out;
    opacity: 0.6;
  }
}

.mobile-nav-footer {
  padding: $space-6;
  border-top: 1px solid var(--border-color);

  .theme-switch {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .theme-label {
      font-weight: $font-medium;
      color: var(--text-primary);
    }

    .theme-toggle-mobile {
      width: 44px;
      height: 44px;
      border: none;
      background-color: var(--bg-secondary);
      color: var(--text-accent);
      border-radius: $radius-xl;
      cursor: pointer;
      transition: all $duration-base $ease-out;

      &:hover {
        background-color: var(--text-accent);
        color: $black;
        transform: scale(1.05);
      }

      i {
        font-size: $text-lg;
      }
    }
  }
}

// Mobile navigation transitions
.mobile-overlay-enter-active,
.mobile-overlay-leave-active {
  transition: all $duration-base $ease-out;
}

.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
  opacity: 0;
}

.mobile-overlay-enter-active .mobile-nav,
.mobile-overlay-leave-active .mobile-nav {
  transition: transform $duration-base $ease-out;
}

.mobile-overlay-enter-from .mobile-nav,
.mobile-overlay-leave-to .mobile-nav {
  transform: translateX(100%);
}

// Responsive breakpoints
@media (min-width: 769px) {
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .nav-main {
    padding: $space-3 0;
    min-height: 60px;
  }

  .brand {
    .brand-icon {
      font-size: $text-xl;
    }

    .brand-text {
      .brand-name {
        font-size: $text-lg;
      }

      .brand-tagline {
        font-size: 10px;
      }
    }
  }

  .header-actions {
    gap: $space-1;
  }
}

// Extra small screens (375px and smaller)
@media (max-width: 375px) {
  .brand-text .brand-tagline {
    display: none;
  }
  
  .brand .brand-content {
    gap: $space-2;
  }
  
  .brand-icon {
    font-size: $text-lg !important;
  }
  
  .brand-name {
    font-size: $text-base !important;
  }
  
  .mobile-nav {
    width: 100vw;
  }
  
  .nav-main {
    padding: $space-2 0;
    min-height: 56px;
  }
}

// Very large mobile screens
@media (min-width: 426px) and (max-width: 768px) {
  .mobile-nav {
    width: min(75vw, 350px);
  }
}

// Touch-friendly targets
@media (hover: none) and (pointer: coarse) {
  .mobile-nav-link {
    min-height: 80px;
    padding: $space-5 $space-6;
  }
  
  .mobile-menu-toggle {
    width: 48px;
    height: 48px;
  }
  
  .theme-toggle,
  .cart-btn {
    width: 48px;
    height: 48px;
  }
}
</style>