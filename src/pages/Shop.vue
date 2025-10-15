<template>
  <div class="shop-page" ref="shopPage">
    <!-- Enhanced page header with parallax -->
    <div class="page-header parallax-bg" ref="pageHeader">
      <div class="header-bg-media">
        <img 
          class="header-bg-image"
          src="@/assets/1628356476895.jpeg"
          alt="Premium chess equipment display"
        >
        <div class="header-overlay"></div>
      </div>
      
      <div class="container">
        <div class="header-content animate-on-scroll">
          <h1 class="header-title">
            <span class="title-word" data-delay="0.1">Chess</span>
            <span class="title-word" data-delay="0.3">Equipment</span>
            <span class="title-word highlight" data-delay="0.5">Shop</span>
          </h1>
          <p class="header-subtitle animate-on-scroll" data-delay="0.7">
            High-quality chess equipment for serious players and passionate learners
          </p>
          
          <!-- Floating chess pieces decoration -->
          <div class="floating-decorations">
            <div class="floating-piece piece-1">♔</div>
            <div class="floating-piece piece-2">♛</div>
            <div class="floating-piece piece-3">♗</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="shop-content">
        <!-- Enhanced Shopping Cart Summary -->
        <div v-if="cartCount > 0" class="cart-summary card-interactive animate-on-scroll" ref="cartSummary">
          <div class="cart-info">
            <div class="cart-icon-wrapper">
              <i class="fas fa-shopping-cart cart-icon"></i>
              <span class="cart-badge">{{ cartCount }}</span>
            </div>
            <span class="cart-text">{{ cartCount }} items in cart</span>
            <span class="cart-total">Ksh {{ cartTotal.toLocaleString() }}</span>
          </div>
          <div class="cart-actions">
            <button @click="toggleCartDetails" class="btn btn-ghost btn-sm cart-toggle-btn">
              <i class="fas fa-eye"></i>
              {{ showCartDetails ? 'Hide' : 'View' }} Cart
            </button>
            <button @click="clearCart" class="btn btn-ghost btn-sm text-error cart-clear-btn">
              <i class="fas fa-trash"></i>
              Clear Cart
            </button>
          </div>
        </div>

        <!-- Enhanced Cart Details with animations -->
        <div v-if="showCartDetails && cartCount > 0" class="cart-details animate-on-scroll" ref="cartDetails">
          <h3 class="cart-details-title">Shopping Cart</h3>
          <div class="cart-items">
            <div 
              v-for="(item, index) in cartItems" 
              :key="item.id" 
              class="cart-item card-interactive"
              :data-delay="index * 0.1"
              ref="cartItemsRefs"
            >
              <div class="item-info">
                <div class="item-icon-wrapper">
                  <i :class="getProductIcon(item.id)" class="item-icon"></i>
                </div>
                <div class="item-details">
                  <h4>{{ item.name }}</h4>
                  <p class="item-price">Ksh {{ item.price.toLocaleString() }} each</p>
                </div>
              </div>
              <div class="item-controls">
                <div class="quantity-controls">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" class="quantity-btn btn-enhanced">
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)" class="quantity-btn btn-enhanced">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <button @click="removeFromCart(item.id)" class="remove-btn btn-enhanced">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="cart-total-section">
            <div class="total-row">
              <strong>Total: Ksh {{ cartTotal.toLocaleString() }}</strong>
            </div>
            <button @click="proceedToCheckout" class="checkout-btn btn btn-primary btn-lg btn-enhanced">
              <i class="fas fa-credit-card"></i>
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>

        <!-- Enhanced Products Grid -->
        <div class="products-section">
          <div class="section-header animate-on-scroll">
            <h2>Our Premium Collection</h2>
            <p>Carefully curated chess equipment for players of all levels</p>
          </div>
          
          <div class="products-grid" ref="productsGrid">
            <div 
              v-for="(product, index) in products" 
              :key="product.id"
              class="product-card card-interactive animate-on-scroll"
              :data-delay="index * 0.1"
              ref="productCardsRefs"
            >
              <div class="product-image">
                <div class="product-icon-wrapper">
                  <i :class="product.icon" class="product-icon"></i>
                  <div class="icon-glow"></div>
                </div>
              </div>
              
              <div class="product-content">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                
                <div class="product-features">
                  <ul>
                    <li v-for="feature in product.features" :key="feature" class="feature-item">
                      <i class="fas fa-check feature-check"></i>
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                
                <div class="product-footer">
                  <div class="product-price">
                    <span class="price">Ksh {{ product.price.toLocaleString() }}</span>
                  </div>
                  
                  <div class="product-actions">
                    <button 
                      @click="addToCart(product)" 
                      class="add-cart-btn btn btn-primary btn-enhanced"
                      :disabled="isProcessing"
                    >
                      <i class="fas fa-cart-plus"></i>
                      <span>Add to Cart</span>
                    </button>
                    
                    <button 
                      @click="buyNow(product)" 
                      class="buy-now-btn btn btn-secondary btn-enhanced"
                      :disabled="isProcessing"
                    >
                      <i class="fas fa-credit-card"></i>
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Product hover overlay -->
              <div class="product-overlay">
                <div class="overlay-content">
                  <i :class="product.icon" class="overlay-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Payment Modal -->
    <PaymentModal 
      v-if="showPaymentModal"
      :product="selectedProduct"
      @close="closePaymentModal"
      @success="handlePaymentSuccess"
    />
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/cart'
import { useNotificationStore } from '@/store/notification'
import { useGSAP } from '@/composables/useGSAP'
import PaymentModal from '@/components/ui/PaymentModal.vue'

