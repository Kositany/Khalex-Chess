<template>
  <section class="hero-section" ref="heroSection">
    <div class="hero-background">
      <img
        class="bg-image"
        src="@/assets/1628356484751.jpeg"
        alt="Immersive chess mentorship session"
      >

      <div class="hero-aurora">
        <span class="aurora-layer aurora-1" data-parallax-depth="0.15"></span>
        <span class="aurora-layer aurora-2" data-parallax-depth="0.25"></span>
        <span class="aurora-layer aurora-3" data-parallax-depth="0.4"></span>
      </div>

      <div class="grid-overlay"></div>
      <div class="hero-orb orb-1"></div>
      <div class="hero-orb orb-2"></div>
      <div class="hero-orb orb-3"></div>
      <div class="noise-overlay"></div>
    </div>

    <div class="container hero-shell">
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-eyebrow animate-entrance">
            Unleash Young Minds' Potential Through Chess
          </span>

          <h1 class="hero-title" ref="headlineRef">
  <span class="title-line">Start Your Chess Journey.</span>
  <span class="title-line title-highlight" data-text="At Khalex Chess.">At Khalex Chess.</span>
</h1>

<p class="hero-subtitle animate-entrance" ref="subtitleRef">
  We train young thinkers to outplay, outsmart,
  and outgrow the competition—on the board and in life.
</p>

<div class="hero-badges">
  <div class="hero-badge glass-badge animate-entrance">
    <i class="fas fa-chess-knight"></i>
    Built for kids who dare to win.
  </div>
  <div class="hero-badge glass-badge animate-entrance">
    <i class="fas fa-users"></i>
    Top coaches. Proven champions.
  </div>
</div>



          <div class="hero-actions hero-magnetic">
            <router-link to="/contact" class="hero-btn btn-primary interactive-btn">
              <span class="btn-glow"></span>
              <span class="btn-label">
                <i class="fas fa-rocket-launch"></i>
                Start My Journey
              </span>
            </router-link>

            <router-link to="/about" class="hero-btn btn-ghost interactive-btn">
              <span class="btn-label">
                <i class="fas fa-chess-knight"></i>
                Discover Our Method
              </span>
            </router-link>

            <button type="button" class="hero-btn btn-outline interactive-btn" @click="scrollToShop">
              <span class="btn-label">
                <i class="fas fa-store"></i>
                Explore the Pro Shop
              </span>
            </button>
          </div>

          <div class="hero-stat-grid">
            <div class="hero-stat-card">
              <span class="stat-label">Learners Elevated</span>
              <span class="stat-value" ref="statNumber1">0</span>
              <span class="stat-footnote">Powered by weekly performance labs</span>
            </div>
            <div class="hero-stat-card">
              <span class="stat-label">Competitive Events</span>
              <span class="stat-value" ref="statNumber2">0</span>
              <span class="stat-footnote">Curated & officiated across Kenya</span>
            </div>
            <div class="hero-stat-card">
              <span class="stat-label">Years Crafting Strategy</span>
              <span class="stat-value" ref="statNumber3">0</span>
              <span class="stat-footnote">Mentored by FIDE-certified coaches</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-visual-card" ref="visualCard">
            <div class="visual-header">
              <span class="badge-gradient">
                <i class="fas fa-graduation-cap"></i>
                Signature Mastery Pathway
              </span>
              <span class="header-meta">
                <i class="fas fa-clock"></i>
                12-week immersive sprints
              </span>
            </div>

            <div class="visual-board" data-parallax-depth="0.3">
              <div class="board-grid">
                <div class="square light"><span>♔</span></div>
                <div class="square dark"><span>♘</span></div>
                <div class="square light"><span>♕</span></div>
                <div class="square dark"><span>♗</span></div>
                <div class="square light"><span>♖</span></div>
                <div class="square dark"><span>♙</span></div>
              </div>
              <div class="board-overlay"></div>
            </div>

            <ul class="visual-list">
  <li>
    <i class="fas fa-chess-knight"></i>
    Strong fundamentals, move by move.
  </li>
  <li>
    <i class="fas fa-users"></i>
    Expert coaches, personal mentorship.
  </li>
  <li>
    <i class="fas fa-brain"></i>
    Puzzles, analysis, mindset training.
  </li>
  <li>
    <i class="fas fa-bullseye"></i>
    Clear levels, measurable progress.
  </li>
  <li>
    <i class="fas fa-trophy"></i>
    Real tournaments, real confidence.
  </li>
