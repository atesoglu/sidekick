# Sidekick

A desktop app foundation built with **Tauri 2 + React 19 + TypeScript + Vite**, styled with the
**IBM Carbon Design System** and **Tailwind CSS**. This repository currently holds the application
shell/foundation only — the actual developer productivity dashboard is built on top of it.

## Tech stack

- **Tauri 2** — Rust-backed desktop shell (`src-tauri/`)
- **React 19** + **TypeScript** + **Vite** — frontend
- **Carbon Design System** (`@carbon/react`, `@carbon/icons-react`) — component library & design
  tokens
- **Tailwind CSS 4** (`@tailwindcss/vite`) — layout/utility styling on top of Carbon
- **react-router-dom** — client-side routing (`HashRouter`, see below)
- **pnpm** — package manager

## Getting started

Prerequisites: [Node.js](https://nodejs.org/) + [pnpm](https://pnpm.io/), and the
[Rust toolchain](https://www.rust-lang.org/tools/install) with the platform dependencies listed in
the [Tauri prerequisites guide](https://tauri.app/start/prerequisites/).

```sh
pnpm install     # install dependencies
pnpm tauri dev   # run the desktop app in development mode
pnpm dev         # run only the Vite frontend in a browser (no Rust backend)
pnpm build       # type-check and build the frontend
pnpm tauri build # build the distributable desktop app
```

## Project structure

```
src/
  app/         Application shell/layout (Carbon UI Shell header + side nav)
  pages/       Routed views (one folder per page)
  components/  Reusable, presentational UI building blocks
  widgets/     Dashboard-specific widgets (charts, metric tiles, etc.)
  services/    Data access layer, incl. typed Tauri `invoke` wrappers
  types/       Shared TypeScript types
  hooks/       Reusable React hooks
  theme/       Carbon theme provider (light/dark mode)
  config/      Static app configuration (nav items, constants)
  styles/      Global Carbon (Sass) and Tailwind entry stylesheets
src-tauri/
  src/
    commands.rs  Tauri commands exposed to the frontend
    lib.rs       Tauri app builder, plugin & command registration
```

See [src/components/README.md](src/components/README.md) and
[src/widgets/README.md](src/widgets/README.md) for the distinction between the two.

Routing uses `HashRouter` rather than `BrowserRouter`, since Tauri's asset protocol doesn't resolve
arbitrary client-side paths the way a real HTTP server would.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Styling: Carbon + Tailwind

> **Carbon owns the UI. Tailwind assists with layout and application-specific styling.**

This project uses the [IBM Carbon Design System](https://carbondesignsystem.com/) (`@carbon/react`) as
its component library and design language, and [Tailwind CSS](https://tailwindcss.com/) purely as a
layout/utility helper on top of it.

In practice:

- Reach for a Carbon component before building anything by hand. Don't recreate Carbon components
  (buttons, inputs, tiles, tags, etc.) with Tailwind utility classes.
- Use Tailwind for layout, composition, positioning, responsive breakpoints, and spacing *between*
  or *around* components (flex/grid wrappers, page padding, gaps) — not for restyling Carbon's
  internals.
- Use Carbon's design tokens, typography, color, and theming (`src/theme`) for anything visual;
  don't introduce arbitrary Tailwind colors/typography that fight Carbon's look.
- Don't add another general-purpose component library — Tailwind is a utility layer, not a
  replacement for Carbon.

This boundary is also enforced structurally, not just by convention: Carbon's compiled CSS is
unlayered, while Tailwind's utilities are imported into the `utilities` CSS cascade layer (see
`src/styles/tailwind.css`, which also omits Tailwind's Preflight reset since Carbon provides its
own). Per the CSS cascade layers spec, unlayered rules always win over layered ones on a shared
property — so a Tailwind utility can never silently override a style Carbon already sets on its own
components; it only applies to properties Carbon leaves alone, which is exactly the intended
layout/utility role.