// GSAP composable
const { 
  createTimeline, 
  scrollReveal, 
  addHoverAnimation,
  createParallax,
  gsap,
  ScrollTrigger 
} = useGSAP()

// Stores
const cartStore = useCartStore()
const notificationStore = useNotificationStore()

// Store refs
const { cartCount, cartTotal } = storeToRefs(cartStore)

// Computed properties (use actual store state)
const cartItems = computed(() => cartStore.items)

// Template refs
const shopPage = ref(null)
const pageHeader = ref(null)
const cartSummary = ref(null)
const cartDetails = ref(null)
const productsGrid = ref(null)
const cartItemsRefs = ref([])
const productCardsRefs = ref([])

// Local state
const isProcessing = ref(false)
const showPaymentModal = ref(false)
const selectedProduct = ref(null)
const showCartDetails = ref(false)

// Products data
const products = ref([
  {
    id: 1,
    name: 'Rollable Rubber Chess Boards',
    description: 'Professional tournament-style chess boards made from high-quality rubber material.',
    price: 3200,
    icon: 'fas fa-chess-board',
    features: [
      'Tournament regulation size',
      'Rollable and portable',
      'Includes extra queen piece',
      'Comes with drawstring bag'
    ]
  },
  {
    id: 2,
    name: 'Chess Bags',
    description: 'Durable chess bags to carry and protect your chess sets and pieces.',
    price: 500,
    icon: 'fas fa-briefcase',
    features: [
      'Multiple style options',
      'Archer bag design',
      'Pouch compartments',
      'Drawstring closure'
    ]
  },
  {
    id: 3,
    name: 'Chess Clocks',
    description: 'Professional digital chess clocks for timed games and tournaments.',
    price: 4799,
    icon: 'fas fa-clock',
    features: [
      'Digital display',
      'Multiple time control options',
      'Tournament approved',
      'Battery powered'
    ]
  }
])

// Load persisted cart on mount so View Cart shows items after refresh
onMounted(() => {
  cartStore.loadCart()
  initAnimations()
})

