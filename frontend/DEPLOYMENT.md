# Deployment Guide - Nomad Matcher Frontend

## Prerequisites
- Google OAuth Client ID configured
- Backend API deployed (or use mock mode)
- Node.js 20+ installed

## Option 1: Vercel (Recommended)

### Step 1: Prepare Project
```bash
npm run build
```

### Step 2: Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Step 3: Configure Environment Variables
In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `VITE_GOOGLE_CLIENT_ID` = your_google_client_id
   - `VITE_API_URL` = your_backend_url

### Step 4: Update Google OAuth
In Google Cloud Console:
1. Add Vercel domain to authorized origins
2. Add Vercel domain to redirect URIs

---

## Option 2: Netlify

### Step 1: Install Netlify CLI
```bash
npm i -g netlify-cli
```

### Step 2: Build Project
```bash
npm run build
```

### Step 3: Deploy
```bash
netlify deploy --prod --dir=dist
```

### Step 4: Configure
1. **Build settings** in Netlify dashboard:
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment variables**:
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_API_URL`

3. **Redirects** - Create `public/_redirects`:
```
/*    /index.html   200
```

---

## Option 3: Self-Hosted (Ubuntu/Nginx)

### Step 1: Build Project
```bash
npm run build
```

### Step 2: Upload to Server
```bash
scp -r dist/* user@your-server:/var/www/nomad-matcher/
```

### Step 3: Configure Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/nomad-matcher;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (optional)
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Step 4: SSL with Let's Encrypt
```bash
sudo certbot --nginx -d your-domain.com
```

---

## Backend Setup (FastAPI)

### Quick FastAPI Backend
```python
# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-url.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/auth/google")
async def google_auth(code: str):
    # Implement Google OAuth verification
    return {"access_token": "jwt_token", "user": {...}}

@app.post("/api/register/{role}")
async def register(role: str):
    # Implement registration logic
    return {"success": True}
```

### Deploy Backend
- **Render**: Connect GitHub repo
- **Railway**: `railway up`
- **DigitalOcean**: App Platform

---

## Environment Variables Summary

### Frontend (.env)
```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_API_URL=https://your-backend-api.com
```

### Backend (.env)
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
SECRET_KEY=your_jwt_secret_key
MONGODB_URL=mongodb+srv://...
```

---

## Post-Deployment Checklist

- [ ] Frontend accessible at domain
- [ ] Google OAuth configured with production URLs
- [ ] Backend API responding
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] Test all registration flows
- [ ] Test file uploads
- [ ] Monitor error logs

---

## Monitoring & Analytics

### Add Google Analytics (Optional)
In `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking with Sentry
```bash
npm install @sentry/react
```

---

## Scaling Considerations

1. **CDN**: Use Vercel/Netlify CDN or Cloudflare
2. **Image Optimization**: Implement lazy loading
3. **Code Splitting**: Already configured with Vite
4. **API Caching**: Implement Redis on backend
5. **Database**: MongoDB Atlas with proper indexing

---

## Troubleshooting

### Build Fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### OAuth Issues
- Verify URLs in Google Console match deployment
- Check redirect URIs include https://
- Clear browser cookies

### API Connection Issues
- Check CORS headers
- Verify VITE_API_URL is correct
- Test API endpoints directly

---

## Cost Estimates

### Free Tier Options
- **Vercel**: Free for personal projects
- **Netlify**: Free for personal projects
- **MongoDB Atlas**: 512MB free
- **Render**: Free tier backend (sleeps after 15min)

### Paid Options (Recommended for Production)
- **Vercel Pro**: $20/month
- **MongoDB Atlas**: $57/month (M10 cluster)
- **Render**: $7/month per service

---

## Updates & Maintenance

### Update Dependencies
```bash
npm update
npm audit fix
```

### Deploy Updates
```bash
git push origin main
# Vercel/Netlify auto-deploy from main branch
```

---

For support, refer to the main README.md or create an issue.
