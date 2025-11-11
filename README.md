# Luxury Hotel Website

A luxurious hotel website with interactive storytelling and booking system built with React, TypeScript, Material UI, and Framer Motion.

## Features

### 🏨 Complete Hotel Experience
- **Hero Section**: Full-screen hero with animated tagline and pulsing "Book Now" button
- **Featured Rooms**: Horizontal carousel with smooth slide transitions and hover effects
- **Restaurant Menu**: Categorized menu with staggered fade-in animations
- **Interactive Booking Flow**: Material UI Stepper with 4-step booking process

### 🔐 Authentication
- **Google Login**: Simulated Google authentication
- **Email/Password Login**: Traditional login form
- **User Account**: Profile management and booking history

### 🛏️ Room Booking
- **Room Selection**: Grid of room cards with hover animations
- **Filtering**: Filter by price range and amenities
- **Date Selection**: Calendar input for check-in/check-out dates
- **Guest Selection**: Number of guests selector

### 🍽️ Restaurant Experience
- **Menu Categories**: Starters, Main Course, Desserts, Drinks
- **Interactive Menu**: Add/remove items with smooth animations
- **Table Booking**: Reserve tables with optional menu pre-selection

### 💰 Local Context
- **Ugandan Shillings (UGX)**: All prices displayed in local currency
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### ✨ Animations & Interactions
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Spring Animations**: Button hover effects and card lifts
- **Staggered Animations**: Menu items and room cards appear sequentially
- **Success Animations**: Confetti-like confirmation with green checkmark

## Technology Stack

- **React 18** with TypeScript
- **Material UI 5** for components and theming
- **Framer Motion** for animations
- **React Router** for navigation
- **Day.js** for date handling
- **Context API** for state management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel_website
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## User Journey

### 1. Landing Experience
- User lands on full-screen hero with luxury hotel imagery
- Animated tagline: "Experience Luxury, Comfort, and Taste – All in One Place"
- Pulsing "Book Now" button draws attention
- Scroll reveals featured rooms and restaurant highlights

### 2. Authentication Flow
- Click "Login" to open animated modal
- Choose Google login or email/password
- Smooth modal animations with Framer Motion
- User name appears in top-right corner after login

### 3. Room Exploration
- Navigate to "Rooms" page
- Filter rooms by price or amenities with animated dropdowns
- Hover effects on room cards (lift and scale)
- Click "Book This Room" to start booking flow

### 4. Restaurant Experience
- Browse menu by category with smooth tab transitions
- Add items to selection with spring animations
- Selected items appear in summary with chips
- Book table with or without pre-selected menu items

### 5. Booking Process (Material UI Stepper)
- **Step 1**: Select room or table type with spring feedback
- **Step 2**: Choose dates and guests with calendar picker
- **Step 3**: Optional menu selection with animated item counts
- **Step 4**: Confirmation with animated success state

### 6. Account Management
- View booking history with hover animations
- See past and upcoming reservations
- Payment history and booking details

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation with login modal
│   └── BookingFlow.tsx     # Material UI Stepper booking
├── pages/
│   ├── Homepage.tsx        # Hero section and featured content
│   ├── Rooms.tsx          # Room grid with filtering
│   ├── Restaurant.tsx     # Menu with categories and selection
│   └── Account.tsx        # User profile and booking history
├── contexts/
│   ├── AuthContext.tsx    # Authentication state management
│   └── BookingContext.tsx # Booking and menu selection state
├── App.tsx                # Main app with routing
└── index.tsx             # App entry point with theme
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Design Philosophy

The website creates a **luxurious, visually rich experience** where:
- Animations guide attention naturally without being overwhelming
- Every interaction feels alive with spring physics and smooth transitions
- Ugandan Shillings connect users to local context
- Material UI provides consistent, accessible components
- Framer Motion adds delightful micro-interactions

## Future Enhancements

- Real payment integration
- Email confirmation system
- Admin dashboard for hotel management
- Real-time availability checking
- Multi-language support
- Progressive Web App (PWA) features

---

*Experience luxury, comfort, and taste – all in one place.*