</ul>

          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator animate-entrance" data-delay="2.5">
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
      <span>Scroll to witness the mastery journey</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGSAP } from '@/composables/useGSAP'

const heroSection = ref(null)
const headlineRef = ref(null)
const subtitleRef = ref(null)
const visualCard = ref(null)
const statNumber1 = ref(null)
const statNumber2 = ref(null)
const statNumber3 = ref(null)

const {
  createTimeline,
  createFloatingAnimation,
  splitText,
  enableMagneticHover,
  gsap
} = useGSAP()

const router = useRouter()

const scrollToShop = () => {
  router.push('/shop')
}

onMounted(() => {
  // Optimized performance-first GSAP animations
  // Set will-change properties for hardware acceleration
  gsap.set(['.aurora-layer', '.hero-orb', '[data-parallax-depth]', '.hero-visual-card'], {
    willChange: 'transform'
  })

  const { words, chars } = splitText(headlineRef.value, {
    wordClass: 'hero-word',
    charClass: 'hero-char'
  })

  // Main entrance timeline with optimized performance
  const heroTimeline = createTimeline({ 
    delay: 0.15,
    onComplete: () => {
      // Remove will-change after animations complete
      gsap.set('.aurora-layer', { willChange: 'auto' })
    }
  })

  // Aurora layers with simpler transforms for better performance
  heroTimeline.from('.aurora-layer', {
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: 'power2.out',
    stagger: 0.1
  })

  // Optimized text animations - fewer elements animating simultaneously
  if (words.length) {
    heroTimeline.from(words, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.05
    }, '-=0.8')
  }

  // Simplified char animation with reduced stagger for performance
  if (chars.length > 0 && chars.length < 50) { // Only animate chars if reasonable count
    heroTimeline.from(chars, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.01
    }, '-=0.6')
  }

  // Batch smaller elements for better performance
  const smallElements = [
    { selector: subtitleRef.value, delay: '-=0.4' },
    { selector: '.hero-badge', delay: '-=0.3' },
    { selector: '.hero-actions .hero-btn', delay: '-=0.2' },
    { selector: '.hero-stat-card', delay: '-=0.1' }
  ]

  smallElements.forEach(({ selector, delay }) => {
    if (selector) {
      heroTimeline.from(selector, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08
      }, delay)
    }
  })

  // Optimized magnetic hover with reduced complexity
  enableMagneticHover('.hero-btn', {
    strength: 0.3,
    scale: 1.05,
    rotate: 3
  })

  // Simplified floating animation with better performance
  createFloatingAnimation('.hero-orb', {
    amplitude: 15,
    rotation: 4,
    duration: 8 // Slower = smoother
  })

  // Throttled parallax for better scroll performance
  let ticking = false
  const updateParallax = () => {
    const parallaxLayers = document.querySelectorAll('[data-parallax-depth]')
    parallaxLayers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.parallaxDepth) || 0.3
      gsap.to(layer, {
        yPercent: depth * -15, // Reduced movement for smoothness
        ease: 'none',
        duration: 0.1,
        scrollTrigger: {
          trigger: heroSection.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 1, // Smooth scrub value
          onUpdate: () => {
            if (!ticking) {
              requestAnimationFrame(() => {
                ticking = false
              })
              ticking = true
            }
          }
        }
      })
    })
  }

  updateParallax()

  // Simplified visual card animation
  if (visualCard.value) {
    gsap.fromTo(
      visualCard.value,
      { 
        opacity: 0, 
        y: 30,
        rotationX: 5,
        rotationY: -3,
        transformPerspective: 1000
      },
      { 
        opacity: 1, 
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.5
      }
    )

    // Lighter scroll-based card animation
    gsap.to(visualCard.value, {
      rotationY: 4,
      rotationX: -2,
      y: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 2 // Smoother scrub
      }
    })
  }

  // Optimized counter animation with better performance
  const animateCounter = (element, target, suffix = '+') => {
    if (!element) return
    
    const counter = { value: 0 }
    gsap.to(counter, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      delay: 0.8,
      onUpdate: () => {
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          element.textContent = `${Math.round(counter.value).toLocaleString()}${suffix}`
        })
      }
    })
  }

  animateCounter(statNumber1.value, 720)
  animateCounter(statNumber2.value, 68)
  animateCounter(statNumber3.value, 6)
})
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  padding: clamp($space-16, 12vh, $space-24) 0 $space-12;
  color: var(--text-primary);
  overflow: hidden;
  // Hardware acceleration for smoother performance
  transform: translateZ(0);
  will-change: scroll-position;
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
  // Optimize layer compositing
  transform: translateZ(0);
}

