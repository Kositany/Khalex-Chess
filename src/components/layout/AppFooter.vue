<template>
  <footer class="app-footer">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <div class="footer-grid">
          <!-- Brand Section -->
          <div class="footer-section brand-section">
            <div class="footer-brand">
              <div class="brand-content">
                <i class="fas fa-chess-king brand-icon"></i>
                <div class="brand-text">
                  <span class="brand-name">Khalex Chess</span>
                  <span class="brand-tagline">Unleash Young Minds' Potential</span>
                </div>
              </div>
              <p class="brand-description">
                At Khalex Chess, we believe every move shapes a mind. We teach strategy, 
                discipline, and confidence — on and off the board.
              </p>
            </div>

            <!-- Social Links -->
            <div class="social-links">
              <h4>Follow Us</h4>
              <div class="social-icons">
                <a 
                  href="https://instagram.com/khalex._.chess" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-link instagram"
                  title="Follow us on Instagram"
                >
                  <i class="fab fa-instagram"></i>
                  <span>@khalex._.chess</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h4>Quick Links</h4>
            <nav class="footer-nav">
              <router-link to="/" class="footer-link">Home</router-link>
              <router-link to="/about" class="footer-link">About Us</router-link>
              <router-link to="/shop" class="footer-link">Shop</router-link>
              <router-link to="/contact" class="footer-link">Contact</router-link>
            </nav>
          </div>

          <!-- Services -->
          <div class="footer-section">
            <h4>Our Services</h4>
            <ul class="footer-list">
              <li>School Programs</li>
              <li>Private Coaching</li>
              <li>Institutional Training</li>
              <li>Holiday Chess Camps</li>
              <li>Tournaments & Events</li>
              <li>Chess Equipment</li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="footer-section">
            <h4>Stay Updated</h4>
            <p class="newsletter-text">
              Subscribe to our newsletter for updates on tournaments, camps, and chess tips.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>&copy; 2025 Khalex Chess — All Rights Reserved.</p>
            <p class="slogan">Unleashing Young Minds' Potential Through Chess.</p>
          </div>
          
          <div class="footer-meta">
            <span class="made-with">
              Made with <i class="fas fa-heart"></i> for chess enthusiasts
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import NewsletterForm from '@/components/ui/NewsletterForm.vue'
</script>

<style lang="scss" scoped>
.app-footer {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.footer-main {
  padding: $space-20 0 $space-16 0;

  @media (max-width: 768px) {
    padding: $space-16 0 $space-12 0;
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: $space-12;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: $space-8;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-8;
  }
}

.footer-section {
  h4 {
    color: var(--text-accent);
    font-family: $font-display;
    font-size: $text-lg;
    font-weight: $font-semibold;
    margin-bottom: $space-4;
    line-height: 1.2;
  }

  &.brand-section {
    .footer-brand {
      margin-bottom: $space-8;
    }
  }
}

.brand-content {
  display: flex;
  align-items: center;
  gap: $space-3;
  margin-bottom: $space-4;

  .brand-icon {
    font-size: $text-3xl;
    color: var(--text-accent);
  }

  .brand-text {
    display: flex;
    flex-direction: column;

    .brand-name {
      font-family: $font-display;
      font-size: $text-2xl;
      font-weight: $font-bold;
      color: var(--text-primary);
      line-height: 1;
    }

    .brand-tagline {
      font-size: $text-sm;
      color: var(--text-secondary);
      line-height: 1.2;
    }
  }
}

.brand-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: $space-6;
  max-width: 300px;
}

.social-links {
  h4 {
    margin-bottom: $space-3;
  }
}

.social-icons {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: $text-sm;
  transition: all $duration-base $ease-out;
  padding: $space-2 0;

  &:hover {
    color: var(--text-accent);
    transform: translateX(4px);
  }

  &.instagram:hover {
    color: #E4405F;
  }

  i {
    width: 20px;
    text-align: center;
    font-size: $text-base;
  }
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: all $duration-base $ease-out;
  padding: $space-1 0;
  font-size: $text-sm;

  &:hover {
    color: var(--text-accent);
    transform: translateX(4px);
  }

  &.router-link-active {
    color: var(--text-accent);
  }
}

.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: $space-2;

  li {
    color: var(--text-secondary);
    font-size: $text-sm;
    line-height: 1.5;
    padding: $space-1 0;
    transition: color $duration-base $ease-out;

    &:hover {
      color: var(--text-primary);
    }
  }
}

.newsletter-text {
  color: var(--text-secondary);
  font-size: $text-sm;
  line-height: 1.5;
  margin-bottom: $space-4;
}

.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding: $space-6 0;
  background-color: rgba(var(--bg-secondary-rgb), 0.3);

  @media (max-width: 768px) {
    padding: $space-4 0;
  }
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: $space-3;
    text-align: center;
  }
}

.copyright {
  color: var(--text-secondary);
  font-size: $text-sm;

  p {
    margin-bottom: 0;
    line-height: 1.4;

    &.slogan {
      font-style: italic;
      color: var(--text-accent);
      margin-top: $space-1;
    }
  }
}

.footer-meta {
  color: var(--text-secondary);
  font-size: $text-xs;

  .made-with {
    display: flex;
    align-items: center;
    gap: $space-1;

    i {
      color: #ff6b6b;
      animation: pulse 2s infinite;
    }
  }
}

// Responsive adjustments
@media (max-width: 480px) {
  .brand-content {
    flex-direction: column;
    align-items: flex-start;
    gap: $space-2;

    .brand-icon {
      font-size: $text-2xl;
    }

    .brand-text {
      .brand-name {
        font-size: $text-xl;
      }
    }
  }

  .brand-description {
    max-width: none;
  }
}

// Animation for heart icon
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>