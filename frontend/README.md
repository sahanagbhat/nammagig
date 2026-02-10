# Nomad Matcher - Agritourism Platform Frontend

A complete React 18 + TypeScript frontend for the Gig-Economy Nomad Matcher platform, connecting Karnataka farmers with content creators and tourists for unique agritourism experiences.

## 🌟 Features

- **Google OAuth Authentication** - Secure login with Google
- **Multi-Step Registration Forms** - Separate flows for Farmers, Content Creators, and Tourists
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Protected Routes** - Authentication-based access control
- **File Uploads** - Image upload with preview for Aadhaar and farm photos
- **Multi-Select Components** - Interactive selection for skills, activities, and languages
- **Progress Indicators** - Visual feedback during registration
- **Toast Notifications** - User-friendly error and success messages

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
```bash
cd nomad-matcher
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your Google OAuth Client ID:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_API_URL=http://localhost:8000
```

4. **Start development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📋 Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services** → **Credentials**
4. Create **OAuth 2.0 Client ID**
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5173`
5. Copy the Client ID to your `.env` file

## 🏗️ Project Structure

```
nomad-matcher/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── RoleCard.tsx
│   │   ├── GoogleLoginButton.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── FileUpload.tsx
│   │   ├── MultiSelect.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/               # Page components
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Gigs.tsx
│   │   └── Register/
│   │       ├── FarmerRegistration.tsx
│   │       ├── CreatorRegistration.tsx
│   │       └── TouristRegistration.tsx
│   ├── hooks/               # Custom hooks
│   │   └── useAuth.tsx
│   ├── services/            # API services
│   │   └── api.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Navigation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@react-oauth/google** - Google authentication
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 🔐 Authentication Flow

1. User clicks "Get Started" on landing page
2. Google OAuth modal appears
3. User authenticates with Google
4. JWT token stored in localStorage
5. User redirected to Dashboard
6. Protected routes check authentication

## 📝 Registration Flows

### Farmer Registration (3 Steps)
1. **Personal Info**: Name, mobile, email
2. **Farm Details**: Location, type, activities, languages
3. **Documents**: Farm photo, Aadhaar upload

### Content Creator Registration (3 Steps)
1. **Personal Info**: Name, mobile, email, Aadhaar
2. **Social Profiles**: Instagram, YouTube URLs
3. **Skills**: Skills selection, languages

### Tourist Registration (2 Steps)
1. **Personal Info**: Name, mobile, email, country
2. **Trip Details**: Expectations, duration, dates, activities

## 🔌 API Integration

The frontend is configured to work with a FastAPI backend. Key endpoints:

- `POST /auth/google` - Google OAuth callback
- `POST /api/register/farmer` - Farmer registration
- `POST /api/register/creator` - Creator registration
- `POST /api/register/tourist` - Tourist registration
- `POST /api/upload` - File upload
- `GET /api/gigs` - Get matched gigs

## 🎯 Key Components

### GoogleLoginButton
Handles Google OAuth flow and token management.

### ProtectedRoute
Wrapper component that requires authentication.

### ProgressBar
Visual indicator for multi-step forms.

### FileUpload
File upload component with image preview.

### MultiSelect
Interactive multi-select for activities, skills, etc.

## 🚢 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
npm run build
vercel --prod
```

3. **Add environment variables in Vercel dashboard**

### Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Add environment variables in Netlify dashboard**

## 🧪 Development Tips

### Mock Backend
For development without a backend, the Google login will store a mock token. Update `GoogleLoginButton.tsx` to connect to your real backend.

### Testing
- Test all three registration flows
- Verify file uploads work
- Check responsive design on mobile
- Test protected route behavior

### Custom Styling
Tailwind colors can be customized in `tailwind.config.js`:
- Primary: Green shades (farm theme)
- Earth: Brown/neutral tones
- Accent colors for each user type

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🐛 Common Issues

### Google OAuth Not Working
- Verify Client ID in `.env`
- Check authorized origins in Google Console
- Ensure redirect URIs match

### API Calls Failing
- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check CORS configuration on backend

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🔜 Next Steps

1. **Backend Integration**: Connect to FastAPI backend
2. **AI Matching**: Implement gig matching algorithm
3. **Payments**: Integrate Razorpay for transactions
4. **Chat**: Add messaging between users
5. **Reviews**: Add rating and review system
6. **Maps**: Integrate Google Maps for farm locations

## 📄 License

This project is built for Karnataka's agritourism ecosystem.

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and component patterns.

## 📧 Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ for Karnataka farmers, creators, and tourists.
