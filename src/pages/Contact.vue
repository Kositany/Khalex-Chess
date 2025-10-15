<template>
  <div class="contact-page">
    <div class="page-header">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch with our chess education experts</p>
      </div>
    </div>

    <div class="container">
      <div class="contact-content">
        <div class="contact-info">
          <h3>Get in Touch</h3>
          <p>
            Ready to start your chess journey? Have questions about our programs? 
            We'd love to hear from you and help you find the perfect chess training solution.
          </p>

          <div class="contact-methods">
            <div class="contact-method">
              <i class="fas fa-envelope"></i>
              <div>
                <h4>Email Us</h4>
                <p>khaltonyx@gmail.com</p>
              </div>
            </div>
            
            <div class="contact-method">
              <i class="fab fa-instagram"></i>
              <div>
                <h4>Follow Us</h4>
                <p>@khalex._.chess</p>
              </div>
            </div>
            
            <div class="contact-method">
              <i class="fas fa-chess-king"></i>
              <div>
                <h4>Chess Training</h4>
                <p>Professional coaching for all levels</p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form-section">
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ContactForm from '@/components/ui/ContactForm.vue'
</script>

<style lang="scss" scoped>
.contact-page {
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

  h1 {
    color: var(--text-primary);
    margin-bottom: $space-4;
  }

  p {
    color: var(--text-secondary);
    font-size: $text-lg;
  }
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-16;
  padding: $space-16 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: $space-12;
  }
}

.contact-info {
  h3 {
    color: var(--text-primary);
    margin-bottom: $space-4;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: $space-8;
  }
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: $space-6;
}

.contact-method {
  display: flex;
  gap: $space-4;
  align-items: flex-start;

  i {
    font-size: $text-2xl;
    color: var(--text-accent);
    margin-top: $space-1;
    flex-shrink: 0;
  }

  h4 {
    color: var(--text-primary);
    margin-bottom: $space-2;
  }

  p {
    color: var(--text-secondary);
    margin: 0;
  }
}
</style>