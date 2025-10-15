import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const cartCount = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const cartTotal = computed(() => 
    items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  )

  const addToCart = (product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
    
    // Save to localStorage
    localStorage.setItem('khalex-chess-cart', JSON.stringify(items.value))
  }

  const removeFromCart = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      localStorage.setItem('khalex-chess-cart', JSON.stringify(items.value))
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        localStorage.setItem('khalex-chess-cart', JSON.stringify(items.value))
      }
    }
  }

  const clearCart = () => {
    items.value = []
    localStorage.removeItem('khalex-chess-cart')
  }

  const loadCart = () => {
    const savedCart = localStorage.getItem('khalex-chess-cart')
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
  }

  // Helper methods for call-to-order system
  const getOrderSummary = () => {
    return {
      items: items.value.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price
      })),
      totalQuantity: cartCount.value,
      totalAmount: cartTotal.value
    }
  }

  const generateOrderText = () => {
    if (items.value.length === 0) {
      return 'Cart is empty'
    }

    let orderText = 'Order Summary:\n\n'
    
    items.value.forEach((item, index) => {
      orderText += `${index + 1}. ${item.name}\n`
      orderText += `   Quantity: ${item.quantity}\n`
      orderText += `   Price: Ksh ${item.price.toLocaleString()}\n`
      orderText += `   Subtotal: Ksh ${(item.quantity * item.price).toLocaleString()}\n\n`
    })

    orderText += `Total Items: ${cartCount.value}\n`
    orderText += `Total Amount: Ksh ${cartTotal.value.toLocaleString()}\n\n`
    orderText += 'Please confirm availability and delivery details.'

    return orderText
  }

  const hasItems = computed(() => items.value.length > 0)

  const isEmpty = computed(() => items.value.length === 0)

  return {
    items,
    cartCount,
    cartTotal,
    hasItems,
    isEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    getOrderSummary,
    generateOrderText
  }
})