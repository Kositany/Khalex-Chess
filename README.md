# Khalex Chess Academy

# Khalex Chess - Professional Chess Training Website

A modern, award-winning Vue.js website for Khalex Chess Academy featuring advanced GSAP animations, smooth scrolling, and immersive user experiences.

A complete, production-ready Vue 3 website for Khalex Chess with Node.js backend, featuring MPESA mobile payments, newsletter subscription, contact forms, e-commerce functionality, and advanced animations.

![Khalex Chess Academy](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white) ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## 🎯 Project Overview

## 🏆 Features

**Brand**: Khalex Chess  

### 🎨 Design & Animation**Slogan**: "Unleash Young Minds' Potential Through Chess"  

- **Cinematic GSAP Animations**: Advanced timeline-based animations with custom easing**Colors**: Black (primary), Gold (accent), White (text)  

- **Smooth Scrolling**: Lenis-powered smooth scrolling with ScrollTrigger integration**Mission**: Professional chess training for youth development

- **Magnetic Hover Effects**: Interactive button and element hover animations

- **Aurora Background Effects**: Dynamic gradient animations with parallax depth## ✨ Features

- **Split Text Animations**: Character and word-level text entrance effects

### Frontend (Vue 3 + Composition API)

### 🎯 User Experience- ⚡ **Modern Stack**: Vue 3, Composition API, Pinia state management

- **Hero Section**: Immersive hero with animated statistics and call-to-action buttons- 🎨 **Responsive Design**: Mobile-first, desktop-optimized

- **Interactive Chess Board**: 3D animated chess pieces with hover effects- 🌓 **Dark/Light Mode**: Persistent theme toggle

- **Responsive Design**: Mobile-first approach with optimized animations- 🎬 **GSAP Animations**: Scroll-triggered animations, hover effects

- **Theme Support**: Dark and light mode with seamless transitions- 🛒 **E-commerce**: Shopping cart, product catalog

- **Loading Animations**: Chess-themed loading screens and transitions- 📱 **Mobile Payments**: MPESA STK Push integration

- 📧 **Contact Forms**: Newsletter subscription, contact form

### 🛒 E-commerce Features- ♿ **Accessibility**: ARIA labels, keyboard navigation

- **Product Shop**: Chess equipment showcase with animated product cards- 🚀 **Performance**: Lazy loading, optimized assets

- **Shopping Cart**: Persistent cart with quantity management

- **Payment Integration**: Modal-based payment system### Backend (Node.js + Express)

- **Inventory Management**: Product management with real-time updates- 🔐 **Security**: Helmet, CORS, rate limiting

- 💳 **MPESA API**: STK Push payments integration

### 📧 Communication- 📊 **Database**: MongoDB with Mongoose

- **Contact Forms**: Animated contact forms with validation- 📧 **Email**: Nodemailer for notifications

- **Newsletter Subscription**: Email collection with admin management- 📝 **Validation**: Joi validation middleware

- **Notification System**: Toast notifications for user feedback- 🔍 **Logging**: Comprehensive error tracking

- 🔒 **Environment**: Secure configuration management

## 🚀 Quick Start

## 🛍️ Products & Services

### Prerequisites

- Node.js 16+ ### Chess Equipment Shop

- npm or yarn- **Rollable Rubber Chess Boards** - Ksh 3,200

- Git- **Chess Bags** - Ksh 500  

- **Chess Clocks** - Ksh 4,799

### Installation

### Training Programs

1. **Clone the repository**- School Programs with tracking & tournaments

   ```bash- Private Coaching (one-on-one/small groups)

   git clone https://github.com/Kositany/Khalex-Chess.git- Institutional Training for clubs

   cd Khalex-Chess- Holiday Chess Camps (5-week intensive)

   ```- Tournament Organization & Events



2. **Install dependencies**## 🚀 Quick Start

   ```bash

   npm install### Prerequisites

   ```- Node.js 16+ and npm

- MongoDB (local or cloud)

3. **Start development server**- MPESA Developer Account (for payments)

   ```bash

   npm run dev### Installation

   ```

1. **Clone and Install**

4. **Build for production**   ```bash

   ```bash   cd "Khalex Chess"

   npm run build   npm install

   ```   ```



## 🛠️ Tech Stack2. **Environment Setup**

   ```bash

### Frontend   # Copy environment template

- **Vue 3**: Composition API with `<script setup>`   cp .env.example .env

- **Vue Router**: Client-side routing with page transitions   

- **Pinia**: State management for cart, theme, and notifications   # Update .env with your credentials:

- **GSAP**: Professional animation library with ScrollTrigger   # - MongoDB URI

- **Lenis**: Smooth scrolling implementation   # - MPESA credentials

- **Sass**: Advanced styling with mixins and variables   # - Email configuration

   ```

### Build Tools

- **Vite**: Fast build tool and development server3. **Start Development**

- **PostCSS**: CSS processing and optimization   ```bash

- **ESLint**: Code linting and formatting   # Frontend only

   npm run dev

## 📁 Project Structure   

   # Backend only  

```   npm run dev:server

src/   

├── components/          # Reusable components   # Both frontend + backend

│   ├── layout/         # Header, Footer, Navigation   npm run dev:full

│   ├── sections/       # Page sections (Hero, Services, etc.)   ```

