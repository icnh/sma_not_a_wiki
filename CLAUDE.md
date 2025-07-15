# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build application for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build locally
- `npm install` - Install dependencies

## Project Architecture

This is a Nuxt 3 application with minimal configuration:

### Structure
- `app.vue` - Root application component with NuxtPage router outlet
- `pages/[slug].vue` - Dynamic route handler for all paths (displays slug parameter)
- `server/` - Server-side code (separate tsconfig.json)
- `public/` - Static assets (favicon, robots.txt)
- `nuxt.config.ts` - Basic Nuxt configuration with devtools enabled

### Key Technologies
- **Nuxt 3** (v3.17.7) - Vue.js framework
- **Vue 3** (v3.5.17) - Frontend framework
- **TypeScript** - Type safety with Nuxt-generated tsconfig

### Application Flow
The app uses Nuxt's file-based routing with a single dynamic route (`[slug].vue`) that catches all paths and displays the slug parameter. This creates a simple page structure where any URL path becomes a page displaying that path name.

### Development Notes
- Uses ES modules (`"type": "module"`)
- TypeScript configs extend Nuxt-generated configurations
- Minimal dependencies - only core Nuxt/Vue packages
- No testing framework, linting, or additional tooling configured