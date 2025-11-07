<template>
  <div class="contact-modal-overlay" @click="closeModal">
    <div class="contact-modal" @click.stop>
      <div class="modal-header">
        <h3>{{ isFullCart ? 'Complete Cart Order' : 'Order This Item' }}</h3>
        <button @click="closeModal" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <!-- Single Product Summary -->
        <div v-if="!isFullCart && product" class="product-summary">
          <div class="product-info">
            <i :class="product.icon"></i>
            <div>
              <h4>{{ product.name }}</h4>
              <p class="product-price">Ksh {{ product.price.toLocaleString() }}</p>
              <p class="product-description">{{ product.description }}</p>
            </div>
          </div>
        </div>

        <!-- Full Cart Summary -->
        <div v-if="isFullCart && cartItems?.length" class="cart-summary">
          <h4>Your Cart Items:</h4>
          <div class="cart-items-list">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="item-info">
                <i :class="getProductIcon(item.id)" class="item-icon"></i>
                <div>
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-details">{{ item.quantity }} × Ksh {{ item.price.toLocaleString() }}</span>
                </div>
              </div>
              <div class="item-total">
                Ksh {{ (item.quantity * item.price).toLocaleString() }}
              </div>
            </div>
          </div>
          <div class="cart-total">
            <strong>Total: Ksh {{ calculateTotal().toLocaleString() }}</strong>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="contact-info">
          <h4>
            <i class="fas fa-phone"></i>
            How to Place Your Order
          </h4>
          <p class="contact-description">
            Contact us through any of the methods below to place your order. 
            {{ isFullCart ? 'Mention the items in your cart.' : 'Mention the item you want to order.' }}
          </p>

          <div class="contact-methods">
            <!-- Phone Contact -->
            <div class="contact-method">
              <div class="method-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="method-info">
                <h5>Call Us</h5>
                <p>+254796113550</p>
                <button @click="makePhoneCall" class="contact-btn btn-phone">
                  <i class="fas fa-phone"></i>
                  Call Now
                </button>
              </div>
            </div>

            <!-- WhatsApp Contact -->
            <div class="contact-method">
              <div class="method-icon whatsapp">
                <i class="fab fa-whatsapp"></i>
              </div>
              <div class="method-info">
                <h5>WhatsApp</h5>
                <p>+254796113550</p>
                <button @click="openWhatsApp" class="contact-btn btn-whatsapp">
                  <i class="fab fa-whatsapp"></i>
                  Message on WhatsApp
                </button>
              </div>
            </div>

            <!-- Email Contact -->
            <div class="contact-method">
              <div class="method-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="method-info">
                <h5>Email</h5>
                <p>khaltonyx@gmail.com</p>
                <button @click="sendEmail" class="contact-btn btn-email">
                  <i class="fas fa-envelope"></i>
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Instructions -->
        <div class="order-instructions">
          <h4>
            <i class="fas fa-info-circle"></i>
            Order Instructions
          </h4>
          <ul>
            <li>Contact us using any method above</li>
            <li>Provide your name and delivery location</li>
            <li>Confirm your order details and quantity</li>
            <li>We'll arrange delivery within Nairobi (delivery fee applies)</li>
            <li>Payment on delivery (Cash or M-Pesa)</li>
          </ul>
        </div>

        <!-- Payment Info -->
        <div class="payment-info">
          <div class="info-item">
            <i class="fas fa-truck"></i>
            <span>Free delivery for orders above Ksh 5,000 within Nairobi</span>
          </div>
          <div class="info-item">
            <i class="fas fa-credit-card"></i>
            <span>Payment on delivery (Cash or M-Pesa accepted)</span>
          </div>
          <div class="info-item">
            <i class="fas fa-clock"></i>
            <span>Delivery within 1-2 business days</span>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" @click="closeModal" class="btn btn-ghost">
            Close
          </button>
          <button @click="openWhatsApp" class="btn btn-primary">
            <i class="fab fa-whatsapp"></i>
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/store/notification'
import { useCartStore } from '@/store/cart'

