# Team Finance Website - Project State

## Current Status
User login with profile functionality has been implemented. Users can now:
- Log in via Replit Auth (Google, GitHub, email/password)
- View and edit their profile with personal details

## Recent Changes (Just Completed)
- Added user authentication using Replit Auth (OpenID Connect)
- Created database tables for users and sessions
- Created Profile page where users can enter personal details
- Added login/logout buttons to Header (desktop and mobile)
- Added user dropdown menu with Profile and Logout options

## User Profile Fields
- First Name, Last Name
- Date of Birth
- Phone Number
- Address, City, State, Pincode
- Occupation
- Annual Income (dropdown with ranges)

## Authentication Flow
- Login: Navigate to /api/login
- Logout: Navigate to /api/logout
- Callback: /api/callback handles OAuth redirect
- User data: /api/auth/user (returns null if not authenticated)
- Profile update: PATCH /api/auth/profile (authenticated only)

## Company Information
- **Name**: Team Finance
- **Tagline**: "Growing Your Future"
- **Logo**: `attached_assets/abhishek_ghayre_this_is_our_orignal_company_logo_we_are_starti_1765044564982.png`

## Key Files
### Auth Related
- `server/replitAuth.ts` - Replit Auth middleware
- `server/storage.ts` - Database storage with user operations
- `server/db.ts` - Database connection
- `shared/schema.ts` - Database schema with users and sessions tables
- `client/src/hooks/useAuth.ts` - Auth hook for frontend
- `client/src/lib/authUtils.ts` - Auth utility functions

### Pages & Components
- `client/src/pages/Profile.tsx` - User profile page with form
- `client/src/pages/Home.tsx` - Landing page with all sections
- `client/src/components/Header.tsx` - Navigation with login/logout
- `client/src/components/FinancialCalculator.tsx` - Financial calculator

## Technical Notes
- Using Replit Auth (OpenID Connect) for authentication
- PostgreSQL database with Drizzle ORM
- Sessions stored in database using connect-pg-simple
- React + Vite + Express stack
- Workflow running on port 5000