const initAnimations = () => {
  // Page entrance animation
  const tl = createTimeline({ delay: 0.3 })
  
  // Header animation with parallax imagery
  tl.fromTo('.header-content', 
    { opacity: 0, y: 80, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
  )
  
  // Staggered title words animation
  tl.fromTo('.title-word', 
    { opacity: 0, y: 50, rotationX: 45 },
    { 
      opacity: 1, 
      y: 0, 
      rotationX: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=1"
  )
  
  // Floating pieces animation
  gsap.to('.floating-piece', {
    y: -20,
    rotation: 360,
    duration: 4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      each: 0.5,
      from: "random"
    }
  })
  
  // Parallax effect for header image
  createParallax('.header-bg-media', 0.3)
  
  // Product cards hover animations
  addHoverAnimation('.product-card', 
    {
      y: -15,
      rotationX: 8,
      rotationY: 5,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
      transformOrigin: "center bottom"
    },
    {
      y: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    }
  )
  
  // Enhanced button animations
  addHoverAnimation('.btn-enhanced',
    {
      scale: 1.05,
      y: -3,
      duration: 0.3,
      ease: "power2.out"
    }
  )
  
  // Cart animation when items are added
  if (cartSummary.value) {
    ScrollTrigger.create({
      trigger: cartSummary.value,
      start: "top 90%",
      onEnter: () => {
        gsap.fromTo(cartSummary.value,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
      }
    })
  }
  
  // Products grid staggered reveal
  scrollReveal('.product-card', {
    distance: 80,
    scale: 0.9,
    duration: 1,
    stagger: 0.1,
    start: "top 85%"
  })
  
  // Cart items animation
  scrollReveal('.cart-item', {
    distance: 50,
    duration: 0.8,
    stagger: 0.05
  })
}

// Enhanced methods with animations
const addToCart = (product) => {
  cartStore.addToCart(product)
  notificationStore.success(`${product.name} added to cart!`)
  
  // Animate the product card when added to cart
  const productCard = event.target.closest('.product-card')
  if (productCard) {
    gsap.to(productCard, {
      scale: 1.1,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    })
  }
  
  // Animate cart summary appearance if first item
  if (cartCount.value === 1 && cartSummary.value) {
    gsap.fromTo(cartSummary.value,
      { scale: 0, opacity: 0, y: -20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
    )
  }
}

const removeFromCart = (productId) => {
  const item = cartItems.value.find(item => item.id === productId)
  if (item) {
    cartStore.removeFromCart(productId)
    notificationStore.info(`${item.name} removed from cart`)
    
    // Animate cart item removal
    const cartItem = event.target.closest('.cart-item')
    if (cartItem) {
      gsap.to(cartItem, {
        x: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      })
    }
  }
}

const updateQuantity = (productId, newQuantity) => {
  if (newQuantity <= 0) {
    removeFromCart(productId)
  } else {
    cartStore.updateQuantity(productId, newQuantity)
  }
}

const clearCart = () => {
  if (cartCount.value > 0) {
    // Animate cart clearing
    if (cartDetails.value) {
      gsap.to(cartDetails.value, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          cartStore.clearCart()
          showCartDetails.value = false
          notificationStore.info('Cart cleared')
        }
      })
    } else {
      cartStore.clearCart()
      showCartDetails.value = false
      notificationStore.info('Cart cleared')
    }
  }
}

const toggleCartDetails = () => {
  showCartDetails.value = !showCartDetails.value
  
  // Animate cart details appearance
  if (showCartDetails.value) {
    setTimeout(() => {
      if (cartDetails.value) {
        gsap.fromTo(cartDetails.value,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
        )
      }
    }, 50)
  }
}

const proceedToCheckout = () => {
  notificationStore.info('Checkout functionality coming soon!')
}

const getProductIcon = (productId) => {
  const product = products.value.find(p => p.id === productId)
  return product ? product.icon : 'fas fa-chess'
}

const buyNow = (product) => {
  selectedProduct.value = product
  showPaymentModal.value = true
}

const closePaymentModal = () => {
  showPaymentModal.value = false
  selectedProduct.value = null
}

const handlePaymentSuccess = () => {
  closePaymentModal()
  notificationStore.success('Payment successful! Your order is being processed.')
}
</script>

<style lang="scss" scoped>
.shop-page {
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
  }

  p {
    color: var(--text-secondary);
    font-size: $text-lg;
  }
}

.header-bg-media {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.header-bg-image {
  width: 110%;
  height: 110%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.05);
  filter: brightness(0.55) contrast(1.1);
  transition: transform $duration-slow $ease-out;

  :root.light & {
    filter: brightness(0.8) contrast(1.05);
  }
}

.header-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.8) 100%);
  z-index: 2;
}

.parallax-bg .container,
.parallax-bg .header-content {
  position: relative;
  z-index: 3;
}

.shop-content {
  padding: $space-12 0;
}

