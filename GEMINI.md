# Haiku Project Context

## Project Overview

**Haiku** is a modern web application built with **TanStack Start**, leveraging the power of **React 19**, **Vite**, and **TypeScript**. It utilizes **TanStack Router** for file-based routing and Server-Side Rendering (SSR) capabilities, powered by **Nitro** as the underlying server engine. Styling is handled by **Tailwind CSS v4**.

## Key Technologies

*   **Framework:** [TanStack Start](https://tanstack.com/start) (based on TanStack Router)
*   **UI Library:** [React 19](https://react.dev/)
*   **Build Tool:** [Vite 7](https://vitejs.dev/)
*   **Language:** [TypeScript 5](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Server Engine:** [Nitro](https://nitro.unjs.io/)
*   **Testing:** [Vitest](https://vitest.dev/)
*   **Package Manager:** pnpm (inferred from `pnpm-lock.yaml`)

## Building and Running

### Installation
```bash
pnpm install
```

### Development Server
Starts the development server on port 3000.
```bash
pnpm dev
```

### Production Build
Builds the application for production.
```bash
pnpm build
```

### Preview Production Build
Previews the production build locally.
```bash
pnpm preview
```

### Testing
Runs the unit tests using Vitest.
```bash
pnpm test
```

## Architecture & Conventions

### Routing
*   **File-Based Routing:** Routes are defined in the `src/routes` directory.
*   **Root Layout:** The global layout is defined in `src/routes/__root.tsx`, which includes the `<html>`, `<head>`, `<body>`, and `Header` component.
*   **Route Generation:** TanStack Router automatically generates the route tree in `src/routeTree.gen.ts` based on the files in `src/routes`.
*   **Navigation:** Uses the `<Link>` component from `@tanstack/react-router` for SPA navigation.

### Styling
*   **Tailwind CSS:** Configured via `@tailwindcss/vite` plugin in `vite.config.ts`.
*   **Global Styles:** Imported in `src/routes/__root.tsx` from `src/styles.css`.

### Server-Side Rendering (SSR)
*   The project is configured for SSR using `@tanstack/react-start`.
*   Entry points and server functions are managed by the framework.

## Key Configuration Files

*   **`vite.config.ts`:** Main configuration file. Configures plugins for TanStack Start, React, Nitro, Tailwind CSS, and path aliases.
*   **`tsconfig.json`:** TypeScript configuration.
*   **`package.json`:** Defines dependencies and scripts.

## Directory Structure

*   `src/components`: Reusable UI components (e.g., `Header.tsx`).
*   `src/routes`: Route definitions.
    *   `__root.tsx`: Root route and layout.
    *   `index.tsx`: Home page.
    *   `demo/`: Example routes demonstrating API requests and SSR features.
*   `src/data`: Static or mock data files.
*   `.tanstack`: internal TanStack configuration/cache.
*   `.netlify`: Netlify specific configuration (if applicable).