.bg-image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  transform: translate(-50%, -50%) scale(1.08);
  object-fit: cover;
  filter: brightness(0.5) contrast(1.2) saturate(1.1);
  transition: transform 0.3s ease-out;
  // Hardware acceleration
  will-change: transform;
  transform-style: preserve-3d;

  :root.light & {
    filter: brightness(0.78) contrast(1.05) saturate(0.95);
  }
}

.hero-aurora {
  position: absolute;
  inset: -20% -20% auto -20%;
  height: 140%;
  width: 140%;
  filter: blur(60px); // Reduced blur for better performance
  mix-blend-mode: screen;
  pointer-events: none;
  // Optimize compositing
  transform: translateZ(0);
}

.aurora-layer {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.6;
  transform: rotate(25deg);
  background: radial-gradient(circle at center, rgba(212, 175, 55, 0.3) 0%, rgba(204, 119, 153, 0.2) 55%, transparent 100%);
  // Hardware acceleration for smooth animation
  will-change: transform, opacity;
  transform-style: preserve-3d;

  &.aurora-1 {
    transform: translate(-10%, -20%) rotate(15deg);
    background: radial-gradient(circle at center, rgba(212, 160, 55, 0.4) 0%, rgba(76, 110, 255, 0.25) 55%, transparent 100%);
  }

  &.aurora-2 {
    transform: translate(35%, 10%) rotate(-18deg);
    background: radial-gradient(circle at center, rgba(110, 213, 255, 0.35) 0%, rgba(212, 175, 55, 0.25) 70%, transparent 100%);
  }

  &.aurora-3 {
    transform: translate(-25%, 25%) rotate(32deg);
    background: radial-gradient(circle at center, rgba(204, 119, 153, 0.3) 0%, rgba(97, 244, 197, 0.2) 60%, transparent 100%);
  }
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.3;
  mix-blend-mode: screen;
  // Optimize background rendering
  will-change: auto;
}

.hero-orb {
  position: absolute;
  width: clamp(10rem, 18vw, 16rem);
  height: clamp(10rem, 18vw, 16rem);
  border-radius: 50%;
  filter: blur(0.4rem); // Reduced blur
  opacity: 0.45;
  background: radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.5), rgba(255, 255, 255, 0) 70%);
  // Hardware acceleration for floating animation
  will-change: transform;
  transform-style: preserve-3d;

  &.orb-1 {
    top: 10%;
    left: 8%;
  }

  &.orb-2 {
    top: 55%;
    right: 6%;
  }

  &.orb-3 {
    bottom: 10%;
    left: 20%;
  }
}

.noise-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Cfilter id="n" x="0" y="0" width="1" height="1"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="120" height="120" filter="url(%23n)" opacity="0.15"/%3E%3C/svg%3E');
  mix-blend-mode: soft-light;
  pointer-events: none;
  // Lighter noise for better performance
  opacity: 0.6;
}

.hero-shell {
  position: relative;
  z-index: 3;
}

