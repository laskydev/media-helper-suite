# Deployment Guide

This guide covers deploying PDFCraft to various platforms, with a primary focus on Vercel.

## 📋 Prerequisites

- Git repository hosted on GitHub, GitLab, or Bitbucket
- Node.js 20+ installed locally
- pnpm 8+ installed locally

## 🚀 Deploying to Vercel (Recommended)

Vercel is the recommended platform for PDFCraft because:

- Optimized for Next.js applications
- Global CDN for fast loading times
- Automatic HTTPS and SSL certificates
- Zero configuration for most use cases
- Free tier available

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to a Git repository**

   ```bash
   git add .
   git commit -m "feat: prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Build Settings**

   Vercel should auto-detect the monorepo structure, but verify these settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm install && pnpm build --filter=@pdfcraft/web`
   - **Install Command**: `cd ../.. && pnpm install`
   - **Output Directory**: `.next`

4. **Environment Variables** (if needed)

   For the current backend-less architecture, no environment variables are required.

   If you add analytics or other services later:
   - Click "Environment Variables" in project settings
   - Add key-value pairs
   - Redeploy to apply changes

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from Project Root**

   ```bash
   # From the repository root
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy? **Yes**
   - Which scope? Choose your account
   - Link to existing project? **No** (first time)
   - What's your project's name? **pdfcraft**
   - In which directory is your code located? **apps/web**

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

The `vercel.json` file in `apps/web/` is pre-configured for optimal deployment:

```json
{
  "buildCommand": "cd ../.. && pnpm build --filter=@pdfcraft/web",
  "devCommand": "cd ../.. && pnpm dev --filter=@pdfcraft/web",
  "installCommand": "cd ../.. && pnpm install",
  "framework": "nextjs",
  "outputDirectory": "apps/web/.next"
}
```

## 🌐 Deploying to Netlify

1. **Build Configuration**

   Create `netlify.toml` in repository root:

   ```toml
   [build]
     base = "apps/web"
     command = "cd ../.. && pnpm install && pnpm build --filter=@pdfcraft/web"
     publish = "apps/web/.next"

   [build.environment]
     NODE_VERSION = "20"
     NPM_FLAGS = "--version"
   ```

2. **Deploy via Netlify Dashboard**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Configure build settings (auto-detected from `netlify.toml`)
   - Click "Deploy site"

## 🐳 Docker Deployment (Self-Hosted)

For self-hosted deployments, use Docker:

1. **Build Docker Image**

   ```bash
   docker build -t pdfcraft:latest -f apps/web/Dockerfile .
   ```

2. **Run Container**

   ```bash
   docker run -p 3000:3000 pdfcraft:latest
   ```

3. **Docker Compose** (if you have other services)
   ```yaml
   version: '3.8'
   services:
     web:
       build:
         context: .
         dockerfile: apps/web/Dockerfile
       ports:
         - '3000:3000'
       environment:
         - NODE_ENV=production
   ```

## 📊 Post-Deployment Checklist

After deploying, verify:

- ✅ Home page loads correctly
- ✅ PDF Merge tool is accessible at `/tools/merge`
- ✅ File upload works (drag & drop + click)
- ✅ PDF merging processes correctly
- ✅ Download functionality works
- ✅ Progress bar shows during processing
- ✅ Error messages display for invalid files
- ✅ All static assets load (fonts, icons)
- ✅ Responsive design works on mobile
- ✅ Console has no errors

## 🔧 Troubleshooting

### Build Fails with "Module not found"

**Cause**: Workspace packages not properly linked

**Solution**:

```bash
# Clean and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

### "Next.js could not find a production build"

**Cause**: Build output directory misconfigured

**Solution**: Verify `next.config.js`:

```javascript
module.exports = {
  output: 'standalone', // Ensure this is set
  // ... other config
};
```

### PDF Processing Fails in Production

**Cause**: WASM or Web Worker issues

**Solution**: Check browser console for errors. Ensure:

- `pdf-lib` is included in dependencies (not devDependencies)
- No CSP (Content Security Policy) blocking WASM execution
- Check Vercel logs for build errors

### Large Bundle Size Warning

**Cause**: pdf-lib is ~500KB

**Solution**: This is expected for Phase 1. Future optimizations:

- Lazy load PDF processing only when needed
- Use dynamic imports: `const { mergePDFs } = await import('@pdfcraft/pdf-engine')`

## 🎯 Performance Optimization

### Vercel Edge Network

- Vercel automatically distributes your static site globally
- Average response time < 50ms worldwide

### Next.js Optimization

- Static generation (SSG) for all pages
- Automatic code splitting
- Image optimization (if you add images later)

### Bundle Size Monitoring

```bash
# Analyze bundle size
cd apps/web
pnpm build
```

Current bundle sizes:

- Home page: ~96 KB First Load JS
- Merge tool: ~289 KB First Load JS (includes pdf-lib)

## 🔒 Security Considerations

### Client-Side Processing

- **Advantage**: Files never leave the user's browser
- **Privacy**: GDPR compliant by design
- **No data retention**: Zero data stored on servers

### Headers Configuration

For Vercel, add security headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

## 📈 Monitoring & Analytics

### Vercel Analytics (Built-in)

Enable in project settings:

1. Go to Vercel Dashboard
2. Select your project
3. Navigate to "Analytics" tab
4. Enable Web Analytics

### Custom Analytics

Add your preferred analytics in `apps/web/src/app/layout.tsx`:

```typescript
// Example: Plausible Analytics (privacy-friendly)
<Script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
/>
```

## 🚀 Continuous Deployment

Vercel automatically deploys:

- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a preview URL

### Deployment Workflow

```
Developer Push → GitHub → Vercel Webhook → Build → Deploy → Live
                    ↓
              Preview URL sent to PR
```

## 🔄 Rollback Strategy

If something goes wrong:

1. **Via Vercel Dashboard**
   - Go to "Deployments"
   - Find last working deployment
   - Click "..." → "Promote to Production"

2. **Via Git**
   ```bash
   git revert HEAD
   git push origin main
   # Vercel auto-deploys the reverted version
   ```

## 📞 Support

For deployment issues:

- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- GitHub Issues: [Report deployment issues](https://github.com/laskydev/media-helper-suite/issues)

---

**Built with ❤️ for Vercel deployment**
