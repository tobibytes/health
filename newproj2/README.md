# Patient Portal

A modern, modular patient portal for hospital management systems built with Next.js, Tailwind CSS, and Zustand.

## Features

- **Modern UI**: Clean, responsive design with a calming color palette
- **Modular Architecture**: Components are kept under 100 lines for maintainability
- **State Management**: Zustand for efficient state management
- **Accessibility**: Built with accessibility in mind using Radix UI primitives
- **Markdown Support**: Rich text rendering for medical results and notes
- **Mobile-First**: Responsive design that works great on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI (built on Radix UI)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Markdown**: React Markdown

## Project Structure

```
src/
├─ app/
│  └─ (patient)/              # Patient portal routes
│     ├─ layout.tsx           # Shared patient layout
│     ├─ page.tsx             # Dashboard
│     ├─ appointments/        # Appointments management
│     ├─ results/             # Test results
│     ├─ chat/                # Messaging interface
│     ├─ profile/             # Patient profile
│     └─ settings/            # User settings
├─ components/
│  ├─ ui/                     # Reusable UI components
│  └─ patient/                # Patient-specific components
├─ lib/                       # Utilities and stores
└─ styles/                    # Global styles
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Guidelines

- **Component Size**: Keep components under 100 lines for maintainability
- **State Management**: Use Zustand for global state, React state for local UI state
- **Styling**: Use Tailwind CSS classes, extend theme in `tailwind.config.ts`
- **Accessibility**: Follow WCAG guidelines and use semantic HTML
- **Responsive Design**: Use mobile-first approach with Tailwind's responsive utilities

## Color Palette

- **Primary**: Sky Blue (#3B82F6) - Trust and calm
- **Secondary**: Soft Green (#10B981) - Health and well-being
- **Accent**: Light Orange (#F97316) - Energy and attention
- **Background**: White and light grays for cleanliness

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
