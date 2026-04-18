# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js web application (located in the `web/` directory) for a date-locked digital letter service.

## Development Commands
All commands should be run from the `web/` directory.

```bash
# Install dependencies
cd web && npm install

# Start development server
cd web && npm run dev

# Build the project
cd web && npm run build

# Run linting
cd web && npm run lint
```

## Architecture
The project uses the Next.js App Router architecture.

### Structure
- `web/src/app/`: Contains the routing logic and pages.
  - `dashboard/`: User dashboard views.
  - `onboarding/`: Multi-step onboarding flow (including `first-letter` and `complete`).
- `web/src/components/`: UI components divided by domain:
  - `ui/`: Low-level primitive components (Button, Input, Card).
  - `landing/`: Components specific to the landing page (Hero, ValueProp, etc.).
  - `shared/`: Cross-cutting UI elements (Header, Footer, Icons).
- `web/src/lib/`: Utility functions and shared logic.
- `web/src/types/`: TypeScript type definitions.

### Key Notes
- **Next.js Version:** Uses a version with breaking changes (as noted in `web/AGENTS.md`). Refer to local documentation in `node_modules/next/dist/docs/` for specific API behaviors.
- **Styling:** Uses Tailwind CSS 4.
- **Icons:** Powered by `lucide-react`.
