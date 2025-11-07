<template>
  <div class="about-page">
    <div class="page-header media-header" ref="pageHeader">
      <div class="header-media">
        <div class="header-bg-image" style="background-image: url('/coach-with-children.jpg');"></div>
        <div class="header-overlay"></div>
      </div>

      <div class="container">
        <div class="header-content">
          <h1>About Khalex Chess</h1>
          <p>Unleashing Young Minds' Potential Through Chess</p>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Who We Are Section (Reused) -->
      <WhoWeAreSection />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGSAP } from '@/composables/useGSAP'
import WhoWeAreSection from '@/components/sections/WhoWeAreSection.vue'

const pageHeader = ref(null)
const { gsap } = useGSAP()

onMounted(() => {
  if (pageHeader.value) {
    gsap.fromTo('.header-content',
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
    )
  }
})
</script>

<style lang="scss" scoped>
.about-page {
  padding-top: 70px;

  @media (max-width: 768px) {
    padding-top: 60px;
  }
}

.page-header {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  padding: $space-20 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: 60vh;
    padding: $space-16 0;
  }
  
  @media (min-width: 1200px) {
    min-height: 75vh;
    padding: $space-24 0;
  }

  h1 {
    color: white;
    margin-bottom: $space-6;
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: $font-bold;
    line-height: 1.1;
    text-shadow: 
      0 16px 40px rgba(0, 0, 0, 0.95), 
      0 12px 32px rgba(0, 0, 0, 0.85), 
      0 8px 24px rgba(0, 0, 0, 0.75), 
      0 4px 12px rgba(0, 0, 0, 0.65),
      0 2px 6px rgba(0, 0, 0, 0.55);
      
    // Enhanced contrast for light mode
    :root.light & {
      text-shadow: 
        0 16px 40px rgba(0, 0, 0, 0.98), 
        0 12px 32px rgba(0, 0, 0, 0.9), 
        0 8px 24px rgba(0, 0, 0, 0.8), 
        0 4px 12px rgba(0, 0, 0, 0.7),
        0 2px 6px rgba(0, 0, 0, 0.6);
    }
  }

  p {
    color: rgba(255, 255, 255, 0.95);
    font-size: $text-xl;
    font-weight: $font-medium;
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.6;
    text-shadow: 
      0 12px 32px rgba(0, 0, 0, 0.9), 
      0 8px 24px rgba(0, 0, 0, 0.7), 
      0 4px 12px rgba(0, 0, 0, 0.6),
      0 2px 6px rgba(0, 0, 0, 0.5);
      
    // Enhanced contrast for light mode
    :root.light & {
      color: rgba(255, 255, 255, 0.98);
      text-shadow: 
        0 12px 32px rgba(0, 0, 0, 0.95), 
        0 8px 24px rgba(0, 0, 0, 0.8), 
        0 4px 12px rgba(0, 0, 0, 0.7),
        0 2px 6px rgba(0, 0, 0, 0.6);
    }
  }
}

.media-header .container {
  position: relative;
  z-index: 3;
}

.header-media {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.header-video,
.header-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;  
  left: 0;
  transform: scale(1.02);
  filter: brightness(1.3) contrast(1.1) saturate(1.4);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: transform $duration-slow $ease-out;

  // Award-winning hover effect
  &:hover {
    transform: scale(1.05);
  }

  :root.light & {
    filter: brightness(1.2) contrast(1.0) saturate(1.3);
  }
  
  // Responsive positioning for better image display
  @media (max-width: 768px) {
    background-position: center 20%;
  }
  
  @media (min-width: 1200px) {
    background-position: center 30%;
  }
}

.header-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.25) 100%);
  z-index: 2;
  
  // Enhanced overlay for better text contrast in light mode
  :root.light & {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0.4) 100%);
  }
}

.header-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: $space-4;
}
</style>