.hero-content {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp($space-10, 6vw, $space-16);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: $space-6;
  max-width: 680px;
}

.hero-eyebrow {
  font-size: $text-sm;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  font-weight: $font-semibold;
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  mix-blend-mode: screen;

  :root.light & {
    color: rgba(26, 26, 26, 0.65);
  }
}

.hero-title {
  font-family: $font-display;
  font-size: clamp(2.8rem, 6vw, 5rem);
  line-height: 1.05;
  display: flex;
  flex-direction: column;
  gap: $space-1;
  perspective: 1200px;
}

.title-line {
  display: inline-block;
}

.title-highlight {
  background: linear-gradient(135deg, #d4af37 0%, #f7dc6f 25%, #e67e22 50%, #c0392b 75%, #8e44ad 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 8px 28px rgba(212, 175, 55, 0.35);
  // Enhanced gradient animation
  background-size: 200% auto;
  animation: gradientShift 3s ease-in-out infinite;
  // Add a subtle glow effect
  position: relative;
  
  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(135deg, #d4af37 0%, #f7dc6f 25%, #e67e22 50%, #c0392b 75%, #8e44ad 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: blur(3px);
    opacity: 0.5;
    z-index: -1;
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-word,
.hero-char {
  display: inline-block;
  // Only set will-change during animation, removed after
  transform-style: preserve-3d;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  max-width: 560px;
  // Hardware acceleration for smoother text rendering
  transform: translateZ(0);

  :root.light & {
    color: rgba(26, 26, 26, 0.7);
  }
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  padding: $space-3 $space-4;
  border-radius: $radius-full;
  font-size: $text-sm;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  color: rgba(255, 255, 255, 0.9);

  i {
    color: #d4af37;
  }

  :root.light & {
    background: rgba(255, 255, 255, 0.75);
    border-color: rgba(0, 0, 0, 0.05);
    color: rgba(26, 26, 26, 0.78);
  }
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
}

.hero-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: $space-3;
  padding: $space-3 $space-5;
  border-radius: $radius-full;
  font-weight: $font-semibold;
  letter-spacing: 0.01em;
  overflow: hidden;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  // Hardware acceleration for magnetic hover
  transform: translateZ(0);
  backface-visibility: hidden;

  i {
    font-size: $text-base;
  }

  .btn-label {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    z-index: 2;
    // Optimize text rendering
    transform: translateZ(0);
  }

  .btn-glow {
    position: absolute;
    inset: -40%;
    background: radial-gradient(circle at center, rgba(212, 175, 55, 0.4), transparent 70%);
    filter: blur(20px); // Reduced blur for better performance
    opacity: 0.6;
    // Optimize glow rendering
    transform: translateZ(0);
  }

  // Optimized hover states
  &:hover {
    transform: translateY(-1px) translateZ(0);
  }
}

.btn-primary {
  background: linear-gradient(135deg, #d4af37 0%, #e6944d 50%, #cc7799 100%);
  color: #1a1a1a;
  box-shadow: 0 25px 60px rgba(204, 119, 153, 0.25);
}

.btn-ghost {
  background: rgba(0, 0, 0, 0.45);
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);

  :root.light & {
    background: rgba(255, 255, 255, 0.85);
    color: rgba(26, 26, 26, 0.85);
    border-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  }
}

.btn-outline {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(212, 175, 55, 0.4);

  :root.light & {
    color: rgba(26, 26, 26, 0.85);
    border-color: rgba(26, 26, 26, 0.15);
  }
}

.hero-stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $space-4;
  margin-top: $space-4;
}

.hero-stat-card {
  padding: $space-4;
  border-radius: $radius-xl;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  gap: $space-2;

  :root.light & {
    background: rgba(255, 255, 255, 0.75);
    border-color: rgba(0, 0, 0, 0.06);
  }
}

.stat-label {
  font-size: $text-xs;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);

  :root.light & {
    color: rgba(26, 26, 26, 0.55);
  }
}

