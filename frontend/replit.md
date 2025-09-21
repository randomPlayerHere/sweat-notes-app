# Calorie Predictor & Workout Generator

## Overview

This is a fitness application that provides two core features: calorie prediction and workout plan generation. Built as a single-page React application, it allows users to input their personal information to get personalized daily calorie recommendations and generate custom workout plans based on their preferences. The application features a clean, modern interface with support for both light and dark themes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React setup with TypeScript and Vite as the build tool. The frontend follows a component-based architecture with clear separation of concerns:

- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React state with TanStack Query for server state management
- **Styling**: Tailwind CSS with a custom design system based on shadcn/ui components

### UI Component System
The application implements a comprehensive design system using:
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Design Tokens**: CSS custom properties for consistent theming
- **Theme Support**: Light and dark mode with system preference detection
- **Typography**: Inter font family from Google Fonts
- **Color System**: HSL-based color palette with semantic color tokens

### Backend Architecture
The backend is built with Express.js and follows a modular structure:
- **Server Framework**: Express.js with TypeScript
- **API Design**: RESTful API pattern with `/api` prefix for all endpoints
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage)
- **Development Setup**: Hot reloading with Vite integration in development mode

### Data Storage
The application is configured for PostgreSQL database integration:
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via Neon serverless driver)
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Currently includes basic user model with username/password fields

### Development Tools
- **TypeScript**: Full type coverage across frontend and backend
- **ESM**: Modern ES modules throughout the application
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Development Experience**: Runtime error overlay and source mapping

### Form Handling
The application uses React Hook Form with Zod for robust form validation:
- **Validation**: Schema-based validation with error handling
- **User Experience**: Real-time form validation with visual feedback
- **Type Safety**: Form data types derived from validation schemas

### Architecture Decisions

**Monorepo Structure**: The client and server code are co-located with shared TypeScript definitions, enabling better code reuse and type safety across the stack.

**Component-First Design**: All UI elements are built as reusable components with consistent API patterns, making the interface maintainable and extensible.

**Type-Safe Database Layer**: Using Drizzle ORM provides compile-time type checking for database operations while maintaining flexibility for schema changes.

**Utility-First CSS**: Tailwind CSS enables rapid UI development while maintaining design consistency through the custom theme configuration.

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@neondatabase/serverless**: PostgreSQL database connectivity via Neon
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **react-hook-form**: Form state management and validation
- **zod**: Schema validation for forms and API data

### UI Dependencies
- **@radix-ui/react-***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: SVG icon library
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional CSS class utilities

### Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **postcss & autoprefixer**: CSS processing pipeline
- **@replit/vite-plugin-***: Replit-specific development enhancements

### External Services
The application is designed to integrate with:
- **Neon Database**: Serverless PostgreSQL hosting
- **Google Fonts**: Web font delivery (Inter font family)
- **Replit**: Development and deployment platform integration