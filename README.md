# Personal Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Material-UI.

## Features

- 🎨 Modern UI design with smooth animations
- 🌓 Light/Dark mode support
- 🎵 Background music with user preference persistence
- 📱 Fully responsive design
- ⚡ Fast performance
- 🎯 SEO optimized

## Tech Stack

- React 18
- TypeScript
- Material-UI v5
- Framer Motion
- Vite

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Project Structure

```
my-portfolio/
├── public/
│   ├── music/          # Background music files
│   ├── images/         # Static images
│   ├── robots.txt      # SEO
│   └── sitemap.xml     # SEO
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React contexts
│   ├── assets/         # Project assets
│   ├── App.tsx         # Main App component
│   ├── theme.ts        # MUI theme configuration
│   └── main.tsx        # Entry point
└── package.json
```

## Customization

1. **Theme**: Edit `src/theme.ts` to customize colors, typography, and other theme properties
2. **Content**: Update component files in `src/components/` to modify content
3. **Music**: Replace `/public/music/background-music.mp3` with your preferred audio

## Deployment

This site can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

## License

MIT License - feel free to use this project for your own portfolio!

## Contact

Seif Tolba - contact@seiftolba.xyz