.stat-value {
  font-family: $font-display;
  font-size: clamp(2rem, 4vw, 3rem);
  color: #d4af37;
  text-shadow: 0 15px 40px rgba(212, 175, 55, 0.25);
}

.stat-footnote {
  font-size: $text-sm;
  color: rgba(255, 255, 255, 0.7);

  :root.light & {
    color: rgba(26, 26, 26, 0.65);
  }
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.hero-visual-card {
  width: min(420px, 100%);
  padding: $space-6;
  border-radius: $radius-2xl;
  background: linear-gradient(160deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.35) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(16px); // Reduced blur for performance
  // Hardware acceleration for 3D transforms
  transform-style: preserve-3d;
  will-change: transform;

  :root.light & {
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.6) 100%);
    border-color: rgba(0, 0, 0, 0.06);
    box-shadow: 0 40px 60px rgba(0, 0, 0, 0.12);
  }
}

.visual-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: $space-2;
  margin-bottom: $space-5;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.badge-gradient {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  padding: $space-2 $space-3;
  border-radius: $radius-full;
  font-size: $text-xs;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(204, 119, 153, 0.25) 100%);
  border: 1px solid rgba(212, 175, 55, 0.35);
  color: rgba(255, 255, 255, 0.9);

  i {
    color: #d4af37;
  }

  :root.light & {
    color: rgba(26, 26, 26, 0.75);
    border-color: rgba(26, 26, 26, 0.12);
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, rgba(255, 255, 255, 0.35) 100%);
  }
}

.header-meta {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  font-size: $text-sm;
  color: rgba(255, 255, 255, 0.7);

  :root.light & {
    color: rgba(26, 26, 26, 0.6);
  }
}

.visual-board {
  position: relative;
  border-radius: $radius-xl;
  padding: $space-4;
  background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.12), rgba(0, 0, 0, 0.5));
  border: 1px solid rgba(255, 255, 255, 0.15);
  overflow: hidden;
  margin-bottom: $space-5;
  // Optimize board rendering
  transform: translateZ(0);

  :root.light & {
    background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.35));
    border-color: rgba(0, 0, 0, 0.06);
  }
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: $space-3;
}

.square {
  position: relative;
  padding: $space-5;
  border-radius: $radius-lg;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 6px 12px rgba(0, 0, 0, 0.2); // Lighter shadow
  // Optimize chess piece rendering
  transform: translateZ(0);
  transition: transform 0.2s ease-out;

  &:hover {
    transform: translateY(-1px) translateZ(0);
  }

  &.light {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0));
  }

  &.dark {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65));
  }

  :root.light & {
    box-shadow: inset 0 6px 12px rgba(0, 0, 0, 0.06);
    color: rgba(26, 26, 26, 0.85);

    &.dark {
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.16));
    }
  }
}

.board-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  mix-blend-mode: screen;
  pointer-events: none;
}

.visual-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: $space-3;

  li {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;

    i {
      margin-top: 4px;
      color: #d4af37;
    }

    :root.light & {
      color: rgba(26, 26, 26, 0.7);
    }
  }
}

.scroll-indicator {
  position: absolute;
  bottom: $space-6;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-2;
  color: rgba(255, 255, 255, 0.7);
  z-index: 3;

  :root.light & {
    color: rgba(26, 26, 26, 0.6);
  }
}

.scroll-mouse {
  width: 24px;
  height: 40px;
  border: 2px solid currentColor;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6px;
}

.scroll-wheel {
  width: 6px;
  height: 10px;
  border-radius: 4px;
  background-color: currentColor;
  animation: scrollWheel 1.5s ease-in-out infinite;
  // Hardware acceleration for smooth animation
  transform: translateZ(0);
}

@keyframes scrollWheel {
  0%, 100% {
    transform: translateY(0) translateZ(0);
    opacity: 1;
  }

  50% {
    transform: translateY(8px) translateZ(0);
    opacity: 0.2;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: $space-12 0 $space-10;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-badges {
    justify-content: center;
  }

  .hero-text {
    align-items: center;
    text-align: center;
  }

  .hero-subtitle {
    max-width: none;
  }
}
</style>