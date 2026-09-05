# 🌍 Tripona - Modern Travel & Tour Booking Platform

Tripona is a production-grade travel booking web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Zustand**. It delivers an intuitive, accessible, and responsive user experience for exploring adventure tours, filtering destinations, and completing a multi-step booking flow with real-time state persistence.

---

## ✨ Features

- 🚀 **Next.js App Router Architecture**: Fast SSR, dynamic routing, and optimized layout hierarchy.
- 🎨 **Modern UI/UX & Tailwind CSS**: Clean, responsive, and mobile-first interface.
- ⚡ **Multi-Step Booking Flow**:
  - Step 1: Tour Date & Guest Count selection with dynamic pricing calculation.
  - Step 2: Passenger detail validation.
  - Step 3: Comprehensive booking review and cost breakdown.
  - Step 4: Simulated secure payment gateway and instant confirmation receipt.
- 🔄 **Global State Management (Zustand)**: Seamless state synchronization across complex multi-step forms with persistent session support.
- 🔍 **Interactive Filtering & Search**: Real-time filtering by category, price range, duration, and keywords with synchronized URL search parameters.
- ♿ **Accessibility & Performance (A11y & Core Web Vitals)**:
  - Optimized images with `next/image` (`sizes`, fallback handling, and LCP priority).
  - ARIA attributes and keyboard navigable elements.
  - Smooth page transitions and automatic scroll-to-top on step change.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Code Quality**: ESLint & Prettier

---

## 📁 Project Structure
```text
src/
├── app/
│   ├── layout.tsx                # Root layout (Header, Footer, Meta)
│   ├── page.tsx                  # Home page (Hero, Featured Trips, Categories)
│   ├── trips/
│   │   ├── page.tsx              # Trips catalog (Search, Filters, Grid)
│   │   └── [slug]/page.tsx       # Dynamic trip details & itinerary
│   └── booking/
│       ├── page.tsx              # Multi-step booking orchestrator
│       └── confirmation/page.tsx # Booking confirmation & receipt view
├── components/
│   ├── common/                   # Shared UI components (Header, Footer, etc.)
│   ├── home/                     # Landing page sections
│   ├── trips/                    # Catalog filters, trip cards, detail views
│   └── booking/                  # Step components (Step 1 to 4 & summary)
├── store/
│   └── bookingStore.ts           # Zustand store for booking flow
├── types/
│   └── trip.ts                   # TypeScript interfaces and domain types
└── data/
└── trips.ts                  # Mock data for destinations & packages
