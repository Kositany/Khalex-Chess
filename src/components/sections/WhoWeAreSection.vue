<template>
  <section class="who-we-are-section section">
    <div class="container">
      <div class="section-content">
        <div class="section-header text-center">
          <h2 class="section-title">Who We Are</h2>
          <p class="section-subtitle">
            Passionate about chess education and young minds development
          </p>
        </div>

        <div class="content-grid">
          <div class="content-text">
            <div class="text-content">
              <p class="lead-text">
                Khalex Chess is more than just a training academy — we are a community 
                dedicated to nurturing young minds through the strategic game of chess.
              </p>
              
              <p>
                Founded with the vision of unlocking the potential within every child, 
                we believe that chess is a powerful tool for developing critical thinking, 
                problem-solving skills, and emotional intelligence that extends far beyond 
                the 64 squares.
              </p>
              
              <p>
                Our comprehensive approach combines traditional chess instruction with 
                modern teaching methodologies, ensuring that every student not only learns 
                to play chess but also develops life skills that will serve them in all 
                their future endeavors.
              </p>

              <div class="mission-points">
                <div class="mission-point">
                  <i class="fas fa-target"></i>
                  <div>
                    <h4>Our Mission</h4>
                    <p>To empower young minds through chess education, fostering strategic thinking and character development.</p>
                  </div>
                </div>
                
                <div class="mission-point">
                  <i class="fas fa-eye"></i>
                  <div>
                    <h4>Our Vision</h4>
                    <p>To be Kenya's leading chess education provider, creating confident and strategic thinkers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="founder-profile">
            <div class="profile-card">
              <div class="profile-image">
                <div class="image-container" style="background-image: url('/coach-with-students-part-2.jpg');">
                  <div class="image-overlay"></div>
                </div>
              </div>
              
              <div class="profile-content">
                <h3>Anthony Paschal</h3>
                <p class="profile-title">Founder & Head Coach</p>
                
                <p class="profile-description">
                  With over 5 years of experience in chess education, Anthony has 
                  dedicated his career to nurturing young chess talents across Kenya. 
                  His innovative teaching methods and passion for the game have 
                  transformed hundreds of students into confident chess players and 
                  strategic thinkers.
                </p>

                <div class="profile-achievements">
                  <div class="achievement">
                    <span class="achievement-number">500+</span>
                    <span class="achievement-label">Students Mentored</span>
                  </div>
                  <div class="achievement">
                    <span class="achievement-number">50+</span>
                    <span class="achievement-label">Tournaments Organized</span>
                  </div>
                </div>

                <div class="profile-credentials">
                  <div class="credential">
                    <i class="fas fa-certificate"></i>
                    <span>Certified Chess Instructor</span>
                  </div>
                  <div class="credential">
                    <i class="fas fa-award"></i>
                    <span>Youth Development Specialist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="values-section">
          <h3 class="values-title">Our Core Values</h3>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-lightbulb"></i>
              </div>
              <h4>Excellence</h4>
              <p>We strive for the highest standards in chess education and student development.</p>
            </div>
            
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-users"></i>
              </div>
              <h4>Community</h4>
              <p>Building a supportive chess community where every student feels valued and encouraged.</p>
            </div>
            
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-seedling"></i>
              </div>
              <h4>Growth</h4>
              <p>Fostering continuous learning and personal development through chess mastery.</p>
            </div>
            
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-handshake"></i>
              </div>
              <h4>Integrity</h4>
              <p>Maintaining honesty, respect, and sportsmanship in all our interactions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Section title animation
  gsap.fromTo('.section-title', 
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.who-we-are-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  )

  // Content animation
  gsap.fromTo('.content-text', 
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.content-grid',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  )

  // Founder profile animation
  gsap.fromTo('.founder-profile', 
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.content-grid',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  )

  // Values cards animation
  gsap.fromTo('.value-card', 
    { opacity: 0, y: 30, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '.values-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  )
})
</script>

<style lang="scss" scoped>
.who-we-are-section {
  background-color: var(--bg-primary);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--text-accent), transparent);
  }
}

