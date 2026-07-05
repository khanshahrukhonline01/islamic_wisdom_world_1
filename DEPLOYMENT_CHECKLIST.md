# Islamic Preach - Deployment Checklist

Use this checklist before deploying to production.

## ✅ Pre-Deployment Tasks

### Code Quality (5 min)
- [ ] Run `npm run typecheck` - all types pass
- [ ] Run `npm run test` - all tests pass
- [ ] Run `npm run format.fix` - code formatted
- [ ] No console warnings in dev mode
- [ ] No console errors in dev mode

### Build Verification (5 min)
```bash
npm run build:client
```
- [ ] Build completes without errors
- [ ] `dist/spa/index.html` exists
- [ ] `dist/spa/assets/` folder has JS and CSS
- [ ] No missing chunks or imports

### Content Review (10 min)
- [ ] All navigation links work
- [ ] No broken image links
- [ ] All pages load correctly
- [ ] Search functionality works
- [ ] Learning modules load
- [ ] AI tools accessible
- [ ] All legal pages present

### Configuration Updates (5 min)
- [ ] Update domain URL in config
- [ ] Update contact emails
- [ ] Update company name
- [ ] Update sitemap.xml with real domain
- [ ] Update robots.txt with real domain
- [ ] Review all .env.production variables

### Functionality Testing (15 min)
- [ ] Test on Chrome (desktop)
- [ ] Test on Firefox (desktop)
- [ ] Test on Safari (if available)
- [ ] Test on mobile (iOS)
- [ ] Test on mobile (Android)
- [ ] Language switcher works
- [ ] RTL languages display correctly
- [ ] Dark mode toggle works (if enabled)
- [ ] Search filters work
- [ ] Bookmarks save/load
- [ ] Progress persists (localStorage)
- [ ] Streak counter updates

### Performance Check (10 min)
- [ ] Run Lighthouse in Chrome DevTools
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90
- [ ] No Critical issues
- [ ] Page load < 3 seconds

### SEO Preparation (5 min)
- [ ] Meta title on all pages
- [ ] Meta description on all pages
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Sitemap.xml in public folder
- [ ] Robots.txt in public folder
- [ ] Canonical URLs set
- [ ] Structured data (schema.org) added

### Legal & Compliance (10 min)
- [ ] Privacy Policy complete and accurate
- [ ] Terms & Conditions complete and accurate
- [ ] Disclaimer page present
- [ ] About Us page complete
- [ ] Contact information correct
- [ ] AdSense policies acknowledged
- [ ] No prohibited content

### Analytics Setup (5 min)
- [ ] Google Analytics ID obtained (if using)
- [ ] Google Search Console account created
- [ ] Verify domain ownership in GSC
- [ ] Submit sitemap to GSC
- [ ] AdSense account setup (optional)

## 🚀 Deployment Steps

### Choose Deployment Platform

**Option A: Netlify (Recommended)**
1. Go to netlify.com
2. Connect GitHub repository
3. Build command: `npm run build:client`
4. Publish directory: `dist/spa`
5. Click "Deploy"

**Option B: Vercel**
1. Go to vercel.com
2. Import project
3. Vercel auto-detects settings
4. Click "Deploy"

**Option C: GitHub Pages**
1. Add `.github/workflows/deploy.yml`
2. Set GitHub secrets:
   - `NETLIFY_AUTH_TOKEN` (if using Netlify)
   - `NETLIFY_SITE_ID` (if using Netlify)
3. Push to main branch
4. Workflow runs automatically

## 📋 Post-Deployment Verification

### Immediate Checks (5 min)
- [ ] Website loads at domain
- [ ] No 404 errors
- [ ] All pages accessible
- [ ] No console errors
- [ ] HTTPS working
- [ ] Redirect to HTTPS works

### Functional Tests (15 min)
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Learning modules load
- [ ] Search works
- [ ] User progress saves
- [ ] Bookmarks work
- [ ] Language switching works
- [ ] Mobile responsive