│   └── ui/            # UI components (Modals, Forms, etc.)

├── composables/        # Vue composables4. **Access Application**

│   ├── useGSAP.js     # GSAP animations and utilities   - Frontend: http://localhost:3000

│   ├── useApi.js      # API communication   - Backend API: http://localhost:5000

│   └── ...

├── pages/             # Route components## 📁 Project Structure

├── router/            # Vue Router configuration

├── store/             # Pinia stores```

├── styles/            # Sass stylesheets├── src/                    # Vue.js frontend

├── assets/            # Static assets (images, videos)│   ├── components/         # Reusable Vue components

└── utils/             # Utility functions│   │   ├── layout/         # Header, Footer

```│   │   ├── sections/       # Page sections

│   │   └── ui/             # Form, Modal, etc.

## 🎯 Key Components│   ├── pages/              # Route pages

│   ├── store/              # Pinia stores

### HeroSection.vue│   ├── composables/        # Composition functions

- Split text animations with GSAP│   ├── styles/             # SCSS stylesheets

- Magnetic hover effects on buttons│   └── router/             # Vue Router config

- Parallax aurora background├── server/                 # Node.js backend

- Animated counter statistics│   ├── routes/             # API endpoints

- Interactive chess board│   ├── models/             # Database models

│   ├── middleware/         # Express middleware

### GSAP Composable (`useGSAP.js`)│   └── utils/              # Helper functions

- Custom animation presets└── public/                 # Static assets

- Split text functionality (free alternative to SplitText)```

- Magnetic hover implementation

- Scroll-triggered animations## 🎨 Design System

- Timeline management

### Brand Colors

## 🎨 Color Palette```scss

$black: #000000;           // Primary background

- **Primary Gold**: `#d4af37` (Muted, sophisticated gold)$gold: #FFD700;            // Accent color

- **Secondary**: Gradient blends with pink and orange accents$white: #ffffff;           // Text color

- **Background**: Dynamic gradients with aurora effects```

- **Text**: High contrast with theme support

### Typography

## 📱 Responsive Design- **Primary**: Inter (body text)

- **Display**: Playfair Display (headings)

- Mobile-first approach- **Weights**: 300-900 range

- Breakpoint system with Sass variables

- Optimized animations for different screen sizes### Components

- Touch-friendly interactions- Buttons with hover animations

- Cards with elevation effects

## 🔧 Configuration- Forms with validation

- Modals with backdrop blur

### Environment Variables- Toast notifications

Create a `.env` file based on `.env.example`:

```env## 💳 MPESA Integration

VITE_API_URL=your-api-url

VITE_PAYMENT_KEY=your-payment-key### Payment Flow

```1. User initiates payment

2. Backend validates request

### Git Configuration3. STK Push sent to phone

Update your Git user information:4. User enters PIN on phone

```bash5. Payment callback processed

git config user.name "Your Name"6. Status updated in database

git config user.email "your-email@example.com"7. User notified of result

```

### Configuration

## 🚦 Performance```env

MPESA_CONSUMER_KEY=your_key

- Lazy loading for components and routesMPESA_CONSUMER_SECRET=your_secret

- Optimized GSAP animations with `will-change`MPESA_SHORTCODE=174379

- Efficient scroll event handlingMPESA_PASSKEY=your_passkey

- Image optimization and compressionMPESA_CALLBACK_URL=your_callback_url

- Code splitting with Vite```



## 🤝 Contributing## 📧 Email Integration



1. Fork the repository### Features

2. Create a feature branch (`git checkout -b feature/amazing-feature`)- Newsletter subscription confirmations

3. Commit your changes (`git commit -m 'Add amazing feature'`)- Contact form auto-replies

4. Push to the branch (`git push origin feature/amazing-feature`)- Admin notifications

5. Open a Pull Request- HTML email templates



## 📄 License### Setup

```env

This project is licensed under the MIT License.EMAIL_USER=khaltonyx@gmail.com

EMAIL_PASS=your_app_password

## 🎯 Roadmap```



- [ ] Advanced chess game integration## 🔧 API Endpoints

- [ ] User authentication system

- [ ] Tournament management### Payments

- [ ] Video lesson platform- `POST /api/pay` - Initiate MPESA payment

- [ ] Mobile app development- `POST /api/callback` - MPESA callback handler

- [ ] Multi-language support- `GET /api/payment-status/:id` - Check payment status



## 💬 Support### Communications

- `POST /api/newsletter` - Newsletter subscription

For support, email khaltonyx@gmail.com or create an issue on GitHub.- `POST /api/contact` - Contact form submission



## 🙏 Acknowledgments### System

- `GET /api/health` - Health check

- GSAP for professional animation capabilities

- Lenis for smooth scrolling implementation## 🎭 Animations & Effects

- Vue.js community for excellent documentation

### GSAP Animations

---- Hero section entrance

- Scroll-triggered reveals

Made with ❤️ for chess enthusiasts in Kenya- Hover micro-interactions

- Page transitions

**Contact**: khaltonyx@gmail.com | **Instagram**: @khalex._.chess- Loading animations

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
=======
# Khalex-Chess
Chess Website
>>>>>>> 9468ca56cdf5880407f07fbee32b22f1d60ed2fc
