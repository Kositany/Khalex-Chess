import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from '@/composables/useGSAP'

import router from './router'
import App from './App.vue'
import './styles/main.scss'
import { useThemeStore } from '@/store/theme'

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger)

// Global GSAP configuration for performance
gsap.config({
  force3D: true,
  nullTargetWarn: false
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Initialize theme before mounting to avoid flash and ensure :root.dark variables
const themeStore = useThemeStore(pinia)
themeStore.initializeTheme()

// Initialize smooth scroll globally
let smoothScroll = null

// Global page transition system
const initPageTransitions = () => {
  router.beforeEach((to, from, next) => {
    if (from.name) {
      // Create page transition overlay
      const overlay = document.createElement('div')
      overlay.className = 'page-transition-overlay'
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.9) 50%, rgba(0,0,0,0.95) 100%);
        z-index: 9999;
        transform: scaleX(0);
        transform-origin: left center;
        pointer-events: none;
        backdrop-filter: blur(5px);
      `
      document.body.appendChild(overlay)
      
      // Animate overlay in
      gsap.to(overlay, {
        scaleX: 1,
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
          next()
          
          // Animate overlay out after route change
          setTimeout(() => {
            gsap.to(overlay, {
              scaleX: 0,
              duration: 0.6,
              ease: "power4.inOut",
              transformOrigin: "right center",
              onComplete: () => {
                overlay.remove()
              }
            })
          }, 100)
        }
      })
    } else {
      next()
    }
  })
}

// Initialize global animations
const initGlobalAnimations = async () => {
  const { initSmoothScroll } = useSmoothScroll()
  
  // Initialize smooth scroll
  smoothScroll = await initSmoothScroll()
  
  // Global scroll-triggered animations
  ScrollTrigger.batch(".animate-on-scroll", {
    onEnter: (elements) => {
      gsap.fromTo(elements, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95 
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out"
        }
      )
    },
    onLeave: (elements) => {
      gsap.to(elements, {
        opacity: 0.5,
        duration: 0.3
      })
    },
    onEnterBack: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        duration: 0.3
      })
    }
  })
  
  // Global enhanced interactions
  const addGlobalInteractions = () => {
    // Enhanced button hovers
    document.addEventListener('mouseenter', (e) => {
      if (e.target && e.target.closest && e.target.closest('.btn-enhanced, .btn')) {
        const btn = e.target.closest('.btn-enhanced, .btn')
        gsap.to(btn, {
          scale: 1.03,
          y: -2,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      // Card hovers
      if (e.target && e.target.closest && e.target.closest('.card-interactive, .product-card')) {
        const card = e.target.closest('.card-interactive, .product-card')
        gsap.to(card, {
          y: -8,
          rotationX: 3,
          scale: 1.01,
          duration: 0.4,
          ease: "power2.out",
          transformOrigin: "center bottom"
        })
      }
    }, true)
    
    document.addEventListener('mouseleave', (e) => {
      if (e.target && e.target.closest && e.target.closest('.btn-enhanced, .btn')) {
        const btn = e.target.closest('.btn-enhanced, .btn')
        gsap.to(btn, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      if (e.target && e.target.closest && e.target.closest('.card-interactive, .product-card')) {
        const card = e.target.closest('.card-interactive, .product-card')
        gsap.to(card, {
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })
      }
    }, true)
  }
  
  addGlobalInteractions()
}

// Global loading animation
const showLoadingAnimation = () => {
  const loader = document.createElement('div')
  loader.id = 'global-loader'
  loader.innerHTML = `
    <div class="loader-container">
      <div class="chess-loader">
        <div class="chess-piece-loader">♔</div>
        <div class="loader-text">Khalex Chess</div>
        <div class="loader-subtitle">Loading Experience...</div>
      </div>
    </div>
  `
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  
  // Add dynamic styles for loader
  const loaderCSS = document.createElement('style')
  loaderCSS.textContent = `
    .loader-container {
      text-align: center;
      color: #FFD700;
      transform: scale(0.8);
      opacity: 0;
    }
    
    .chess-piece-loader {
      font-size: 5rem;
      margin-bottom: 1.5rem;
      animation: chessPieceFloat 2.5s ease-in-out infinite;
      text-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
    }
    
    .loader-text {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      background: linear-gradient(45deg, #FFD700, #FFF200);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .loader-subtitle {
      font-size: 1rem;
      opacity: 0.8;
      letter-spacing: 1px;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes chessPieceFloat {
      0%, 100% { 
        transform: translateY(0px) rotate(0deg); 
        text-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
      }
      25% { 
        transform: translateY(-15px) rotate(90deg); 
        text-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
      }
      50% { 
        transform: translateY(-25px) rotate(180deg); 
        text-shadow: 0 0 50px rgba(255, 215, 0, 1);
      }
      75% { 
        transform: translateY(-15px) rotate(270deg); 
        text-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
      }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
  `
  
  document.head.appendChild(loaderCSS)
  document.body.appendChild(loader)
  
  // Animate loader in
  gsap.to('.loader-container', {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: "back.out(1.7)"
  })
  
  return loader
}

const hideLoadingAnimation = (loader) => {
  gsap.to(loader, {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: "power3.inOut",
    onComplete: () => {
      loader.remove()
    }
  })
}

// App initialization with enhanced loading
const initApp = async () => {
  const loader = showLoadingAnimation()
  
  try {
    // Initialize page transitions
    initPageTransitions()
    
    app.use(router)
    
    // Mount the app
    app.mount('#app')
    
    // Wait for initial render
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Initialize global animations
    await initGlobalAnimations()
    
    // Hide loader with animation
    setTimeout(() => {
      hideLoadingAnimation(loader)
    }, 1500)
    
  } catch (error) {
    console.error('App initialization error:', error)
    hideLoadingAnimation(loader)
  }
}

// Start the app
initApp()

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause()
  } else {
    gsap.globalTimeline.resume()
  }
})

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (smoothScroll && smoothScroll.destroy) {
    smoothScroll.destroy()
  }
  ScrollTrigger.killAll()
  gsap.killTweensOf("*")
})