# Nomad Matcher - Complete Frontend Package

## 📦 What's Included

This package contains a **production-ready React frontend** for the Gig-Economy Nomad Matcher platform.

### ✨ Complete Feature Set

#### 🔐 Authentication
- Google OAuth integration with @react-oauth/google
- JWT token management
- Protected routes
- Automatic session handling

#### 📝 Registration Flows
1. **Farmer Registration** (3-step form)
   - Personal information
   - Farm details and activities
   - Document uploads (Aadhaar, farm photos)

2. **Content Creator Registration** (3-step form)
   - Personal information
   - Social media profiles (Instagram, YouTube)
   - Skills and expertise

3. **Tourist Registration** (2-step form)
   - Personal information
   - Trip preferences and expectations

#### 🎨 UI Components
- Responsive navbar with authentication state
- Hero section with farm imagery
- Role selection cards
- Multi-step progress indicators
- File upload with image preview
- Multi-select for activities/skills
- Toast notifications
- Protected route wrapper

#### 🛠️ Tech Stack
- **React 18** + **TypeScript** - Modern, type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router v6** - Client-side routing
- **React Hook Form** + **Zod** - Form validation
- **Axios** - HTTP client with interceptors
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
nomad-matcher/
│
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── RoleCard.tsx
│   │   ├── GoogleLoginButton.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── FileUpload.tsx
│   │   ├── MultiSelect.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── pages/               # Page components
│   │   ├── Landing.tsx           # Hero + role overview
│   │   ├── Dashboard.tsx         # Role selection
│   │   ├── Gigs.tsx             # Matched opportunities
│   │   └── Register/
│   │       ├── FarmerRegistration.tsx
│   │       ├── CreatorRegistration.tsx
│   │       └── TouristRegistration.tsx
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.tsx          # Authentication context
│   │
│   ├── services/            # API integration
│   │   └── api.ts               # Axios instance + endpoints
│   │
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   │
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + Tailwind
│
├── public/                  # Static assets
├── index.html              # HTML template
│
├── Configuration Files
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind customization
├── tsconfig.json           # TypeScript config
├── postcss.config.js       # PostCSS config
│
├── Documentation
├── README.md               # Complete documentation
├── QUICK_START.md          # 10-minute setup guide
├── DEPLOYMENT.md           # Production deployment
├── BACKEND_SETUP.md        # Backend API guide
│
└── Environment
    ├── .env.example        # Environment template
    └── .gitignore         # Git ignore rules
```

## 🎯 Key Features

### 1. Multi-Step Forms with Validation
- Progressive disclosure design
- Real-time validation with Zod
- Visual progress indicators
- Step navigation with error prevention

### 2. File Uploads
- Image preview before upload
- Drag-and-drop support
- File type validation
- Size restrictions

### 3. Responsive Design
- Mobile-first approach
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Touch-friendly interactions
- Optimized for all devices

### 4. Agritourism-Themed Design
- Green and earth-tone color palette
- Farm imagery and icons
- Professional yet approachable aesthetic
- Consistent with Karnataka rural theme

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Google OAuth:**
   - Get Client ID from Google Cloud Console
   - Add to `.env` file

3. **Start development:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   `http://localhost:5173`

See `QUICK_START.md` for detailed instructions.

## 📚 Documentation

- **README.md** - Complete technical documentation
- **QUICK_START.md** - Get running in 10 minutes
- **DEPLOYMENT.md** - Deploy to Vercel, Netlify, or self-host
- **BACKEND_SETUP.md** - FastAPI + MongoDB backend guide

## 🔧 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { /* green shades */ },
  earth: { /* brown/neutral */ }
}
```

### API Endpoints
Edit `src/services/api.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL;
```

### Forms
Add/modify fields in:
- `src/pages/Register/FarmerRegistration.tsx`
- `src/pages/Register/CreatorRegistration.tsx`
- `src/pages/Register/TouristRegistration.tsx`

## 🌐 Deployment Ready

### Optimizations Included
✅ Code splitting with Vite
✅ Lazy loading
✅ Production build optimization
✅ Environment variable management
✅ Error boundary handling
✅ SEO-friendly routing

### Deployment Options
- **Vercel** - Recommended (free tier available)
- **Netlify** - Easy setup (free tier available)
- **Self-hosted** - Nginx configuration included

## 🔌 Backend Integration

The frontend is configured to work with a FastAPI backend. Mock responses are included for development without a backend.

**API Endpoints Expected:**
- `POST /auth/google` - Google OAuth callback
- `POST /api/register/farmer` - Farmer registration
- `POST /api/register/creator` - Creator registration
- `POST /api/register/tourist` - Tourist registration
- `GET /api/gigs` - Get matched opportunities

See `BACKEND_SETUP.md` for complete backend implementation.

## 📊 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

Built for Karnataka's agritourism ecosystem.

## 🤝 Support

- Read the documentation in `README.md`
- Check `QUICK_START.md` for setup help
- Review `DEPLOYMENT.md` for production issues

---

**Built with ❤️ for Karnataka farmers, content creators, and tourists**

Start with `QUICK_START.md` → Get running in 10 minutes! 🚀