.cart-summary {
  background-color: var(--bg-secondary);
  border-radius: $radius-lg;
  padding: $space-4 $space-6;
  margin-bottom: $space-8;
  border: 1px solid var(--border-color);

  .cart-info {
    display: flex;
    align-items: center;
    gap: $space-4;
    color: var(--text-primary);
    font-weight: $font-medium;

    i {
      color: var(--text-accent);
    }

    .cart-total {
      margin-left: auto;
      color: var(--text-accent);
      font-weight: $font-bold;
    }
  }

  .cart-actions {
    display: flex;
    gap: $space-3;
    margin-top: $space-3;
  }
}

.cart-details {
  background-color: var(--bg-secondary);
  border-radius: $radius-lg;
  padding: $space-6;
  margin-bottom: $space-8;
  border: 1px solid var(--border-color);

  h3 {
    color: var(--text-primary);
    margin-bottom: $space-6;
    font-size: $text-xl;
    font-weight: $font-bold;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    margin-bottom: $space-6;
  }

  .cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-4;
    background-color: var(--bg-primary);
    border-radius: $radius-md;
    border: 1px solid var(--border-color);

    .item-info {
      display: flex;
      align-items: center;
      gap: $space-4;
      flex: 1;

      .item-icon {
        color: var(--text-accent);
        font-size: $text-xl;
        width: 24px;
        text-align: center;
      }

      .item-details {
        h4 {
          color: var(--text-primary);
          font-size: $text-base;
          font-weight: $font-semibold;
          margin-bottom: $space-1;
        }

        .item-price {
          color: var(--text-secondary);
          font-size: $text-sm;
          margin: 0;
        }
      }
    }

    .item-controls {
      display: flex;
      align-items: center;
      gap: $space-3;

      .quantity-controls {
        display: flex;
        align-items: center;
        gap: $space-2;
        padding: $space-1 $space-3;
        background-color: var(--bg-secondary);
        border-radius: $radius-md;
        border: 1px solid var(--border-color);

        .quantity {
          color: var(--text-primary);
          font-weight: $font-medium;
          min-width: 20px;
          text-align: center;
        }
      }
    }

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
      gap: $space-3;

      .item-controls {
        align-self: flex-end;
      }
    }
  }

  .cart-total-section {
    border-top: 1px solid var(--border-color);
    padding-top: $space-4;
    display: flex;
    flex-direction: column;
    gap: $space-4;
    align-items: flex-end;

    .total-row {
      color: var(--text-primary);
      font-size: $text-lg;

      strong {
        color: var(--text-accent);
      }
    }

    @media (max-width: 640px) {
      align-items: stretch;
    }
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: $space-8;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $space-6;
  }
}

.product-card {
  background-color: var(--bg-primary);
  border-radius: $radius-xl;
  padding: $space-8;
  box-shadow: var(--shadow);
  transition: all $duration-base $ease-out;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
    border-color: var(--text-accent);

    .product-image i {
      transform: scale(1.1);
      color: #fff200; /* lighter gold equivalent */
    }
  }
}

.product-image {
  text-align: center;
  margin-bottom: $space-6;

  i {
    font-size: $text-5xl;
    color: var(--text-accent);
    transition: all $duration-base $ease-out;
  }
}

.product-content {
  h3 {
    color: var(--text-primary);
    font-size: $text-xl;
    font-weight: $font-bold;
    margin-bottom: $space-4;
    text-align: center;
  }

  .product-description {
    color: var(--text-secondary);
    text-align: center;
    margin-bottom: $space-6;
    line-height: 1.6;
  }
}

.product-features {
  margin-bottom: $space-8;

  ul {
    list-style: none;

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
}

.product-footer {
  .product-price {
    text-align: center;
    margin-bottom: $space-6;

    .price {
      font-family: $font-display;
      font-size: $text-2xl;
      font-weight: $font-bold;
      color: var(--text-accent);
    }
  }

  .product-actions {
    display: flex;
    flex-direction: column;
    gap: $space-3;

    .btn {
      width: 100%;
      justify-content: center;

      i {
        margin-right: $space-2;
      }
    }
  }
}

@media (max-width: 480px) {
  .product-card {
    padding: $space-6;
  }

  .product-image i {
    font-size: $text-4xl;
  }
}
</style>