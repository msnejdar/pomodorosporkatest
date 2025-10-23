# 🚀 Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy this Vite + React application.

### Method 1: GitHub Integration (Automatic)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

Every push to `main` will automatically deploy!

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Deploy to Netlify

### Method 1: Drag & Drop

1. Build your project:
```bash
npm run build
```

2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder to the upload area
4. Your site is live!

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init

# Deploy to production
netlify deploy --prod
```

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/pomodorosporkatest",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/pomodorosporkatest/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

## Deploy to Railway

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Login and init:
```bash
railway login
railway init
```

3. Add start script to `package.json`:
```json
{
  "scripts": {
    "start": "npx serve dist"
  }
}
```

4. Deploy:
```bash
railway up
```

## Environment Variables

This app doesn't require environment variables, but if you need them:

### Vercel
- Add in Project Settings → Environment Variables

### Netlify
- Add in Site Settings → Environment Variables

### Local Development
Create `.env.local`:
```
VITE_API_URL=your_api_url
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Build Optimization

The project is already optimized with:
- ✅ Code splitting (react-vendor, animation-vendor, audio-vendor)
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression
- ✅ Bundle size < 200KB

### Check Bundle Size

```bash
npm run build
```

Look for output:
```
dist/assets/audio-vendor-*.js       ~37 kB
dist/assets/index-*.js              ~40 kB
dist/assets/animation-vendor-*.js  ~115 kB
dist/assets/react-vendor-*.js      ~142 kB
```

## Performance Tips

1. **Enable CDN** - Vercel and Netlify do this automatically
2. **Add Custom Domain** - Better for production
3. **Enable HTTPS** - Automatic on all platforms
4. **Monitor Performance** - Use Lighthouse

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Deployment Issues
- Check `vercel.json` or `netlify.toml` is present
- Verify Node.js version (18+)
- Check build logs for errors

### Routing Issues
- Ensure rewrites are configured (see `vercel.json`)
- For SPA, all routes should redirect to `index.html`

## Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Verify colors display correctly
- [ ] Test keyboard shortcuts
- [ ] Check localStorage persistence
- [ ] Test audio notifications
- [ ] Verify responsive design on mobile
- [ ] Test all 10 colors are visible
- [ ] Check confetti effects
- [ ] Verify SVG backgrounds load

## Custom Domain Setup

### Vercel
1. Project Settings → Domains
2. Add your domain
3. Update DNS records

### Netlify
1. Domain Settings → Custom Domains
2. Add domain
3. Configure DNS

---

**Your Pomodoro Timer is ready for the world! 🎉**

For issues, check the main [README.md](README.md)
