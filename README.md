# 💧 JalRakshak

**JalRakshak** ("Water Guardian") is a smart rainwater harvesting assistant — a full-stack web app that helps people assess rooftop rainwater harvesting potential, plan suitable harvesting structures, and make financially informed decisions with live weather data and cost/ROI analysis.

Built as a hackathon/college project on the Fusion Starter React + Express template.

---

## ✨ Features

- **🏠 Rainwater Harvesting Analysis** — Enter roof area, dwellers, open space, roof type, and location to get:
  - Annual rainwater harvesting potential
  - Seasonal rainfall variation modeling
  - Cost breakdown (materials, labor, maintenance)
  - Financial analysis: NPV, IRR, ROI, payback period, break-even year
- **🏗️ Structure Recommendations** — A catalog of harvesting structures (RCC tanks, recharge pits, etc.) with dimensions, materials, estimated cost, and maintenance guidance.
- **🌦️ Live Weather & Rain Alerts** — Real-time weather lookup (via OpenWeatherMap) and rainfall alerts for a given location.
- **🔐 Authentication** — Login flow with protected routes for authenticated-only pages.
- **🌐 Bilingual UI** — English/Hindi language toggle (i18n).
- **🎨 Modern, animated UI** — Glassmorphism cards, gradient hero, dark mode, and an animated rain background, built with Tailwind CSS and Radix UI primitives.
- **📄 About & FAQs** — Team/project info and frequently asked questions.

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 18, React Router, TypeScript, Vite |
| Styling    | Tailwind CSS, tailwindcss-animate, Radix UI, shadcn/ui components, Framer Motion |
| State/Data | TanStack Query (React Query), React Context (Auth, i18n) |
| Charts/3D  | Recharts, React Three Fiber / Drei |
| Backend    | Express 5, Node.js |
| External APIs | OpenWeatherMap (weather & rain data) |
| Deployment | Netlify Functions (serverless-http) |
| Tooling    | pnpm, Vitest, Prettier, ESLint/Hints |

---

## 📁 Project Structure

```
JalRakshak-main/
├── src/
│   ├── pages/            # Index, Analysis, Weather, Structure, About, FAQs, NotFound
│   ├── components/       # Reusable UI components (incl. shadcn/ui in components/ui)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── AuthContext.tsx   # Auth state & session handling
│   ├── ProtectedRoute.tsx# Route guard for authenticated pages
│   ├── i18n.tsx          # English/Hindi translations & language context
│   ├── LoginPage.tsx     # Login screen
│   └── App.tsx           # App entry point & routes
├── server/
│   ├── index.ts          # Express app: /api/ping, /api/demo, /api/login, /api/weather
│   ├── node-build.ts     # Production server build entry
│   └── routes/           # auth.ts, demo.ts route handlers
├── shared/
│   └── api.ts            # Types/interfaces shared between client & server
├── netlify/functions/    # Serverless function wrapper for Netlify deployment
├── public/               # Static assets (favicon, logo, etc.)
└── netlify.toml          # Netlify build & deploy config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS recommended)
- [pnpm](https://pnpm.io/) (this project is pinned to `pnpm@10.14.0`)

### Installation

```bash
git clone <repo-url>
cd JalRakshak-main
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_PUBLIC_BUILDER_KEY=your_builder_public_key
PING_MESSAGE="ping pong"
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

> ⚠️ Never commit real secrets to `.env`. Use your platform's secret manager (e.g., Netlify environment variables) for production keys.

### Run in Development

```bash
pnpm dev
```

This starts the Vite dev server (client) with the Express API integrated.

### Build for Production

```bash
pnpm build      # builds client (dist/spa) and server (dist/server)
pnpm start      # runs the production server
```

### Other Scripts

```bash
pnpm test          # run tests with Vitest
pnpm typecheck     # run TypeScript type checking
pnpm format.fix    # format code with Prettier
```

---

## 🔌 API Endpoints

| Method | Endpoint       | Description |
|--------|----------------|--------------|
| GET    | `/api/ping`    | Health check |
| GET    | `/api/demo`    | Demo endpoint |
| POST   | `/api/login`   | User authentication |
| GET    | `/api/weather` | Fetches current weather (`lat`, `lon` query params) via OpenWeatherMap |

---

## ☁️ Deployment

The app is configured for **Netlify** deployment (`netlify.toml`), with the Express API wrapped as a Netlify Function (`netlify/functions/api.ts`) via `serverless-http`.

---

## 👥 Team

Built by: Vivek Singh, Kartik Gupta, Pradyumn Singh, Sheetal Asthana, Alka Singh, and Manisha Kumari.

