# ShelfMate — Frontend

Smart grocery shopping web app for busy urban users.

**Designer & Developer:** Yug Pokharel
**Module:** ST6012CEM — User Experience Design
**Year:** 2026

## Stack
- React 18 + Vite + TypeScript
- TailwindCSS
- React Router v6
- Zustand (state)
- TanStack Query v5 (server state)
- Axios (API)
- React Hook Form + Zod (forms)
- Framer Motion (animations)

## Getting started
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Architecture
Feature-based clean architecture. See `src/features/` for each domain module.
Each feature owns: components, hooks, services, types, store.
Shared code lives in `src/shared/`.
