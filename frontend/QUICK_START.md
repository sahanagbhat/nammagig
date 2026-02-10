# 🚀 Quick Start Guide

Get your Nomad Matcher platform running in 10 minutes!

## Prerequisites Checklist
- [ ] Node.js 20+ installed
- [ ] Google account for OAuth setup
- [ ] Code editor (VS Code recommended)

## Step 1: Extract & Setup (2 minutes)

```bash
# Navigate to the project
cd nomad-matcher

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

## Step 2: Get Google OAuth Credentials (3 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "Nomad Matcher"
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure:
   - Application type: **Web application**
   - Name: "Nomad Matcher Dev"
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5173`
6. **Copy the Client ID**

## Step 3: Configure Environment (1 minute)

Edit `.env` file:
```env
VITE_GOOGLE_CLIENT_ID=paste_your_client_id_here
VITE_API_URL=http://localhost:8000
```

## Step 4: Start Development Server (1 minute)

```bash
npm run dev
```

Open browser: `http://localhost:5173`

## 🎉 You're Done!

The frontend is now running. You can:
- Click "Get Started" to test Google login
- Navigate through the interface
- Test the registration flows (they'll show mock data without backend)

## Next Steps

### To Add Backend (Optional for Testing)

Follow `BACKEND_SETUP.md` for:
- FastAPI backend setup
- MongoDB connection
- Full registration flow

### To Deploy

Follow `DEPLOYMENT.md` for:
- Vercel/Netlify deployment
- Production configuration
- Backend deployment options

## Common Issues

### Can't npm install?
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Google OAuth not working?
- Double-check Client ID in `.env`
- Verify authorized origins in Google Console
- Make sure you're accessing via `http://localhost:5173` (not 127.0.0.1)

### Port 5173 already in use?
```bash
# Kill the process
kill -9 $(lsof -ti:5173)

# Or change port in vite.config.ts
```

## File Structure Quick Reference

```
nomad-matcher/
├── src/
│   ├── pages/           → Add new pages here
│   ├── components/      → Reusable UI components
│   ├── services/        → API calls
│   └── types/           → TypeScript definitions
├── .env                 → Your configuration
├── README.md            → Full documentation
├── DEPLOYMENT.md        → Deploy to production
└── BACKEND_SETUP.md     → Setup backend API
```

## Support

- 📖 Full docs: See `README.md`
- 🐛 Issues: Check common issues above
- 💬 Questions: Create an issue in the repo

---

**Happy coding!** 🌾✨
