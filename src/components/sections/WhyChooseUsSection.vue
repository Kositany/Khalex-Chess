<template>
  <section class="why-choose-us-section section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="section-title">Why Choose Us</h2>
        <p class="section-subtitle">
          Discover what makes Khalex Chess the premier choice for chess education
        </p>
      </div>

      <div class="reasons-grid">
        <div class="reason-card" v-for="reason in reasons" :key="reason.id">
          <div class="reason-number">{{ reason.id }}</div>
          <div class="reason-icon">
            <i :class="reason.icon"></i>
          </div>
          <h3>{{ reason.title }}</h3>
          <p>{{ reason.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const reasons = ref([
  {
    id: 1,
    title: 'Experienced Coaches',
    icon: 'fas fa-user-graduate',
    description: 'Our passionate and certified instructors bring years of experience in both chess mastery and youth education.'
  },
  {
    id: 2,
    title: 'Proven Results',
    icon: 'fas fa-chart-line',
    description: 'Demonstrated improvement in player performance with measurable progress in strategic thinking and problem-solving.'
  },
  {
    id: 3,
    title: 'Engaging Methods',
    icon: 'fas fa-gamepad',
    description: 'Interactive lessons that develop real-world thinking skills while keeping students motivated and entertained.'
  },
  {
    id: 4,
    title: 'Regular Communication',
    icon: 'fas fa-comments',
    description: 'Consistent progress reports and open communication with parents about their child\'s development and achievements.'
  },
  {
    id: 5,
    title: 'Active Tournaments',
    icon: 'fas fa-trophy',
    description: 'Regular tournament opportunities and exciting holiday camps that challenge students and build confidence.'
  },
  {
    id: 6,
    title: 'Holistic Development',
    icon: 'fas fa-brain',
    description: 'Focus on character building, discipline, and life skills that extend far beyond the chess board.'
  }
])
</script>

<style lang="scss" scoped>
.why-choose-us-section {
  background-color: var(--bg-primary);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      url('/certificate-from-khalex-chess.jpg'),
      url('/children-holding-certificate.jpg');
    background-size: 320px auto, 300px auto;
    background-position: calc(100% + 60px) 20%, -60px 80%;
    background-repeat: no-repeat;
    opacity: 0.3;
    filter: brightness(1.5) contrast(1.4) saturate(1.5);
    z-index: 0;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 85% 30%, rgba(0, 0, 0, 0.05) 150px, transparent 250px),
      radial-gradient(circle at 15% 70%, rgba(0, 0, 0, 0.05) 150px, transparent 250px);
    z-index: 1;
    pointer-events: none;
  }
  
  .container {
    position: relative;
    z-index: 2;
  }
}

.section-header {
  margin-bottom: $space-16;
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $space-8;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-6;
  }
}

.reason-card {
  background-color: rgba(var(--bg-secondary-rgb), 0.85);
  backdrop-filter: blur(10px);
  border-radius: $radius-xl;
  padding: $space-8;
  text-align: center;
  position: relative;
  transition: all $duration-base $ease-out;
  border: 1px solid var(--border-color);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--text-accent), #ffff00); /* brighter gold equivalent */
    transform: scaleX(0);
    transition: transform $duration-base $ease-out;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
    border-color: var(--text-accent);

    &::before {
      transform: scaleX(1);
    }

    .reason-number {
      transform: scale(1.1);
      color: var(--text-accent);
    }

    .reason-icon i {
      transform: scale(1.1) rotate(5deg);
      color: #fff200; /* lighter gold equivalent */
    }
  }
}

.reason-number {
  position: absolute;
  top: $space-4;
  right: $space-4;
  width: 30px;
  height: 30px;
  background-color: var(--text-accent);
  color: $black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: $font-bold;
  font-size: $text-sm;
  transition: all $duration-base $ease-out;
}

.reason-icon {
  margin-bottom: $space-4;

  i {
    font-size: $text-3xl;
    color: var(--text-accent);
    transition: all $duration-base $ease-out;
  }
}

.reason-card h3 {
  color: var(--text-primary);
  font-size: $text-lg;
  font-weight: $font-bold;
  margin-bottom: $space-4;
}

.reason-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>