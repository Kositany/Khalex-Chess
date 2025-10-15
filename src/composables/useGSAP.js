import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
// Note: MorphSVGPlugin and SplitText are premium plugins - commenting out for now
// import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
// import { SplitText } from 'gsap/SplitText'
import { ref, onMounted, onUnmounted } from 'vue'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)
// gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin, SplitText)

// Global GSAP configuration for performance
gsap.config({
  force3D: true,
  nullTargetWarn: false
})

// Animation presets for consistency
export const ANIMATION_PRESETS = {
  // Entrance animations
  fadeInUp: {
    from: { opacity: 0, y: 60, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
  },
  
  fadeInScale: {
    from: { opacity: 0, scale: 0.8, rotation: -5 },
    to: { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
  },
  
  slideInLeft: {
    from: { opacity: 0, x: -100, rotationY: -45 },
    to: { opacity: 1, x: 0, rotationY: 0, duration: 1.5, ease: "power4.out" }
  },
  
  // Hover effects
  hoverLift: {
    scale: 1.05,
    y: -10,
    rotationX: 5,
    duration: 0.4,
    ease: "power2.out",
    transformOrigin: "center bottom"
  },
  
  hoverGlow: {
    boxShadow: "0 20px 40px rgba(255, 210, 0, 0.3)",
    duration: 0.3,
    ease: "power2.out"
  },
  
  // Scroll animations
  parallaxSlow: { yPercent: -50, ease: "none" },
  parallaxFast: { yPercent: -100, ease: "none" },
  
  // Text animations
  textReveal: {
    duration: 1.5,
    ease: "power3.out",
    stagger: 0.1
  }
}

// Main GSAP composable
export function useGSAP() {
  const animations = ref([])
  const timelines = ref([])
  
  // Create timeline with performance optimization
  const createTimeline = (options = {}) => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
      ...options
    })
    timelines.value.push(tl)
    return tl
  }
  
  // Batch animations for performance
  const batchAnimate = (selector, animation, options = {}) => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return null
    
    const tl = gsap.timeline()
    
    gsap.set(elements, animation.from || {})
    
    tl.to(elements, {
      ...animation.to,
      stagger: options.stagger || 0.1,
      scrollTrigger: options.scrollTrigger ? {
        trigger: options.scrollTrigger.trigger || selector,
        start: options.scrollTrigger.start || "top 80%",
        end: options.scrollTrigger.end || "bottom 20%",
        toggleActions: "play none none reverse",
        ...options.scrollTrigger
      } : undefined
    })
    
    animations.value.push(tl)
    return tl
  }
  
  // Cinematic entrance animation
  const cinematicEntrance = (containerSelector) => {
    const tl = createTimeline()
    
    // Background reveal
    tl.fromTo(`${containerSelector} .bg-reveal`, 
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.5, ease: "power4.inOut" }
    )
    
    // Main content staggered entrance
    tl.fromTo(`${containerSelector} .animate-entrance`,
      { opacity: 0, y: 100, rotationX: 45 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.8"
    )
    
    return tl
  }
  
  // Floating animation for chess pieces
  const createFloatingAnimation = (selector, options = {}) => {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach((element, index) => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      
      tl.to(element, {
        y: options.amplitude || 20,
        rotation: options.rotation || 5,
        duration: options.duration || 3 + (index * 0.5),
        ease: "sine.inOut",
        delay: index * 0.3
      })
    })
  }
  
  // Parallax scroll effect
  const createParallax = (selector, speed = 0.5) => {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach(element => {
      gsap.to(element, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    })
  }
  
  // Morphing text effect
  const morphText = (selector, texts, options = {}) => {
    const element = document.querySelector(selector)
    if (!element) return
    
    const tl = gsap.timeline({ repeat: -1 })
    
    texts.forEach((text, index) => {
      tl.to(element, {
        duration: 0.5,
        text: text,
        ease: "none",
        delay: options.delay || 2
      })
    })
    
    return tl
  }
  
  // Advanced scroll-triggered animation
  const scrollReveal = (selector, options = {}) => {
    return gsap.fromTo(selector,
      {
        opacity: 0,
        y: options.distance || 100,
        scale: options.scale || 0.95,
        rotation: options.rotation || 0
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: options.duration || 1.5,
        ease: options.ease || "power3.out",
        stagger: options.stagger || 0.1,
        scrollTrigger: {
          trigger: options.trigger || selector,
          start: options.start || "top 85%",
          end: options.end || "bottom 15%",
          toggleActions: "play none none reverse",
          ...options.scrollTrigger
        }
      }
    )
  }
  
  // Interactive hover animations
  const addHoverAnimation = (selector, enterAnimation, leaveAnimation) => {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, enterAnimation)
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, leaveAnimation || { 
          scale: 1, 
          y: 0, 
          rotationX: 0,
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out" 
        })
      })
    })
  }
  
  // Page transition animation
  const pageTransition = (direction = 'forward') => {
    const tl = createTimeline()
    
    if (direction === 'forward') {
      tl.to('.page-transition', {
        scaleX: 1,
        duration: 0.6,
        ease: "power4.inOut",
        transformOrigin: "left center"
      })
      .to('.page-transition', {
        scaleX: 0,
        duration: 0.6,
        ease: "power4.inOut",
        transformOrigin: "right center",
        delay: 0.2
      })
    }
    
    return tl
  }
  
  // Cleanup function
  const cleanup = () => {
    animations.value.forEach(animation => {
      if (animation && animation.kill) {
        animation.kill()
      }
    })
    
    timelines.value.forEach(timeline => {
      if (timeline && timeline.kill) {
        timeline.kill()
      }
    })
    
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    animations.value = []
    timelines.value = []
  }
  
  // Split text function (free alternative to SplitText)
  const splitText = (element, options = {}) => {
    if (!element) return { words: [], chars: [], lines: [] }
    
    const text = element.textContent || element.innerText
    const wordClass = options.wordClass || 'word'
    const charClass = options.charClass || 'char'
    
    // Split into words and characters
    const words = text.split(' ')
    let html = ''
    const wordElements = []
    const charElements = []
    
    words.forEach((word, wordIndex) => {
      html += `<span class="${wordClass}" style="display: inline-block;">`
      
      for (let i = 0; i < word.length; i++) {
        html += `<span class="${charClass}" style="display: inline-block;">${word[i]}</span>`
      }
      
      html += '</span>'
      if (wordIndex < words.length - 1) html += ' '
    })
    
    element.innerHTML = html
    
    // Get references to created elements
    const wordEls = element.querySelectorAll(`.${wordClass}`)
    const charEls = element.querySelectorAll(`.${charClass}`)
    
    return {
      words: Array.from(wordEls),
      chars: Array.from(charEls),
      lines: [] // Could implement line splitting if needed
    }
  }
  
  // Magnetic hover effect
  const enableMagneticHover = (selector, options = {}) => {
    const elements = document.querySelectorAll(selector)
    const strength = options.strength || 0.5
    const scale = options.scale || 1.1
    const rotate = options.rotate || 5
    
    elements.forEach(element => {
      let isHovering = false
      
      const handleMouseMove = (e) => {
        if (!isHovering) return
        
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength
        
        gsap.to(element, {
          x: deltaX,
          y: deltaY,
          scale: scale,
          rotation: (deltaX / rect.width) * rotate,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      const handleMouseEnter = () => {
        isHovering = true
        gsap.to(element, {
          scale: scale,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      const handleMouseLeave = () => {
        isHovering = false
        gsap.to(element, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "power2.out"
        })
      }
      
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
      
      // Store cleanup function
      element._magneticCleanup = () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }

  // Auto cleanup on unmount
  onUnmounted(() => {
    cleanup()
  })
  
  return {
    // Core functions
    createTimeline,
    batchAnimate,
    cinematicEntrance,
    createFloatingAnimation,
    createParallax,
    morphText,
    scrollReveal,
    addHoverAnimation,
    pageTransition,
    splitText,
    enableMagneticHover,
    cleanup,
    
    // Utilities
    gsap,
    ScrollTrigger,
    animations,
    timelines,
    ANIMATION_PRESETS
  }
}

// Smooth scroll composable with Lenis integration
export function useSmoothScroll() {
  let lenis = null
  
  const initSmoothScroll = async () => {
    try {
      const { default: Lenis } = await import('@studio-freight/lenis')
      
      if (lenis) {
        return lenis
      }
      
      lenis = new Lenis({
        duration: 0.7,
        easing: (t) => t,
        smoothWheel: true,
        smoothTouch: false,
        normalizeWheel: true
      })
      
      // Integrate with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      
      gsap.ticker.lagSmoothing(1000, 16)
      
      return lenis
    } catch (error) {
      console.warn('Lenis not available, falling back to native scroll')
      return null
    }
  }
  
  const scrollTo = (target, options = {}) => {
    if (lenis) {
      lenis.scrollTo(target, {
        duration: options.duration || 2,
        easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        ...options
      })
    } else {
      // Fallback to native smooth scroll
      const element = typeof target === 'string' ? document.querySelector(target) : target
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
  
  const destroy = () => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
  }
  
  onUnmounted(() => {
    destroy()
  })
  
  return {
    initSmoothScroll,
    scrollTo,
    destroy,
    getInstance: () => lenis
  }
}