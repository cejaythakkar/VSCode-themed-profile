# VS Code-Portfolio-React

A React replica of the adjacent `vscode-portfolio` static website, using React and Vite. The original layout, styling, content, photo, PDF downloads, and interactions are preserved. This is a separate project and does not replace the static website.

## Run locally

Requires Node.js 22.12+ (or a compatible current Node release) and npm.

```bash
npm ci
npm run dev
```

Open the local address printed in the terminal. For a deployable production build:

```bash
npm run build
npm run preview
```

Upload the **contents of `dist/`** to your Apache document root or any static hosting service. Do not upload the source folder or `node_modules` as your website. The build uses relative asset paths, allowing deployment at the domain root or within a subfolder. Hash-based section navigation needs no server-side route rewriting.

## Themes

**Dracula is the default.** The System option also means the portfolio's Dracula default, regardless of the device's light/dark setting. Midnight, Light, Nord, Dracula, and Monokai remain selectable. Explicit choices persist in local storage using the same key as the static version, `jay-vscode-theme`. Existing saved theme choices are respected; choose System or Dracula to use the new default when revisiting from a browser with a previous choice.

The theme bootstrap in `public/theme.js` runs before React to avoid a flash of the wrong colors. The page includes a Dracula fallback before JavaScript loads.

## Source structure

- `src/App.jsx`: workspace state, motion preference, explorer, and keyboard shortcuts.
- `src/components/Workspace.jsx`: title bar, theme selection, activity bar, explorer, editor tabs, minimap, and status bar.
- `src/components/Sections.jsx`: hero/typewriter, about, career timeline, employer tabs, skills, projects, and education.
- `src/components/Interactive.jsx`: command palette, terminal/history, email copy, contact links, and downloads.
- `src/hooks/useWorkspace.js`: reading progress, responsive breakpoints, scroll reveals, and typewriter lifecycle.
- `src/content.js`: full resume-derived content copied from the static portfolio.
- `src/style.css` and `src/themes.css`: original responsive design and palettes.
- `public/assets/`: original profile image and both resume PDFs.

Content renders as React elements, with React state for filters, employer selection, terminal history, and theme selection. There is no HTML injection or embedded copy of the original DOM-manipulating application script. Observers, timers, and global listeners are cleaned up when components unmount.

## Included behavior

All nine sections; four employers; sixteen project/initiative entries; six skill groups with ratings between 3.0 and 4.0 out of five; four academic qualifications; languages; personal details; seven social links; and both original resume downloads.

Includes typing/backspacing, a stationary profile card with scan line, scroll reveals, gradient skill meters, reading progress, clickable career milestones, keyboard-accessible employer tabs, project filters, a responsive explorer, and Ctrl/Cmd+K section search. The terminal supports `help`, `whoami`, section/file names, `cd ~/projects`, `resume`, `motion`, `clear`, and Up/Down history. It does not run operating-system commands.

Google Fonts are optional, with system-font fallbacks. System reduced-motion settings are respected until the visitor explicitly uses the motion control. Resume content and external links reflect the supplied source documents. This is an independent portfolio, not an official Microsoft product.
