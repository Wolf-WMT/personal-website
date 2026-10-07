# Wolf-WMT â€” Cyberpunk Developer Portfolio

> An interactive cyberpunk-style developer portfolio built with **React, TypeScript, Vite, and Tailwind CSS**.

**Repository:** [Wolf-WMT/personal-website](https://github.com/Wolf-WMT/personal-website)

---

## Overview

This project is a personal developer portfolio designed around a **cyberpunk / terminal / CRT aesthetic**.

Rather than presenting a traditional static portfolio, the website combines portfolio content with interactive UI elements such as:

* Cyberpunk visual design
* CRT and scanline effects
* Animated background
* Interactive navigation
* Developer profile and introduction
* Skills visualization
* Project showcase
* Activity section
* Music / playlist interface
* Interactive terminal
* Contact section
* Footer
* Multilingual interface support
* Responsive UI
* Accessibility-conscious interaction patterns

The application is implemented as a component-based React application, making individual sections easy to maintain and extend.

---

## âœ¨ Features

### ðŸŽ¨ Cyberpunk Interface

The visual system is built around a dark cyberpunk aesthetic with:

* Terminal-inspired typography
* Neon cyan accents
* Dark backgrounds
* Glowing borders and text
* Glass-style panels
* CRT scanlines
* CRT vignette effects
* Animated scanning effects
* Custom scrollbars
* Reduced-motion support

The primary fonts are:

* **JetBrains Mono** â€” terminal/code-oriented typography
* **Rajdhani** â€” headings and interface elements

---

### ðŸ–¥ï¸ Interactive Terminal

The portfolio includes an interactive terminal interface rather than presenting all information through conventional cards and navigation.

Terminal commands are separated into their own module:

```text
src/terminal/commands.ts
```

This keeps terminal behavior independent from the rest of the application.

---

### ðŸŒ Multilingual Support

The application contains an i18n system based on React Context.

Relevant files:

```text
src/i18n/
â”œâ”€â”€ LanguageContext.tsx
â”œâ”€â”€ MusicContext.tsx
â””â”€â”€ translations.ts
```

The language context allows the UI to consume translated content without coupling every component directly to the translation implementation.

---

### ðŸŽµ Music System

The project contains a dedicated music context and playlist system.

Relevant files:

```text
src/i18n/MusicContext.tsx
src/components/MusicController.tsx
src/components/Playlist.tsx
src/data/playlist.ts
```

Music state is shared through React Context so different parts of the interface can interact with the same music system.

---

### ðŸ“Š Skills Visualization

The portfolio contains an interactive skills section with a radar-style visualization.

Skills are kept separately from the UI:

```text
src/data/skills.ts
src/components/SkillsRadar.tsx
```

This separation makes it possible to modify portfolio skills without having to rewrite the presentation component.

---

### ðŸš€ Projects

Projects are maintained in a dedicated data module:

```text
src/data/projects.ts
```

The projects section consumes this data and presents it through:

```text
src/components/Projects.tsx
```

This provides a simple separation between portfolio content and UI.

---

### ðŸ§‘â€ðŸ’» Portfolio Sections

The main application is composed from independent React components.

Current major sections include:

* Hero
* About
* Skills
* Projects
* Side Activity
* Playlist
* Terminal
* Contact
* Footer

The application entry point assembles these sections in:

```text
src/App.tsx
```

---

### ðŸŽ® Interactive Components

The project also contains additional interactive components such as:

```text
src/components/MiniGame.tsx
src/components/MusicController.tsx
src/components/Terminal.tsx
```

These are kept separate from the primary page layout so they can evolve independently.

---

## ðŸ› ï¸ Tech Stack

### Frontend

| Technology   | Purpose                                  |
| ------------ | ---------------------------------------- |
| React        | UI framework                             |
| TypeScript   | Static typing                            |
| Vite         | Development server and build tool        |
| Tailwind CSS | Utility-first styling                    |
| Lucide React | Icons                                    |
| CSS          | Global visual effects and custom styling |

### Supporting Technologies

| Technology   | Purpose                     |
| ------------ | --------------------------- |
| Supabase JS  | Supabase client integration |
| ESLint       | Code quality and linting    |
| PostCSS      | CSS processing              |
| Autoprefixer | CSS compatibility           |

---

## ðŸ“¦ Dependencies

Main runtime dependencies currently include:

```text
react
react-dom
lucide-react
@supabase/supabase-js
```

Development tooling includes:

```text
vite
typescript
tailwindcss
postcss
autoprefixer
eslint
typescript-eslint
@vitejs/plugin-react
```

---

## ðŸ“ Project Structure

```text
personal-website/
â”‚
â”œâ”€â”€ public/
â”‚
â”œâ”€â”€ src/
â”‚   â”‚
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ About.tsx
â”‚   â”‚   â”œâ”€â”€ BackgroundAnimation.tsx
â”‚   â”‚   â”œâ”€â”€ CRTOverlay.tsx
â”‚   â”‚   â”œâ”€â”€ Contact.tsx
â”‚   â”‚   â”œâ”€â”€ Footer.tsx
â”‚   â”‚   â”œâ”€â”€ Hero.tsx
â”‚   â”‚   â”œâ”€â”€ MiniGame.tsx
â”‚   â”‚   â”œâ”€â”€ MusicController.tsx
â”‚   â”‚   â”œâ”€â”€ Navbar.tsx
â”‚   â”‚   â”œâ”€â”€ Playlist.tsx
â”‚   â”‚   â”œâ”€â”€ Projects.tsx
â”‚   â”‚   â”œâ”€â”€ SideActivity.tsx
â”‚   â”‚   â”œâ”€â”€ SkillsRadar.tsx
â”‚   â”‚   â””â”€â”€ Terminal.tsx
â”‚   â”‚
â”‚   â”œâ”€â”€ data/
â”‚   â”‚   â”œâ”€â”€ playlist.ts
â”‚   â”‚   â”œâ”€â”€ projects.ts
â”‚   â”‚   â””â”€â”€ skills.ts
â”‚   â”‚
â”‚   â”œâ”€â”€ i18n/
â”‚   â”‚   â”œâ”€â”€ LanguageContext.tsx
â”‚   â”‚   â”œâ”€â”€ MusicContext.tsx
â”‚   â”‚   â””â”€â”€ translations.ts
â”‚   â”‚
â”‚   â”œâ”€â”€ terminal/
â”‚   â”‚   â””â”€â”€ commands.ts
â”‚   â”‚
â”‚   â”œâ”€â”€ App.tsx
â”‚   â”œâ”€â”€ index.css
â”‚   â”œâ”€â”€ main.tsx
â”‚   â””â”€â”€ vite-env.d.ts
â”‚
â”œâ”€â”€ .gitignore
â”œâ”€â”€ eslint.config.js
â”œâ”€â”€ index.html
â”œâ”€â”€ package.json
â”œâ”€â”€ package-lock.json
â”œâ”€â”€ postcss.config.js
â”œâ”€â”€ tailwind.config.js
â”œâ”€â”€ tsconfig.app.json
â”œâ”€â”€ tsconfig.json
â”œâ”€â”€ tsconfig.node.json
â””â”€â”€ vite.config.ts
```

---

## ðŸ§© Application Architecture

The application follows a relatively simple component-oriented architecture.

```text
main.tsx
   â”‚
   â–¼
 App.tsx
   â”‚
   â”œâ”€â”€ LanguageProvider
   â”‚
   â”œâ”€â”€ MusicProvider
   â”‚
   â”œâ”€â”€ BackgroundAnimation
   â”œâ”€â”€ CRTOverlay
   â”œâ”€â”€ Navbar
   â”‚
   â””â”€â”€ Main Content
       â”‚
       â”œâ”€â”€ Hero
       â”œâ”€â”€ About
       â”œâ”€â”€ SkillsRadar
       â”œâ”€â”€ Projects
       â”œâ”€â”€ SideActivity
       â”œâ”€â”€ Playlist
       â”œâ”€â”€ Terminal
       â””â”€â”€ Contact
           â”‚
           â–¼
         Footer
```

### Entry Point

The React application starts from:

```text
src/main.tsx
```

It mounts the React application into:

```html
<div id="root"></div>
```

The main application component is:

```text
src/App.tsx
```

---

## ðŸ”§ Installation

### Requirements

Make sure the following are installed:

* Node.js
* npm
* Git

Verify your installation:

```bash
node --version
npm --version
git --version
```

---

## ðŸš€ Getting Started

Clone the repository:

```bash
git clone https://github.com/Wolf-WMT/personal-website.git
```

Enter the project:

```bash
cd personal-website
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

Usually it will be:

```text
http://localhost:5173
```

Open that address in your browser.

---

## ðŸ—ï¸ Production Build

Create a production build:

```bash
npm run build
```

The generated production files will be placed in the Vite build output directory.

To locally preview the production build:

```bash
npm run preview
```

---

## ðŸ§ª Code Quality

Run ESLint:

```bash
npm run lint
```

Run the TypeScript type checker:

```bash
npm run typecheck
```

A useful local verification sequence is:

```bash
npm run lint
npm run typecheck
npm run build
```

If all three succeed, the project has passed the main static checks and production build step.

---

## ðŸŽ¨ Styling

Global styling is located in:

```text
src/index.css
```

The project uses Tailwind CSS together with custom CSS.

Custom styling includes:

* Global typography
* Scrollbars
* Glass panels
* Terminal borders
* Glow effects
* Cyberpunk buttons
* Section labels
* Data rows
* CRT scanlines
* CRT vignette
* Screen flickering
* Moving scanline
* RTL support
* Reduced-motion support

For example, the project defines reusable visual concepts such as:

```css
.glass-panel
.terminal-border
.glow-text
.glow-border
.btn-cyber
.section-label
.data-line
.data-label
.data-value
```

---

## ðŸ“± Responsive Design

The UI is designed to work across different viewport sizes.

Responsive behavior should be tested at minimum against:

* Desktop
* Laptop
* Tablet
* Mobile

When adding new components, avoid introducing fixed-width layouts that break the existing responsive design.

---

## â™¿ Accessibility & Reduced Motion

The application includes support for users who prefer reduced motion.

The global stylesheet contains:

```css
@media (prefers-reduced-motion: reduce)
```

Animations and transitions are reduced when the operating system/browser requests reduced motion.

Interactive elements should continue to receive visible keyboard focus and should not rely exclusively on animation or color to communicate state.

---

## ðŸŒ RTL Support

The global stylesheet contains support for right-to-left layouts.

The project handles RTL-specific behavior through selectors such as:

```css
[dir="rtl"]
```

Terminal and code-oriented areas can remain explicitly left-to-right where necessary.

---

## ðŸ—ƒï¸ Managing Portfolio Data

Portfolio data is separated from presentation components.

### Projects

Edit:

```text
src/data/projects.ts
```

### Skills

Edit:

```text
src/data/skills.ts
```

### Playlist

Edit:

```text
src/data/playlist.ts
```

### Translations

Edit:

```text
src/i18n/translations.ts
```

This structure makes content updates easier without mixing large amounts of static data directly into UI components.

---

## ðŸ§‘â€ðŸ’» Development Guidelines

When adding a new section:

1. Create the component inside:

```text
src/components/
```

2. Keep static data inside:

```text
src/data/
```

3. Keep shared application state inside an appropriate Context when necessary.

4. Add the component to:

```text
src/App.tsx
```

5. Reuse existing visual patterns where possible.

6. Run:

```bash
npm run lint
npm run typecheck
npm run build
```

before considering the change complete.

---

## ðŸ” Environment Variables

If a feature requires external services such as Supabase, credentials should **not** be hardcoded into source files.

For Vite applications, environment variables intended for browser-side use normally use the:

```text
VITE_
```

prefix.

Example:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Never commit private service-role keys, database passwords, API secrets, or other server-side credentials.

Use a local environment file and add sensitive files to `.gitignore` where appropriate.

---

## ðŸ”’ Security Notes

This is a frontend portfolio application.

Anything shipped to the browser should be considered public.

Do **not** put the following in frontend source code:

* Database passwords
* Private API keys
* Service-role credentials
* Private access tokens
* Encryption secrets
* Server-side credentials

If a secret must remain confidential, the operation should be performed on a trusted backend rather than directly in the browser.

---

## ðŸ§¹ Recommended Development Workflow

A typical development cycle is:

```bash
git pull
npm install
npm run dev
```

After making changes:

```bash
npm run lint
npm run typecheck
npm run build
```

Then commit:

```bash
git add .
git commit -m "update portfolio"
git push
```

---

## ðŸ“ Current Project Status

This repository is an actively developed personal portfolio project.

The current codebase contains the core React application, component structure, portfolio data modules, internationalization infrastructure, music state management, terminal functionality, and the cyberpunk visual system.

The repository currently contains the foundational structure needed to continue expanding the portfolio without turning the main application file into a monolithic component.

---

## ðŸ—ºï¸ Future Development Ideas

Potential future improvements include:

* More portfolio projects
* Improved project detail pages
* More terminal commands
* Expanded terminal interactions
* More languages
* Improved accessibility
* Better mobile navigation
* More interactive visualizations
* Additional mini-games
* Enhanced music controls
* Backend-powered portfolio data
* More advanced Supabase integration
* Automated deployment
* Automated testing
* Performance optimization
* SEO improvements
* Analytics with privacy considerations

These are development directions rather than guarantees of current functionality.

---

## ðŸ“œ License

No explicit open-source license is currently declared in the repository.

Until a license is added, the repository should **not** be assumed to grant permission to reuse, redistribute, or modify the code.

---

## ðŸ‘¤ Author

**Wolf-WMT**

GitHub:

https://github.com/Wolf-WMT

Repository:

https://github.com/Wolf-WMT/personal-website

---

## â­ Project Philosophy

This portfolio is intended to be more than a static rÃ©sumÃ©.

The goal is to combine:

```text
PERSONAL IDENTITY
        +
DEVELOPER PORTFOLIO
        +
INTERACTIVE TERMINAL
        +
CYBERPUNK UI
        +
MUSIC
        +
VISUAL EFFECTS
        +
EXPERIMENTATION
```

into a single interactive developer experience.

---

## ðŸ“Œ Quick Reference

```bash
# Clone
git clone https://github.com/Wolf-WMT/personal-website.git

# Enter
cd personal-website

# Install
npm install

# Development
npm run dev

# Lint
npm run lint

# Type check
npm run typecheck

# Production build
npm run build

# Preview production build
npm run preview
```

---

**Built with React + TypeScript + Vite + Tailwind CSS.**
