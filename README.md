# Teeny Tech Trek

A modern website for an AI agency specializing in custom AI solutions, chatbots, and automation systems. Built with React, TypeScript, and Tailwind CSS.

![Teeny Tech Trek](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🎨 Modern, responsive design with smooth animations
- 🚀 Fast performance with Vite
- 💅 Styled with Tailwind CSS
- 📱 Mobile-first approach
- ♿ Accessibility-focused
- 🔍 SEO optimized
- 🎭 TypeScript for type safety

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/teeny-tech-trek.git
cd teeny-tech-trek
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
teeny-tech-trek/
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   └── ...           
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   └── main.tsx          # Application entry point
├── public/                # Static assets
└── index.html            # HTML template
```

## Key Components

- `Navbar`: Responsive navigation with smooth scrolling
- `HeroSection`: Landing section with main value proposition
- `ServicesSection`: Showcase of AI services
- `MissionSection`: Company mission and values
- `TechStackSection`: Technical capabilities
- `TestimonialsSection`: Client testimonials
- `ContactSection`: Contact form and information
- `Footer`: Site footer with navigation and social links

## Customization

### Colors

The primary colors can be customized in `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#1f528c',
    dark: '#164073',
    light: '#2a69b8',
  },
  secondary: {
    DEFAULT: '#3e6aa7',
    dark: '#345a8e',
    light: '#4d7dbf',
  },
}
```

### Typography

The site uses Inter font family by default. To change the font, update the font imports in `index.html` and the font family configuration in `tailwind.config.js`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Teeny Tech Trek - hello@teenytecktrek.ai

Project Link: [https://github.com/yourusername/teeny-tech-trek](https://github.com/yourusername/teeny-tech-trek)