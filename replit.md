# Team Finance - Financial Advisory Platform

## Overview

Team Finance is a web-based financial advisory platform targeting the Indian market, specializing in mutual funds, term insurance, and health insurance services. The application provides a marketing website with lead generation capabilities, educational resources, and financial planning tools to help users make informed investment and insurance decisions.

The platform is built as a full-stack TypeScript application with a React frontend and Express backend, following a mobile-first design philosophy to serve India's predominantly mobile user base.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: shadcn/ui (Radix UI primitives) - A comprehensive set of accessible, unstyled components that can be customized with Tailwind CSS. This choice provides:
- Pre-built accessible components (dialogs, dropdowns, navigation, forms)
- Full styling control through Tailwind
- Production-ready component patterns
- Reduced development time for complex UI elements

**Styling Strategy**: 
- Tailwind CSS with custom design tokens defined in CSS variables
- Custom color system supporting light/dark themes
- Typography system using Inter (UI) and Manrope (headings) via Google Fonts
- Mobile-first responsive design using Tailwind's breakpoint system
- Component-specific design guidelines documented in `design_guidelines.md`

**State Management**:
- TanStack Query (React Query) for server state management
- Local component state with React hooks
- No global client-side state management library (appropriate for marketing/lead-gen site)

**Routing**: wouter - A lightweight client-side router chosen for its minimal bundle size and simple API, suitable for the limited routing needs of a marketing website.

**Key Pages**:
- Home page with hero section, services showcase, testimonials, FAQ
- Consultation booking modal for lead capture
- Financial calculator for user engagement

### Backend Architecture

**Runtime**: Node.js with Express framework

**API Structure**: 
- RESTful API design with `/api` prefix for all endpoints
- Currently minimal backend implementation (starter template)
- Storage interface defined for user management (ready for expansion)
- Session management setup with connect-pg-simple

**Data Validation**: Zod schemas with drizzle-zod integration for type-safe validation matching database schema.

**Build Process**: 
- esbuild for server bundling with selective dependency bundling
- Vite for client bundling
- Separate development and production modes
- Hot module replacement (HMR) in development

### Data Storage Solutions

**Database**: PostgreSQL (configured via Drizzle ORM)

**ORM**: Drizzle ORM chosen for:
- Type-safe queries with TypeScript
- Lightweight with minimal runtime overhead
- SQL-like query builder (easier migration for developers familiar with SQL)
- Schema definition co-located with TypeScript types

**Schema Design**:
- Users table (starter schema with username/password)
- Schema definitions in `shared/schema.ts` for sharing between frontend/backend
- Migration files generated in `/migrations` directory

**Development Storage**: In-memory storage implementation (`MemStorage`) for development/testing without database dependency.

### Authentication and Authorization

**Current State**: Basic authentication structure in place
- User schema with username/password fields
- Storage interface defines user CRUD operations
- No active authentication implementation (starter template)

**Planned Approach** (based on dependencies):
- Passport.js with local strategy for traditional authentication
- Express-session for session management
- bcrypt for password hashing (to be implemented)
- Session storage using connect-pg-simple with PostgreSQL

### Design System and Branding

**Visual Identity**:
- Professional, trust-building aesthetic inspired by Indian fintech platforms (Zerodha, Groww)
- Primary brand colors: Navy blue primary, amber secondary, cyan accent
- Logo: Custom company logo stored in attached_assets
- Generated hero images featuring Indian professionals and families

**Component Patterns**:
- Card-based layouts for service offerings
- Accordion-based FAQ section for content organization
- Modal-based consultation booking flow
- Trust indicators (certifications, client count) prominently displayed
- Testimonials with avatar images

### Form Handling and Validation

**Form Library**: React Hook Form with @hookform/resolvers for Zod schema validation

**Validation Strategy**:
- Zod schemas for runtime validation
- Type inference from Zod schemas for compile-time safety
- Form schemas derived from database schemas using drizzle-zod
- Client-side validation with error messages

**Key Forms**:
- Consultation booking (multi-step with service selection, contact info, scheduling)
- Newsletter subscription
- Financial calculator inputs

### External Dependencies

**UI Component Libraries**:
- Radix UI (@radix-ui/*) - Accessible component primitives
- lucide-react - Icon library
- react-icons - Additional icon sets (social media)
- embla-carousel-react - Carousel/slider functionality
- cmdk - Command palette component
- class-variance-authority - Component variant management
- tailwind-merge - Tailwind class merging utility

**Utility Libraries**:
- date-fns - Date manipulation and formatting
- nanoid - Unique ID generation
- clsx - Conditional class name construction

**Development Dependencies**:
- TypeScript - Type safety
- tsx - TypeScript execution for Node.js
- Vite plugins for Replit integration (@replit/vite-plugin-*)
- ESBuild - Fast JavaScript bundler
- PostCSS with Autoprefixer - CSS processing

**Backend Dependencies** (configured but not fully implemented):
- express-rate-limit - API rate limiting
- express-session - Session management
- passport & passport-local - Authentication
- nodemailer - Email functionality (planned)
- multer - File upload handling (planned)
- cors - Cross-origin resource sharing

**Database and ORM**:
- pg - PostgreSQL client
- drizzle-orm - TypeScript ORM
- drizzle-kit - Schema migrations and utilities
- connect-pg-simple - PostgreSQL session store

**Google Fonts**: 
- Inter - Primary UI font
- Manrope - Heading font
- DM Sans, Architects Daughter, Fira Code, Geist Mono - Additional typefaces

**Asset Management**:
- Custom logo image in attached_assets
- Generated hero and testimonial images
- Static assets served from dist/public in production