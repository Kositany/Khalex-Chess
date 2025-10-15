<template>
  <section class="updates-section section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="section-title">Updates & News</h2>
        <p class="section-subtitle">
          Stay informed about our latest events, tournaments, and chess programs
        </p>
      </div>

      <div class="updates-grid">
        <article class="update-card featured" v-for="update in updates" :key="update.id">
          <div class="update-badge" :class="update.type">
            {{ update.badge }}
          </div>
          <div class="update-content">
            <h3>{{ update.title }}</h3>
            <p class="update-meta">
              <i class="fas fa-calendar"></i>
              {{ update.date }}
              <span class="separator">•</span>
              <i class="fas fa-map-marker-alt"></i>
              {{ update.location }}
            </p>
            <p class="update-description">{{ update.description }}</p>
            <div class="update-highlights">
              <div class="highlight" v-for="highlight in update.highlights" :key="highlight">
                <i class="fas fa-star"></i>
                {{ highlight }}
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="more-updates">
        <router-link to="/contact" class="btn btn-primary">
          <i class="fas fa-envelope"></i>
          Get Updates via Newsletter
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const updates = ref([
  {
    id: 1,
    type: 'event',
    badge: 'Upcoming Event',
    title: 'November–December Holiday Chess Camp 2025',
    date: 'November 2025',
    location: 'St Joseph Kahawa Sukari',
    description: 'Join us for an intensive five-week chess training program during the school holidays. Perfect for young chess enthusiasts looking to improve their game.',
    highlights: [
      'Daily chess lessons and practice',
      'Tournament-style competitions',
      'Professional coaching staff',
      'Certificate of completion'
    ]
  },
  {
    id: 2,
    type: 'tournament',
    badge: 'Tournament',
    title: 'Inter-School Chess Championship 2025',
    date: 'December 2025',
    location: 'Various Schools',
    description: 'Annual chess championship bringing together the best young players from schools across the region for friendly competition.',
    highlights: [
      'Multiple age categories',
      'Individual and team prizes',
      'Official chess ratings',
      'Professional arbitration'
    ]
  },
  {
    id: 3,
    type: 'program',
    badge: 'New Program',
    title: 'Weekend Chess Workshops',
    date: 'Every Saturday',
    location: 'Khalex Chess Academy',
    description: 'New weekend program designed for working parents and students who want to learn chess without disrupting their school schedule.',
    highlights: [
      'Flexible weekend timing',
      'All skill levels welcome',
      'Small group sessions',
      'Monthly progress assessments'
    ]
  }
])
</script>

<style lang="scss" scoped>
.updates-section {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.section-header {
  margin-bottom: $space-16;
}

.updates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: $space-8;
  margin-bottom: $space-12;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-6;
  }
}

.update-card {
  background-color: var(--bg-primary);
  border-radius: $radius-xl;
  padding: $space-8;
  position: relative;
  box-shadow: var(--shadow);
  transition: all $duration-base $ease-out;
  border: 1px solid var(--border-color);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), transparent);
    opacity: 0;
    transition: opacity $duration-base $ease-out;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
    border-color: var(--text-accent);

    &::before {
      opacity: 1;
    }

    .update-badge {
      transform: scale(1.05);
    }
  }

  &.featured {
    border-left: 4px solid var(--text-accent);
  }
}

.update-badge {
  position: absolute;
  top: $space-4;
  right: $space-4;
  padding: $space-1 $space-3;
  border-radius: $radius-full;
  font-size: $text-xs;
  font-weight: $font-semibold;
  text-transform: uppercase;
  transition: transform $duration-base $ease-out;

  &.event {
    background-color: var(--text-accent);
    color: $black;
  }

  &.tournament {
    background-color: $success;
    color: $white;
  }

  &.program {
    background-color: $info;
    color: $white;
  }
}

.update-content {
  h3 {
    color: var(--text-primary);
    font-size: $text-xl;
    font-weight: $font-bold;
    margin-bottom: $space-4;
    line-height: 1.3;
  }
}

.update-meta {
  display: flex;
  align-items: center;
  gap: $space-2;
  color: var(--text-secondary);
  font-size: $text-sm;
  margin-bottom: $space-4;
  flex-wrap: wrap;

  i {
    color: var(--text-accent);
  }

  .separator {
    color: var(--border-color);
  }
}

.update-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: $space-6;
}

.update-highlights {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.highlight {
  display: flex;
  align-items: center;
  gap: $space-2;
  color: var(--text-secondary);
  font-size: $text-sm;

  i {
    color: var(--text-accent);
    font-size: $text-xs;
    flex-shrink: 0;
  }
}

.more-updates {
  text-align: center;
  padding-top: $space-8;
  border-top: 1px solid var(--border-color);

  .btn {
    i {
      margin-right: $space-2;
    }
  }
}

@media (max-width: 480px) {
  .updates-grid {
    grid-template-columns: 1fr;
  }

  .update-card {
    padding: $space-6;
  }

  .update-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: $space-1;

    .separator {
      display: none;
    }
  }
}
</style>