<template>
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Who We Are Section -->
    <WhoWeAreSection />
    
    <!-- Products & Services Section -->
    <ServicesSection />
    
    <!-- Why Choose Us Section -->
    <WhyChooseUsSection />
    
    <!-- Updates & News Section -->
    <UpdatesSection />
    
    <!-- Contact CTA Section -->
    <ContactCTASection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import WhoWeAreSection from '@/components/sections/WhoWeAreSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection.vue'
import UpdatesSection from '@/components/sections/UpdatesSection.vue'
import ContactCTASection from '@/components/sections/ContactCTASection.vue'

onMounted(() => {
  // Initialize GSAP animations for the page
  // This will be handled by individual sections
})
</script>

<style lang="scss" scoped>
.home-page {
  // Ensure proper spacing for fixed header
  padding-top: 70px;
  
  @media (max-width: 768px) {
    padding-top: 60px;
  }
}
</style>