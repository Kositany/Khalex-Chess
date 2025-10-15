# Khalex Chess - Professional Chess Training Website

A complete, production-ready Vue 3 website for Khalex Chess with Node.js backend, featuring MPESA mobile payments, newsletter subscription, contact forms, e-commerce functionality, and advanced animations.

## 🎯 Project Overview

**Brand**: Khalex Chess  
**Slogan**: "Unleash Young Minds' Potential Through Chess"  
**Colors**: Black (primary), Gold (accent), White (text)  
**Mission**: Professional chess training for youth development

## ✨ Features

### Frontend (Vue 3 + Composition API)
- ⚡ **Modern Stack**: Vue 3, Composition API, Pinia state management
- 🎨 **Responsive Design**: Mobile-first, desktop-optimized
- 🌓 **Dark/Light Mode**: Persistent theme toggle
- 🎬 **GSAP Animations**: Scroll-triggered animations, hover effects
- 🛒 **E-commerce**: Shopping cart, product catalog
- 📱 **Mobile Payments**: MPESA STK Push integration
- 📧 **Contact Forms**: Newsletter subscription, contact form
- ♿ **Accessibility**: ARIA labels, keyboard navigation
- 🚀 **Performance**: Lazy loading, optimized assets

### Backend (Node.js + Express)
- 🔐 **Security**: Helmet, CORS, rate limiting
- 💳 **MPESA API**: STK Push payments integration
- 📊 **Database**: MongoDB with Mongoose
- 📧 **Email**: Nodemailer for notifications
- 📝 **Validation**: Joi validation middleware
- 🔍 **Logging**: Comprehensive error tracking
- 🔒 **Environment**: Secure configuration management

## 🛍️ Products & Services

### Chess Equipment Shop
- **Rollable Rubber Chess Boards** - Ksh 3,200
- **Chess Bags** - Ksh 500  
- **Chess Clocks** - Ksh 4,799

### Training Programs
- School Programs with tracking & tournaments
- Private Coaching (one-on-one/small groups)
- Institutional Training for clubs
- Holiday Chess Camps (5-week intensive)
- Tournament Organization & Events

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or cloud)
- MPESA Developer Account (for payments)

### Installation

1. **Clone and Install**
   ```bash
   cd "Khalex Chess"
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Update .env with your credentials:
   # - MongoDB URI
   # - MPESA credentials
   # - Email configuration
   ```

3. **Start Development**
   ```bash
   # Frontend only
   npm run dev
   
   # Backend only  
   npm run dev:server
   
   # Both frontend + backend
   npm run dev:full
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
├── src/                    # Vue.js frontend
│   ├── components/         # Reusable Vue components
│   │   ├── layout/         # Header, Footer
│   │   ├── sections/       # Page sections
│   │   └── ui/             # Form, Modal, etc.
│   ├── pages/              # Route pages
│   ├── store/              # Pinia stores
│   ├── composables/        # Composition functions
│   ├── styles/             # SCSS stylesheets
│   └── router/             # Vue Router config
├── server/                 # Node.js backend
│   ├── routes/             # API endpoints
│   ├── models/             # Database models
│   ├── middleware/         # Express middleware
│   └── utils/              # Helper functions
└── public/                 # Static assets
```

## 🎨 Design System

### Brand Colors
```scss
$black: #000000;           // Primary background
$gold: #FFD700;            // Accent color
$white: #ffffff;           // Text color
```

### Typography
- **Primary**: Inter (body text)
- **Display**: Playfair Display (headings)
- **Weights**: 300-900 range

### Components
- Buttons with hover animations
- Cards with elevation effects
- Forms with validation
- Modals with backdrop blur
- Toast notifications

## 💳 MPESA Integration

### Payment Flow
1. User initiates payment
2. Backend validates request
3. STK Push sent to phone
4. User enters PIN on phone
5. Payment callback processed
6. Status updated in database
7. User notified of result

### Configuration
```env
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=your_callback_url
```

## 📧 Email Integration

### Features
- Newsletter subscription confirmations
- Contact form auto-replies
- Admin notifications
- HTML email templates

### Setup
```env
EMAIL_USER=khaltonyx@gmail.com
EMAIL_PASS=your_app_password
```

## 🔧 API Endpoints

### Payments
- `POST /api/pay` - Initiate MPESA payment
- `POST /api/callback` - MPESA callback handler
- `GET /api/payment-status/:id` - Check payment status

### Communications
- `POST /api/newsletter` - Newsletter subscription
- `POST /api/contact` - Contact form submission

### System
- `GET /api/health` - Health check

## 🎭 Animations & Effects

### GSAP Animations
- Hero section entrance
- Scroll-triggered reveals
- Hover micro-interactions
- Page transitions
- Loading animations

### CSS Effects
- Smooth theme transitions
- Responsive hover states
- Focus indicators
- Loading spinners

## 📱 Mobile Optimization

### Responsive Features
- Mobile-first CSS approach
- Touch-friendly interactions
- Optimized form inputs
- Swipe gestures support
- PWA-ready structure

### Performance
- Image lazy loading
- Bundle code splitting
- CSS purging
- Gzip compression

## 🔒 Security Features

### Frontend
- Input validation
- XSS protection
- CSRF tokens
- Secure routing

### Backend
- Helmet security headers
- Rate limiting
- Request validation
- Error handling
- Secure cookie handling

## 🌍 SEO & Accessibility

### SEO
- Meta tags optimization
- Semantic HTML structure
- Open Graph tags
- Sitemap generation
- Performance optimization

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Forms validate properly
- [ ] MPESA payments work
- [ ] Emails are sent
- [ ] Mobile responsiveness
- [ ] Theme switching
- [ ] Shopping cart functionality

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Page load time < 3s
- [ ] Mobile performance
- [ ] Bundle size optimization

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to hosting service
```

### Backend Deployment
```bash
# Set NODE_ENV=production
# Configure production database
# Deploy to hosting service
```

### Environment Variables
- Update API URLs for production
- Configure production database
- Set secure MPESA credentials
- Enable email service

## 📞 Contact Information

- **Email**: khaltonyx@gmail.com
- **Instagram**: @khalex._.chess
- **Website**: https://khalexchess.com

## 📄 License

© 2025 Khalex Chess - All Rights Reserved.  
Unleashing Young Minds' Potential Through Chess.

---

**Built with ❤️ for chess education and youth development**