### Performance Check (5 min)
- [ ] Page load time acceptable
- [ ] No missing assets (images, CSS, JS)
- [ ] Google Fonts loading
- [ ] Icons rendering correctly
- [ ] Analytics script loaded

### SEO Verification (10 min)
- [ ] Google Search Console shows site
- [ ] Sitemap indexed by Google
- [ ] Pages crawled by Google
- [ ] No crawl errors
- [ ] Rich snippets showing (if applicable)

### Security Check (5 min)
- [ ] HTTPS certificate valid
- [ ] Security headers present
- [ ] No mixed content warnings
- [ ] No unsafe scripts loading
- [ ] No unencrypted connections

## 🔄 Post-Deployment Actions

### First Day
- [ ] Monitor uptime
- [ ] Check error logs
- [ ] Verify analytics data
- [ ] Test all forms
- [ ] Monitor performance metrics

### First Week
- [ ] Check Google Search Console
- [ ] Review analytics
- [ ] Monitor bounce rate
- [ ] Fix any reported issues
- [ ] Gather user feedback

### First Month
- [ ] Apply for AdSense
- [ ] Setup email notifications
- [ ] Create content roadmap
- [ ] Plan feature additions
- [ ] Review user behavior data

## 🆘 Troubleshooting

### Common Issues

**Blank page on deployment**
```
1. Check browser console for errors
2. Verify dist/spa/index.html exists
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check deployment logs for build errors
```

**Routes return 404**
```
1. Verify netlify.toml or vercel.json exists
2. Check SPA routing configuration
3. Ensure index.html redirect enabled
4. Redeploy after config changes
```

**Slow page load**
```
1. Run Lighthouse to identify issues
2. Check bundle size with npm run build:client
3. Optimize images
4. Enable CDN caching
5. Consider upgrading plan
```

**Missing assets (CSS/JS)**
```
1. Hard refresh (Ctrl+Shift+R)
2. Clear CDN cache
3. Verify build output in dist/spa
4. Check console for 404 errors
5. Redeploy if needed
```

## 📊 Monitoring Setup

### Uptime Monitoring
- [ ] Setup UptimeRobot (free)
- [ ] Alert email configured
- [ ] Check every 5 minutes
- [ ] Monthly report enabled

### Analytics
- [ ] Google Analytics tag added
- [ ] Goals configured
- [ ] Conversion tracking setup
- [ ] Daily reports scheduled

### Error Tracking
- [ ] Sentry account created (optional)
- [ ] Error notifications enabled
- [ ] Severity levels configured

### Performance Monitoring
- [ ] Core Web Vitals tracked
- [ ] Alert thresholds set
- [ ] Weekly reports configured

## 🔐 Security Checklist

- [ ] HTTPS enforced
- [ ] No hardcoded secrets
- [ ] Security headers set
- [ ] CSP policy configured
- [ ] XSS protection enabled
- [ ] No exposed API keys
- [ ] Input validation working
- [ ] CSRF protection if forms
- [ ] Rate limiting configured
- [ ] Regular security updates

## 📈 Success Metrics

### Target Metrics
- [ ] Page load < 2 seconds
- [ ] Lighthouse score > 90
- [ ] Bounce rate < 40%
- [ ] Mobile users > 50%
- [ ] Mobile Core Web Vitals pass
- [ ] 0 broken links
- [ ] 0 404 errors
- [ ] All pages indexed by Google

## 🎯 Next Steps After Launch

1. **Day 1-7**
   - Monitor uptime and errors
   - Gather initial user feedback
   - Fix critical issues
   - Verify analytics tracking

2. **Week 2-4**
   - Apply for AdSense
   - Optimize based on analytics
   - Create content calendar
   - Plan Phase 2 features

3. **Month 2+**
   - Add more content
   - Expand learning modules
   - Improve based on feedback
   - Scale infrastructure if needed

## 📞 Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Pages**: https://pages.github.com
- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **AdSense**: https://adsense.google.com

---

**Last Updated**: January 2024
**Status**: ✅ Ready for Production
**Version**: 1.0.0
