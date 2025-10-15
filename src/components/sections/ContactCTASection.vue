<template>
  <section class="contact-cta-section">
    <div class="container">
      <div class="cta-content">
        <div class="cta-text">
          <h2>Ready to Start Your Chess Journey?</h2>
          <p>
            Join hundreds of students who have already discovered the power of chess 
            education with Khalex Chess. Let's unlock your child's potential together.
          </p>
        </div>
        <div class="cta-actions">
          <router-link to="/contact" class="btn btn-primary btn-lg">
            <i class="fas fa-paper-plane"></i>
            Get in Touch
          </router-link>
          <router-link to="/shop" class="btn btn-secondary btn-lg">
            <i class="fas fa-shopping-cart"></i>
            Browse Equipment
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-cta-section {
  background: linear-gradient(135deg, var(--text-accent) 0%, #daa520 100%); /* gold variant */
  color: $black;
  text-align: center;
  padding: $space-20 0;

  @media (max-width: 768px) {
    padding: $space-16 0;
  }
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-family: $font-display;
    font-size: clamp($text-2xl, 4vw, $text-4xl);
    font-weight: $font-bold;
    margin-bottom: $space-6;
    color: $black;
  }

  p {
    font-size: $text-lg;
    line-height: 1.6;
    margin-bottom: $space-8;
    color: rgba(0, 0, 0, 0.8);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
      font-size: $text-base;
      margin-bottom: $space-6;
    }
  }
}

.cta-actions {
  display: flex;
  gap: $space-4;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: $space-3;
    align-items: center;
  }

  .btn {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    
    &.btn-primary {
      background-color: $black;
      color: var(--text-accent);
      border-color: $black;

      &:hover {
        background-color: #333333; /* lighter black equivalent */
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }
    }

    &.btn-secondary {
      background-color: transparent;
      color: $black;
      border-color: $black;

      &:hover {
        background-color: $black;
        color: var(--text-accent);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }
    }

    i {
      margin-right: $space-2;
    }
  }
}
</style>