.section-header {
  margin-bottom: $space-16;
}

.section-title {
  color: var(--text-primary);
  margin-bottom: $space-4;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: $text-lg;
  max-width: 600px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-16;
  margin-bottom: $space-20;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: $space-12;
  }
}

.content-text {
  .lead-text {
    font-size: $text-xl;
    font-weight: $font-medium;
    color: var(--text-primary);
    margin-bottom: $space-6;
    line-height: 1.6;
  }

  p {
    margin-bottom: $space-4;
    line-height: 1.7;
  }
}

.mission-points {
  margin-top: $space-8;
  display: flex;
  flex-direction: column;
  gap: $space-6;
}

.mission-point {
  display: flex;
  gap: $space-4;
  align-items: flex-start;

  i {
    color: var(--text-accent);
    font-size: $text-xl;
    margin-top: $space-1;
    flex-shrink: 0;
  }

  h4 {
    color: var(--text-primary);
    font-size: $text-lg;
    font-weight: $font-semibold;
    margin-bottom: $space-2;
  }

  p {
    color: var(--text-secondary);
    margin: 0;
  }
}

.profile-card {
  background-color: var(--bg-secondary);
  border-radius: $radius-2xl;
  padding: $space-8;
  box-shadow: var(--shadow);
  transition: all $duration-base $ease-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
  }
}

.profile-image {
  text-align: center;
  margin-bottom: $space-6;

  .image-container {
    width: 150px;
    height: 150px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
    position: relative;
    overflow: hidden;
    border: 3px solid var(--text-accent);
    
    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(0, 0, 0, 0.1));
      border-radius: 50%;
    }
  }

  .image-placeholder {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, var(--text-accent), #b8860b); /* darker gold equivalent */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: $text-4xl;
    color: $black;
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
  }
}

.profile-content {
  text-align: center;

  h3 {
    color: var(--text-primary);
    font-size: $text-2xl;
    font-weight: $font-bold;
    margin-bottom: $space-2;
  }

  .profile-title {
    color: var(--text-accent);
    font-weight: $font-medium;
    margin-bottom: $space-4;
  }

  .profile-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: $space-6;
  }
}

.profile-achievements {
  display: flex;
  justify-content: center;
  gap: $space-8;
  margin-bottom: $space-6;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: $space-4;
  }
}

.achievement {
  text-align: center;

  .achievement-number {
    display: block;
    font-family: $font-display;
    font-size: $text-2xl;
    font-weight: $font-bold;
    color: var(--text-accent);
    line-height: 1;
  }

  .achievement-label {
    font-size: $text-sm;
    color: var(--text-secondary);
  }
}

.profile-credentials {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.credential {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  color: var(--text-secondary);
  font-size: $text-sm;

  i {
    color: var(--text-accent);
  }
}

.values-section {
  text-align: center;
}

.values-title {
  color: var(--text-primary);
  font-size: $text-2xl;
  font-weight: $font-bold;
  margin-bottom: $space-12;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $space-8;
}

.value-card {
  background-color: var(--bg-secondary);
  border-radius: $radius-xl;
  padding: $space-8;
  text-align: center;
  transition: all $duration-base $ease-out;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-hover);
    border-color: var(--text-accent);

    .value-icon i {
      transform: scale(1.1);
    }
  }
}

.value-icon {
  margin-bottom: $space-4;

  i {
    font-size: $text-3xl;
    color: var(--text-accent);
    transition: transform $duration-base $ease-out;
  }
}

.value-card h4 {
  color: var(--text-primary);
  font-size: $text-lg;
  font-weight: $font-semibold;
  margin-bottom: $space-3;
}

.value-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

// Responsive adjustments
@media (max-width: 768px) {
  .section-header {
    margin-bottom: $space-12;
  }

  .content-grid {
    margin-bottom: $space-16;
  }

  .profile-card {
    padding: $space-6;
  }

  .values-grid {
    gap: $space-6;
  }

  .value-card {
    padding: $space-6;
  }
}
</style>