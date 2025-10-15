<template>
  <div class="about-page">
    <div class="page-header media-header" ref="pageHeader">
      <div class="header-media">
        <video 
          class="header-video"
          autoplay 
          muted 
          loop 
          playsinline
        >
          <source src="@/assets/highqualitychess.mp4" type="video/mp4">
          <source src="@/assets/chessvideo.mp4" type="video/mp4">
        </video>
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
  padding: $space-16 0;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;

  h1 {
    color: var(--text-primary);
    margin-bottom: $space-4;
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  }

  p {
    color: var(--text-secondary);
    font-size: $text-lg;
    max-width: 640px;
    margin: 0 auto;
    text-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
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

.header-video {
  width: 120%;
  height: 120%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.05);
  filter: brightness(0.55) contrast(1.1);

  :root.light & {
    filter: brightness(0.75) contrast(1.05);
  }
}

.header-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.65) 60%, rgba(0, 0, 0, 0.9) 100%);
  z-index: 2;
}

.header-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: $space-4;
}
</style>