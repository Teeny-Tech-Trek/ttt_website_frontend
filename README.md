<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=3,11,19&height=260&section=header&text=TTT%20Frontend&fontSize=72&fontColor=ffffff&fontAlignY=42&desc=Teeny%20Tech%20Trek%20Marketing%20SPA%20%E2%80%A2%20React%20%E2%80%A2%20Vite&descAlignY=62&descSize=20&animation=fadeIn&stroke=06B6D4&strokeWidth=1" width="100%"/>

</div>

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=800&color=06B6D4&center=true&vCenter=true&multiline=false&repeat=true&width=680&height=50&lines=Blog+%E2%80%A2+Events+%E2%80%A2+Packages+%E2%80%A2+Services+Showcase+%F0%9F%92%A8;React+18+%2B+Vite+%2B+TypeScript+%E2%9A%A1;Embedded+AI+Chatbot+Widget+%2B+Lead+Capture+%F0%9F%A4%96;SEO+Optimized+%2B+Vercel+Deployed+%F0%9F%9A%80)](https://git.io/typing-svg)

</div>
<br/>
A modern website for an AI agency specializing in custom AI solutions, chatbots, and automation systems. Built with React, TypeScript, and Tailwind CSS.

![Teeny Tech Trek](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

<br/>

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Query](https://img.shields.io/badge/React_Query-5.85-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![React Helmet](https://img.shields.io/badge/React_Helmet-SEO-000000?style=for-the-badge)](https://github.com/nfl/react-helmet-async)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## 🎯 Overview

**TTT Frontend** is the marketing & sales SPA for [teenytechtrek.com](https://www.teenytechtrek.com). It showcases services (AI chatbots, agentic workflows, process automation), displays case studies by industry, lists blog posts and events, offers service packages, and embeds a **floating AI chatbot widget** for lead capture.

**Stack:** React 18 + Vite + TypeScript + Tailwind CSS. SEO-optimized with React Helmet. Deployed on Vercel.

---

## 🏗️ Architecture

```
Public-facing SPA (Vercel)
├── Home page
│   ├─ Hero + value prop
│   ├─ Services list
│   ├─ Pricing overview
│   ├─ FAQ
│   ├─ CTA buttons ("Learn More" → scroll to service)
│   └─ Newsletter signup
│
├── Service pages (/services/*)
│   ├─ AI Chatbots
│   ├─ Agentic Workflows
│   ├─ Smart Process Automation
│   ├─ AI Apps & Micro SaaS
│   └─ Claude Automations
│
├── Use cases / case studies (/healthcare, /ecommerce, etc.)
├── Blog (/blogs, /blog/:slug)
├── Events (/event/:slug)
├── Packages (/packages/:slug)
├── Community page
├── Pilot program
├── About Us
├── Legal pages (refund, privacy, terms)
└── Floating Chatbot Widget
    ├─ Lead capture form (gated)
    ├─ Chat interface (SSE streaming)
    ├─ Share modal (QR code + social)
    └─ Route inference (internal navigation)

Backend Integration
└─ Node API (api.teenytechtrek.com)
   └─ Chatbot proxy (FastAPI :8000)
```

---

## 🛠️ Tech Stack

| Concern | Technology |
|:---|:---|
| **Framework** | React 18.3.1 + React Router 7.5.3 |
| **Build** | Vite 7.0.0 |
| **Language** | TypeScript 5.5.3 |
| **Styling** | Tailwind CSS 3.4.1 (merge, clsx, CVA) |
| **HTTP** | Axios 1.9.0 |
| **Server State** | React Query 5.85 |
| **SEO** | React Helmet Async |
| **Animation** | Framer Motion + GSAP |
| **3D/Canvas** | Three.js + Spline |
| **Charts** | Recharts |
| **Carousel** | react-slick |
| **Icons** | Lucide React + React Icons |
| **Notifications** | React Hot Toast |
| **Deploy** | Vercel (SPA rewrite) |

---

## 📁 Project Structure

```
src/
├── App.tsx                      # Routes + provider setup
├── main.tsx                     # React root
├── index.css                    # Tailwind + theme CSS vars
├── api/axios.ts                 # Axios singleton + token interceptor
├── context/AuthContext.tsx      # Auth provider (stub — no live routes)
│
├── routes/Routes.tsx            # Route definitions (React Router v6)
│
├── pages/
│   ├── HomePage.tsx             # Hero + landing sections
│   ├── ChatbotModal.tsx         # The chatbot widget (~1100 lines, central)
│   ├── ChatbotButton.tsx        # Floating toggle
│   ├── public/
│   │   ├─ ChatbotsPage, AgenticWorkflowsPage, etc.
│   │   ├─ BlogSection.jsx, BlogSingleView.jsx
│   │   ├─ SingleEventPage, PackageDetailPage
│   │   ├─ Community, Pilot, AuditForm, AboutUs, TechTrekkerAi
│   │   └─ view-cases/* (industry case studies)
│   └── LandingPages/            # Hero, Navbar, Footer, Stats, CTA, etc.
│
├── components/
│   ├── ChatbotButton.tsx, ChatbotModal.tsx
│   ├── layout/                  # Navbar, Footer, Layout components
│   ├── home/                    # Hero, Services, Pricing, Contact, FAQ, Blog
│   ├── policy/                  # Refund, Privacy, Terms
│   ├── admin/                   # Unrouted admin scaffolding
│   ├── ui/                      # Generic UI primitives
│   └── data/                    # Static lookup tables
│
├── services/
│   ├── contact.service.ts       # POST /api/contact
│   ├── blog.service.ts          # GET /api/blogs, /api/blogs/:slug
│   ├── event.service.ts         # GET /api/events
│   ├── package.service.ts       # GET /api/packages
│   └── newsletter.service.ts    # Newsletter signup
│
├── hooks/
│   ├── useBrainScene.ts         # Three.js scene setup
│   ├── useStarfield.ts          # Canvas starfield animation
│   └── use-mobile.ts            # Mobile breakpoint detection
│
├── lib/
│   ├── queryClient.ts           # React Query client config
│   └── utils.ts                 # Helpers
│
├── utils/
│   ├── chatbotRouter.ts         # Route inference + navigation
│   └── leadCapture.ts           # Lead gate + localStorage
│
├── seo/RouteSeo.tsx             # Per-route meta tags (Helmet)
├── data/blogData.ts             # Static blog fallback
├── assets/                      # Logos, OG images, case-study imagery
└── images/                      # Image assets
```

---

## 🚀 Getting Started

### 1. Install & Configure

```bash
npm install

# Create .env.local
echo "VITE_API_BASE_URL=http://localhost:5000" > .env.local
```

### 2. Environment Variables

| Var | Purpose | Local | Production |
|:---|:---|:---|:---|
| `VITE_API_BASE_URL` | Backend URL | `http://localhost:5000` | `https://api.teenytechtrek.com` |
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key | `rzp_test_...` | `rzp_live_...` |

> **Note:** Google OAuth client ID is currently **hardcoded** in `src/main.tsx` (should be an env var).

### 3. Run Locally

```bash
npm run dev          # Vite dev server → http://localhost:5173
npm run build        # Production bundle
npm run lint         # ESLint
npm run preview      # Serve production build
```

> Make sure the Node backend is running on `:5000`.

---

## 📖 Key Features

### 1. Services Showcase

**Service pages** (`/services/*`):
- AI Chatbots
- Agentic Workflows
- Process Automation
- AI Apps & Micro SaaS
- Claude Automations

Each with hero image, features, use cases, pricing CTA.

### 2. Case Studies

**By industry** (`/healthcare`, `/ecommerce`, `/financial-services`, etc.):
- Problem statement
- Solution overview
- Results / metrics
- CTA to contact

### 3. Blog & Events

**Blog** (`/blogs`, `/blog/:slug`):
- Static blog data from `blogData.ts`
- Markdown or rich content rendering
- SEO meta tags per post

**Events** (`/event/:slug`):
- Event details + registration link

### 4. Packages / Pricing

**Service packages** (`/packages/:slug`):
- Price, features, duration
- CTA to book consultation (Razorpay)

### 5. Chatbot Widget

**Floating chatbot** (`ChatbotModal.tsx`):
- Opens on button click
- Lead capture gate (email form)
- Chat interface (SSE streaming from FastAPI)
- Message history
- Share modal (QR + social links)
- Route inference — "Learn More" buttons navigate internally

**Routing helper** (`chatbotRouter.ts`):
- Scans DOM for `section[id]` and nav links
- Infers route from button labels or user input
- Navigates internally or opens in new tab (cross-origin)

**Lead capture** (`leadCapture.ts`):
- `ttt_chat_session_id` in localStorage (format: `web-${Date.now()}-${random}`)
- `ttt_lead_captured` flag (30-day TTL)
- Cross-touchpoint: Contact form also sets the flag (skip chatbot gate)

---

## 🔌 API Integration

**Axios instance** (`src/api/axios.ts`):
- Base URL from `VITE_API_BASE_URL`
- Request interceptor injects `Authorization: Bearer <token>` (if auth enabled)
- CORS: `withCredentials: true`

**Services:**
- `contact.service` — form submission
- `blog.service` — fetch blogs
- `event.service` — fetch events
- `package.service` — fetch packages
- All proxy through the Node backend

---

## 🎨 UI System

**Tailwind CSS + custom components:**
- Brand colors: `primary #1f528c`, `secondary #34d399`, `accent #f97316`
- Fonts: Inter (body), Manrope (headings)
- Custom animations: `float`, `pulse-slow`, `fade-in`
- Gradients: hero, glass (glassmorphism)

**Animations:**
- Framer Motion for section reveals, carousel effects
- GSAP for timeline-based sequences
- Three.js for 3D scenes (brain, starfield)

**Responsive:**
- Mobile-first Tailwind breakpoints
- `use-mobile` hook for conditional rendering

---

## ⚠️ Known Issues & Tech Debt

- **Google OAuth client ID hardcoded** in `src/main.tsx` (should be `VITE_GOOGLE_CLIENT_ID`)
- **localStorage drift** — local lead gate flag can diverge from server state (Redis); users with stale flag see hardcoded fallback greeting
- **Default greeting constants** outdated — currently shows 2 buttons but should match live backend config
- **No tests** — no Vitest/Jest/Cypress
- **Admin scaffolding unused** — `AuthContext` is a stub; no live auth/admin routes
- **React Query mounted but unused** — all data loading is imperative (direct axios calls)
- **Browser + Vercel cache** — stale JS may serve; hard-refresh needed
- **No analytics integration** — no event tracking for funnel analysis
- **Chatbot QR landing** (`/chat`) not fully implemented — partial mockup

---

## 🚢 Deployment

**Vercel auto-deploy:**
```bash
git push origin main
# Vercel watches main branch and auto-deploys
```

**SPA rewrite** in `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Set `VITE_API_BASE_URL` and `VITE_RAZORPAY_KEY_ID` in Vercel project settings.

---

## 🎓 Common Tasks

| I want to… | Start here |
|:---|:---|
| Add a service page | Create `src/pages/public/NewServicePage.tsx` + add route in `Routes.tsx` |
| Change chatbot behavior | `src/pages/ChatbotModal.tsx` (large central file) |
| Update blog content | `src/data/blogData.ts` (static fallback) or backend API |
| Modify chatbot routing | `src/utils/chatbotRouter.ts` (route inference logic) |
| Add a new section to home | `src/pages/LandingPages/` components + compose in `HomePage.tsx` |
| Change API endpoint | `src/services/*` service modules |
| Update lead gate | `src/utils/leadCapture.ts` + `ChatbotModal.tsx` |
| Adjust Razorpay | `src/pages/ChatbotModal.tsx` (consultation button logic) |

---

## 📊 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=3,11,19&height=120&section=footer" width="100%"/>

**Gradient used: `3,11,19` (dark-teal)**

</div>
