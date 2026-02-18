# Mahmudul Hassan Navid - Portfolio Website

A sophisticated, interactive portfolio website built with React 18, TypeScript, Vite, and D3.js. Features a "Neural Noir" visual theme with animated particle effects, smooth scroll interactions, and full accessibility support.

## Features

- **D3.js Animations**: Force-directed graph background and particle name animation in hero section
- **Interactive UI**: Mouse-follow gradient blob, custom cursor, and smooth scroll navigation
- **Responsive Design**: Mobile-first approach with hamburger menu and touch-friendly interactions
- **Accessibility**: Reduced motion support, keyboard navigation, and ARIA labels
- **Performance**: Lazy animation initialization and Page Visibility API integration
- **Auto-Deployment**: GitHub Actions workflow for automatic GitHub Pages deployment

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Visualization**: D3.js v7
- **Styling**: CSS Modules with CSS Variables
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## Local Development

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/mhnavid/mhnavid.github.io.git
cd mhnavid.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

This project uses GitHub Actions for automatic deployment to GitHub Pages.

### Initial Setup

1. Ensure your repository is named `mhnavid.github.io` (or configure custom domain)
2. The `.github/workflows/deploy.yml` workflow will automatically:
   - Build the project on push to the `main` branch
   - Deploy the `dist/` folder to the `gh-pages` branch
   - Publish to GitHub Pages

### Manual Deployment

If you need to deploy manually:

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm install -g gh-pages
gh-pages -d dist
```

## Project Structure

```
mhnavid.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   └── .nojekyll               # Disables Jekyll processing
├── src/
│   ├── components/             # React components
│   │   ├── About.tsx
│   │   ├── Achievements.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── GradientBlob.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── NeuralBackground.tsx
│   │   └── Projects.tsx
│   ├── styles/
│   │   └── global.css          # Global styles and CSS variables
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── vite.config.ts              # Vite configuration
└── package.json
```

## Customization

### Personal Information

Update the following files with your own information:

- `src/components/Hero.tsx` - Name, roles, and social links
- `src/components/About.tsx` - Bio and badges
- `src/components/Skills.tsx` - Skill categories and technologies
- `src/components/Experience.tsx` - Work history
- `src/components/Projects.tsx` - Portfolio projects
- `src/components/Education.tsx` - Academic background
- `src/components/Contact.tsx` - Contact form (configure Formspree)

### Styling

The "Neural Noir" theme is defined in `src/styles/global.css`:

```css
:root {
  --bg-primary: #080b12;
  --bg-secondary: #0d1117;
  --accent-cyan: #00f5ff;
  --accent-violet: #9b5de5;
  --accent-amber: #f7b731;
  --text-primary: #e8eaf0;
  --text-muted: #6b7280;
}
```

### Fonts

The project uses Google Fonts:
- **Syne** - Display/headings (futuristic, geometric)
- **JetBrains Mono** - Body and code text
- **Orbitron** - Section labels and badges

## Accessibility

- Respects `prefers-reduced-motion` media query
- Keyboard navigable with visible focus indicators
- ARIA labels on interactive elements
- Semantic HTML structure
- Alt text for images

## Performance

- Lazy initialization of D3 animations
- Page Visibility API pauses animations when tab is inactive
- Optimized bundle size with Vite
- CSS-based animations for better performance

## Contact Form

The contact form uses Formspree for static form handling. To enable:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace `YOUR_FORM_ID` in `src/components/Contact.tsx` with your form ID

## License

This project is open source and available under the MIT License.

## Credits

Designed and built by Mahmudul Hassan Navid

---

For more information, visit [mhnavid.github.io](https://mhnavid.github.io) or connect on [LinkedIn](https://linkedin.com/in/mahmudul-hassan-navid).