// Props and emits
const props = defineProps({
  product: {
    type: Object,
    default: null
  },
  cartItems: {
    type: Array,
    default: null
  }
})

const emit = defineEmits(['close'])

// Stores
const notificationStore = useNotificationStore()
const cartStore = useCartStore()

// Computed
const isFullCart = computed(() => props.cartItems && props.cartItems.length > 0)

// Contact information
const phoneNumber = '+254796113550'
const email = 'khaltonyx@gmail.com'

// Methods
const closeModal = () => {
  emit('close')
}

const calculateTotal = () => {
  if (!props.cartItems) return 0
  return props.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0)
}

const getProductIcon = (productId) => {
  const products = [
    { id: 1, icon: 'fas fa-chess-board' },
    { id: 2, icon: 'fas fa-briefcase' },
    { id: 3, icon: 'fas fa-clock' }
  ]
  const product = products.find(p => p.id === productId)
  return product ? product.icon : 'fas fa-chess'
}

const generateOrderMessage = () => {
  let message = 'Hello! I would like to place an order:\n\n'
  
  if (isFullCart.value) {
    // Use cart store's order text generation
    message += cartStore.generateOrderText()
  } else if (props.product) {
    message += `Item: ${props.product.name}\n`
    message += `Price: Ksh ${props.product.price.toLocaleString()}\n\n`
    message += 'Please let me know about delivery options and payment details.'
  }
  
  message += '\n\nThank you!'
  
  return encodeURIComponent(message)
}

const makePhoneCall = () => {
  window.open(`tel:${phoneNumber}`, '_self')
  notificationStore.info('Opening phone dialer...')
}

const openWhatsApp = () => {
  const message = generateOrderMessage()
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`
  window.open(whatsappUrl, '_blank')
  notificationStore.success('Opening WhatsApp...')
}

const sendEmail = () => {
  const subject = isFullCart.value ? 'Cart Order Inquiry' : `Order Inquiry: ${props.product?.name || 'Chess Equipment'}`
  const body = generateOrderMessage()
  const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`
  window.open(emailUrl, '_self')
  notificationStore.info('Opening email client...')
}
</script>

<style lang="scss" scoped>
.contact-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-modal;
  padding: $space-4;
}

.contact-modal {
  background-color: var(--bg-primary);
  border-radius: $radius-xl;
  box-shadow: $shadow-2xl;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space-6;
  border-bottom: 1px solid var(--border-color);

  h3 {
    color: var(--text-primary);
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: $text-lg;
    cursor: pointer;
    padding: $space-2;
    border-radius: $radius-sm;
    transition: all $duration-fast $ease-out;

    &:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }
  }
}

.modal-body {
  padding: $space-6;
}

.product-summary, .cart-summary {
  background-color: var(--bg-secondary);
  border-radius: $radius-lg;
  padding: $space-5;
  margin-bottom: $space-6;
  border: 1px solid var(--border-color);

  .product-info {
    display: flex;
    align-items: flex-start;
    gap: $space-4;

    i {
      font-size: $text-2xl;
      color: var(--text-accent);
      margin-top: $space-1;
    }

    h4 {
      color: var(--text-primary);
      margin-bottom: $space-1;
    }

    .product-price {
      color: var(--text-accent);
      font-weight: $font-bold;
      font-size: $text-lg;
      margin-bottom: $space-2;
    }

    .product-description {
      color: var(--text-secondary);
      font-size: $text-sm;
      line-height: 1.5;
      margin: 0;
    }
  }
}

