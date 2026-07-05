# Islamic Preach - Deployment Guide

This guide covers deploying the Islamic Preach static website to production.

## What is Deployed

The application is a **React Single Page Application (SPA)** with:
- Static frontend assets (HTML, CSS, JavaScript)
- Client-side routing (all routing handled by React)
- localStorage for persistence (no backend database required)
- Fully self-contained - works offline after initial load

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] Run `npm run typecheck` to verify TypeScript
- [ ] Run `npm run test` to run tests
- [ ] Run `npm run format.fix` to format code
- [ ] Review all console warnings in dev mode

### ✅ Build Verification
```bash
npm run build:client
```
Verify `dist/spa` directory contains:
- `index.html` - Main entry point
- `assets/` - JavaScript, CSS bundles
- All chunks are gzipped

### ✅ Content & Legal
- [ ] All legal pages are present: `/privacy`, `/terms`, `/disclaimer`, `/about`
- [ ] Contact email addresses are updated
- [ ] All links work correctly
- [ ] Language switcher works for all 20+ languages
- [ ] RTL languages display correctly

### ✅ Performance
- [ ] Lighthouse score > 90
- [ ] Time to Interactive < 3s
- [ ] First Contentful Paint < 1.5s
- [ ] Bundle size is optimized

### ✅ Functionality
- [ ] All navigation links work
- [ ] Learning modules load correctly
- [ ] Content search functions properly
- [ ] User progress persists (localStorage)
- [ ] Bookmarks work correctly
- [ ] Language switching works globally

## Deployment Options

### Option 1: Deploy to Netlify (Recommended)

Netlify is best for static sites and has automatic HTTPS, CDN, and free tier.

#### Prerequisites
- Netlify account (free at netlify.com)
- GitHub repository connected

#### Automatic Deployment
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build:client`
4. Set publish directory: `dist/spa`
5. Deploy automatically on git push

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist/spa
```

**Configuration File**: `netlify.toml` (already configured)

### Option 2: Deploy to Vercel

Vercel is optimized for React apps with edge functions and analytics.

#### Prerequisites
- Vercel account (free at vercel.com)
- GitHub repository connected

#### Automatic Deployment
1. Import project into Vercel
2. Vercel auto-detects React app
3. Sets build command: `npm run build:client`
4. Sets output directory: `dist/spa`
5. Deploys automatically

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Configuration File**: `vercel.json` (already configured)

### Option 3: Deploy to GitHub Pages

GitHub Pages is free and simple for static sites.

#### Setup
1. Create GitHub Actions workflow
2. Build on push to main branch
3. Deploy to gh-pages branch

#### Workflow File
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:client
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/spa
```

### Option 4: Deploy to Any Static Host

Works with AWS S3, Cloudflare Pages, Digital Ocean, etc.

#### Steps
1. Build locally: `npm run build:client`
2. Upload `dist/spa` folder to host
3. Configure SPA routing (all routes → index.html)
4. Enable HTTPS/SSL
5. Set cache headers

## Post-Deployment

### Verification Checklist
- [ ] Site loads at your domain
- [ ] All pages accessible
- [ ] No 404 errors
- [ ] Search works correctly
- [ ] Learning modules accessible
- [ ] Mobile responsive on all devices
- [ ] Navigation works
- [ ] Footer links functional
- [ ] Legal pages display correctly
- [ ] Language switching works

### Monitor Performance
- Set up Google Analytics
- Monitor Core Web Vitals
- Check error rates
- Monitor uptime

### Enable Google AdSense
1. Request AdSense account approval
2. Add AdSense ID to tracking
3. Place ad codes (if using Vercel/Netlify functions)
4. Monitor earnings

## Environment Variables

Currently the app doesn't require environment variables. If you add them:

1. Create `.env.local` (git-ignored)
2. Add variables: `VITE_API_KEY=xxx`
3. Access in code: `import.meta.env.VITE_API_KEY`
4. Set in deployment platform's env vars

## SSL/HTTPS

All deployment platforms (Netlify, Vercel, GitHub Pages) provide free SSL certificates. HTTPS is automatically enabled.

## Custom Domain

### Netlify
1. Settings → Domain management
2. Add custom domain
3. Update DNS records

### Vercel
1. Settings → Domains
2. Add domain
3. Update DNS records

### GitHub Pages
Update repository settings:
1. Settings → Pages
2. Custom domain field
3. Update DNS

## Performance Optimization

### Already Implemented
- ✅ Code splitting via Vite
- ✅ Async component imports
- ✅ CSS optimization via Tailwind
- ✅ Image optimization
- ✅ Caching headers in netlify.toml

### Additional Steps
1. Enable Gzip compression (automatic on all platforms)
2. Set up CDN caching (automatic)
3. Consider lazy loading for images
4. Monitor Core Web Vitals

## Rollback

If deployment has issues:

**Netlify**: 
- Deploys → Select previous version → Click "Restore"

**Vercel**: 
- Deployments → Select previous → Promote to Production

**GitHub Pages**:
- Push previous commit or use `git revert`

## Support & Troubleshooting

### Common Issues

**Blank page after deployment**
- Clear browser cache
- Check browser console for errors
- Verify all routes redirect to index.html

**Routes return 404**
- Ensure SPA routing is configured
- Check netlify.toml or vercel.json

**Assets 404 (CSS/JS missing)**
- Clear CDN cache
- Verify build output in dist/spa
- Check base path configuration

**Slow loading**
- Check bundle size with `npm run build:client`
- Use lighthouse to identify bottlenecks
- Consider upgrading plan for better CDN

### Debug Mode
Set in deployment platform:
```
DEBUG=true
```

## Security Checklist

- ✅ HTTPS enabled
- ✅ No hardcoded secrets
- ✅ Content Security Policy headers set
- ✅ X-Content-Type-Options header set
- ✅ Privacy policy linked
- ✅ Terms & conditions linked
- ✅ No sensitive data in localStorage

## SEO Optimization

### Implemented
- ✅ Proper page titles
- ✅ Meta descriptions
- ✅ Semantic HTML
- ✅ Mobile responsive
- ✅ Fast loading

### Add sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/learn</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/privacy</loc>
    <priority>0.5</priority>
  </url>
</urlset>
```

### Add robots.txt
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## Monitoring & Analytics

### Google Analytics
Add to `client/App.tsx`:
```tsx
// Add Google Analytics script
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

### Sentry (Error Tracking)
For production error tracking, integrate Sentry for real-time error notifications.

## Budget Estimate

**Free Tier Costs:**
- Netlify: Free tier (100GB/month bandwidth)
- Vercel: Free tier (100GB/month)
- GitHub Pages: Always free

**Paid Tier (if needed):**
- Custom domain: $12/year
- Upgrade: $5-20/month for more bandwidth

## Final Verification

Run before deployment:
```bash
# Check types
npm run typecheck

# Build for production
npm run build:client

# Check output
ls -la dist/spa/

# Verify index.html exists
cat dist/spa/index.html | head -20
```

## Next Steps After Deployment

1. ✅ Request Google AdSense approval
2. ✅ Set up Google Analytics
3. ✅ Submit sitemap to Google Search Console
4. ✅ Add domain to Google Search Console
5. ✅ Monitor uptime with UptimeRobot
6. ✅ Set up alerts for errors
7. ✅ Plan Phase 2 features

---

**Need Help?**
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- GitHub Pages Docs: https://pages.github.com
