<template>
  <section class="services-section section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="section-title">Products & Services</h2>
        <p class="section-subtitle">
          Comprehensive chess education programs for all ages and skill levels
        </p>
      </div>

      <div class="services-grid">
        <div class="service-card" v-for="service in services" :key="service.id">
          <div class="service-icon">
            <i :class="service.icon"></i>
          </div>
          <div class="service-content">
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="feature in service.features" :key="feature">
                <i class="fas fa-check"></i>
                {{ feature }}
              </li>
            </ul>
            <router-link to="/contact" class="btn btn-secondary btn-sm">
              Learn More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  {
    id: 1,
    title: 'School Programs',
    icon: 'fas fa-school',
    description: 'Integrated chess lessons with tracking and internal tournaments for schools.',
    features: [
      'Curriculum integration',
      'Progress tracking',
      'Student tournaments',
      'Teacher training'
    ]
  },
  {
    id: 2,
    title: 'Private Coaching',
    icon: 'fas fa-user',
    description: 'One-on-one or small-group sessions tailored to individual skill levels.',
    features: [
      'Personalized instruction',
      'Flexible scheduling',
      'All skill levels',
      'Performance analysis'
    ]
  },
  {
    id: 3,
    title: 'Institutional Training',
    icon: 'fas fa-building',
    description: 'Structured chess programs for clubs and organizations.',
    features: [
      'Custom programs',
      'Group instruction',
      'Regular assessments',
      'Certificate programs'
    ]
  },
  {
    id: 4,
    title: 'Holiday Chess Camps',
    icon: 'fas fa-sun',
    description: 'Five-week intensive sessions combining learning, play, and competition.',
    features: [
      'Intensive training',
      'Daily tournaments',
      'Skill development',
      'Fun activities'
    ]
  },
  {
    id: 5,
    title: 'Tournaments & Events',
    icon: 'fas fa-trophy',
    description: 'Organize and host tournaments for schools and youth chess enthusiasts.',
    features: [
      'Tournament organization',
      'Event management',
      'Prize distribution',
      'Official ratings'
    ]
  },
  {
    id: 6,
    title: 'Chess Equipment',
    icon: 'fas fa-chess-king',
    description: 'High-quality chess boards, bags, and clocks for serious players.',
    features: [
      'Premium quality',
      'Competitive prices',
      'Fast delivery',
      'Equipment advice'
    ]
  }
])
</script>

<style lang="scss" scoped>
.services-section {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}

.section-header {
  margin-bottom: $space-16;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: $space-8;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-6;
  }
}

.service-card {
  background-color: var(--bg-primary);
  border-radius: $radius-xl;
  padding: $space-8;
  box-shadow: var(--shadow);
  transition: all $duration-base $ease-out;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-hover);
    border-color: var(--text-accent);

    .service-icon i {
      transform: scale(1.1) rotate(5deg);
      color: #fff200; /* lighter gold equivalent */
    }
  }
}

.service-icon {
  text-align: center;
  margin-bottom: $space-6;

  i {
    font-size: $text-4xl;
    color: var(--text-accent);
    transition: all $duration-base $ease-out;
  }
}

.service-content {
  h3 {
    color: var(--text-primary);
    font-size: $text-xl;
    font-weight: $font-bold;
    margin-bottom: $space-4;
    text-align: center;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: $space-6;
    text-align: center;
  }
}

.service-features {
  list-style: none;
  margin-bottom: $space-6;

  li {
    display: flex;
    align-items: center;
    gap: $space-3;
    color: var(--text-secondary);
    margin-bottom: $space-2;
    font-size: $text-sm;

    i {
      color: var(--text-accent);
      font-size: $text-xs;
      flex-shrink: 0;
    }
  }
}

.service-card .btn {
  width: 100%;
  justify-content: center;
}
</style>