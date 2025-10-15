import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Shop from '@/pages/Shop.vue'
import About from '@/pages/About.vue'
import Contact from '@/pages/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Khalex Chess - Unleash Young Minds\' Potential',
      description: 'Professional chess training for youth in Kenya'
    }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    meta: {
      title: 'Chess Equipment Shop - Khalex Chess',
      description: 'High-quality chess boards, bags, and clocks'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About Us - Khalex Chess',
      description: 'Learn about our mission and founder Anthony Paschal'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact Us - Khalex Chess',
      description: 'Get in touch for chess training and coaching'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Update page title and meta description
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.content = to.meta.description
    }
  }
  next()
})

export default router