.cart-summary {
  h4 {
    color: var(--text-primary);
    margin-bottom: $space-4;
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  .cart-items-list {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    margin-bottom: $space-4;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-3;
    background-color: var(--bg-primary);
    border-radius: $radius-md;
    border: 1px solid var(--border-color);

    .item-info {
      display: flex;
      align-items: center;
      gap: $space-3;

      .item-icon {
        color: var(--text-accent);
        font-size: $text-lg;
        width: 20px;
        text-align: center;
      }

      .item-name {
        display: block;
        color: var(--text-primary);
        font-weight: $font-medium;
        margin-bottom: $space-1;
      }

      .item-details {
        display: block;
        color: var(--text-secondary);
        font-size: $text-sm;
      }
    }

    .item-total {
      color: var(--text-accent);
      font-weight: $font-bold;
    }
  }

  .cart-total {
    border-top: 1px solid var(--border-color);
    padding-top: $space-3;
    text-align: right;
    color: var(--text-primary);
    font-size: $text-lg;
  }
}

.contact-info {
  margin-bottom: $space-6;

  h4 {
    color: var(--text-primary);
    margin-bottom: $space-3;
    display: flex;
    align-items: center;
    gap: $space-2;

    i {
      color: var(--text-accent);
    }
  }

  .contact-description {
    color: var(--text-secondary);
    margin-bottom: $space-5;
    line-height: 1.6;
  }
}

.contact-methods {
  display: grid;
  gap: $space-4;

  @media (min-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.contact-method {
  display: flex;
  align-items: center;
  gap: $space-4;
  padding: $space-4;
  background-color: var(--bg-secondary);
  border-radius: $radius-lg;
  border: 1px solid var(--border-color);

  .method-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: $radius-full;
    background-color: var(--text-accent);
    color: white;
    font-size: $text-xl;
    flex-shrink: 0;

    &.whatsapp {
      background-color: #25D366;
    }
  }

  .method-info {
    flex: 1;

    h5 {
      color: var(--text-primary);
      margin-bottom: $space-1;
      font-size: $text-base;
    }

    p {
      color: var(--text-secondary);
      margin-bottom: $space-3;
      font-family: $font-mono;
    }
  }

  .contact-btn {
    padding: $space-2 $space-4;
    border-radius: $radius-md;
    font-size: $text-sm;
    font-weight: $font-medium;
    border: none;
    cursor: pointer;
    transition: all $duration-base $ease-out;
    display: flex;
    align-items: center;
    gap: $space-2;
    text-decoration: none;

    &.btn-phone {
      background-color: var(--text-accent);
      color: white;

      &:hover {
        background-color: var(--text-accent-hover);
        transform: translateY(-2px);
      }
    }

    &.btn-whatsapp {
      background-color: #25D366;
      color: white;

      &:hover {
        background-color: #20b558;
        transform: translateY(-2px);
      }
    }

    &.btn-email {
      background-color: #1e40af;
      color: white;

      &:hover {
        background-color: #1d4ed8;
        transform: translateY(-2px);
      }
    }

    i {
      font-size: $text-sm;
    }
  }
}

.order-instructions {
  background-color: var(--bg-secondary);
  border-radius: $radius-lg;
  padding: $space-5;
  margin-bottom: $space-6;
  border: 1px solid var(--border-color);

  h4 {
    color: var(--text-primary);
    margin-bottom: $space-4;
    display: flex;
    align-items: center;
    gap: $space-2;

    i {
      color: var(--text-accent);
    }
  }

  ul {
    margin: 0;
    padding-left: $space-5;
    color: var(--text-secondary);
    line-height: 1.6;

    li {
      margin-bottom: $space-2;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.payment-info {
  background-color: var(--bg-secondary);
  border-radius: $radius-lg;
  padding: $space-4;
  margin-bottom: $space-6;
  border: 1px solid var(--border-color);

  .info-item {
    display: flex;
    align-items: center;
    gap: $space-3;
    color: var(--text-secondary);
    font-size: $text-sm;
    margin-bottom: $space-3;

    &:last-child {
      margin-bottom: 0;
    }

    i {
      color: var(--text-accent);
      flex-shrink: 0;
      width: 16px;
      text-align: center;
    }
  }
}

.modal-actions {
  display: flex;
  gap: $space-3;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column;
  }

  .btn {
    min-width: 140px;

    @media (max-width: 480px) {
      width: 100%;
    }

    i {
      margin-right: $space-2;
    }
  }
}

@media (max-width: 480px) {
  .contact-modal {
    margin: $space-2;
    max-height: calc(100vh - #{$space-4});
  }

  .modal-body {
    padding: $space-4;
  }

  .contact-method {
    flex-direction: column;
    text-align: center;
    gap: $space-3;

    .method-info {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>