# Dr. Evil's Coffee - Deployment Guide

## Pre-Deployment Checklist

### 1. Image Assets (CRITICAL)
- [ ] **Export all Figma images** - See `/public/assets/README.md` for complete list
- [ ] Place images in `/public/assets/images/` following the structure below:
  ```
  /public/assets/images/
    ├── heritage/
    │   ├── vintage-dr-evil.png
    │   ├── dressing-room.png
    │   ├── morris-costumes.png
    │   ├── modern-lab.png
    │   └── philip-morris.png
    ├── equipment/
    │   ├── roest-lab.png
    │   └── lamarzocco.png
    ├── about/
    │   └── founder.png
    ├── coffee/
    │   ├── colombia-plantation.jpg
    │   ├── colombia-cherries.jpg
    │   ├── costa-rica-plantation.jpg
    │   ├── ethiopia-highlands.jpg
    │   ├── peru-mountains.jpg
    │   └── yemen-terraces.jpg
    ├── hero/
    │   └── coffee-beans-macro.jpg
    └── backgrounds/
        ├── theatrical-lights.jpg
        └── roasting-equipment.jpg
  ```
- [ ] **Update import statements** in components (see Component Updates below)
- [ ] Optimize images for web (compress, resize)

### 2. Database & Backend
- [x] Supabase connected and configured
- [x] Waitlist endpoint tested and working
- [ ] **IMPORTANT:** Note your Supabase credentials for deployment:
  - Project ID: `xgpvjlmmquuwimhscgfm`
  - Project URL: `https://xgpvjlmmquuwimhscgfm.supabase.co`
  - Anon Key: (in `/utils/supabase/info.tsx`)
  - Service Role Key: (stored as environment variable)

### 3. Environment Variables
For production deployment, set these environment variables:
```bash
SUPABASE_URL=https://xgpvjlmmquuwimhscgfm.supabase.co
SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
SUPABASE_DB_URL=[your-database-url]
```

### 4. Component Updates Required

After adding images to `/public/assets/images/`, update these files:

**`/src/app/components/Legacy.tsx`**
```tsx
// OLD:
import vintageDrEvilPhoto from 'figma:asset/a5072b8f4dec9d029a7d0951bb41aad336ecc101.png';
import dressingRoomPhoto from 'figma:asset/5e4a846cfffc004d21d02346ebeb3babcffbf9e5.png';
import morrisCostumesPhoto from 'figma:asset/22c4a8cb31c39e2e298e9c858c24e9f8b7cb27cb.png';
import modernLabPhoto from 'figma:asset/90204a9de87b219693e09b17948c05e1120dc62e.png';

// NEW:
const vintageDrEvilPhoto = '/assets/images/heritage/vintage-dr-evil.png';
const dressingRoomPhoto = '/assets/images/heritage/dressing-room.png';
const morrisCostumesPhoto = '/assets/images/heritage/morris-costumes.png';
const modernLabPhoto = '/assets/images/heritage/modern-lab.png';
```

**`/src/app/components/SpectacleSection.tsx`**
```tsx
// OLD:
import vintageDrEvilPhoto from 'figma:asset/a5072b8f4dec9d029a7d0951bb41aad336ecc101.png';

// NEW:
const vintageDrEvilPhoto = '/assets/images/heritage/vintage-dr-evil.png';
```

**`/src/app/components/TheLab.tsx`**
```tsx
// OLD:
import roestLabPhoto from 'figma:asset/da595d7793ad0acd760b0c20bef48302badb6a0d.png';
import lamarzoccoPhoto from 'figma:asset/963e61723988cd00ad18776e22253c8d4e876c91.png';

// NEW:
const roestLabPhoto = '/assets/images/equipment/roest-lab.png';
const lamarzoccoPhoto = '/assets/images/equipment/lamarzocco.png';
```

**`/src/app/components/ThirdAct.tsx`**
```tsx
// OLD:
import philipMorrisPhoto from 'figma:asset/5afd102afd63c588d2a00815ad165975017777a9.png';

// NEW:
const philipMorrisPhoto = '/assets/images/heritage/philip-morris.png';
```

**`/src/app/pages/About.tsx`**
```tsx
// OLD:
import founderPhoto from 'figma:asset/17ea9e464911f380cf6716cb8f26cca9edfd4d1d.png';

// NEW:
const founderPhoto = '/assets/images/about/founder.png';
```

**`/src/app/components/Hero.tsx`** (optional - currently using Unsplash)
```tsx
// If you want to host locally:
// Change line 13 from Unsplash URL to:
src="/assets/images/hero/coffee-beans-macro.jpg"
```

**`/src/app/components/collection/CollectionGrid.tsx`** (optional - currently using Unsplash)
```tsx
// If you want to host locally, replace the coffeeImages array:
const coffeeImages = [
  '/assets/images/coffee/colombia-plantation.jpg',
  '/assets/images/coffee/colombia-cherries.jpg',
  '/assets/images/coffee/costa-rica-plantation.jpg',
  '/assets/images/coffee/ethiopia-highlands.jpg',
  '/assets/images/coffee/peru-mountains.jpg',
  '/assets/images/coffee/yemen-terraces.jpg',
];
```

### 5. Build & Test
```bash
# Install dependencies
npm install

# Run development server to test
npm run dev

# Build for production
npm run build

# Test production build locally
npm run preview
```

### 6. Domain & Hosting Setup

**Recommended hosting platforms:**
- **Vercel** (recommended - best for React/Next.js)
  - Connect GitHub repo
  - Auto-deploys on push
  - Free SSL certificate
  - Environment variables configured in dashboard

- **Netlify** (alternative)
  - Similar to Vercel
  - Drag-and-drop deployment option

- **Cloudflare Pages** (alternative)
  - Great performance
  - Free tier available

**Domain Setup:**
1. Purchase domain (e.g., `drevilscoffee.com`)
2. Point DNS to hosting provider
3. Configure SSL certificate (usually automatic)
4. Update any hardcoded URLs if needed

### 7. Post-Deployment Testing

- [ ] Test all pages load correctly
- [ ] Verify all images display properly
- [ ] Test waitlist form submission
- [ ] Check Supabase database receives submissions
- [ ] Test navigation between pages
- [ ] Verify mobile responsiveness
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)
- [ ] Check page load speed (use Google PageSpeed Insights)

### 8. Waitlist Data Management

**Accessing your waitlist:**
- **Supabase Dashboard:** https://supabase.com/dashboard/project/xgpvjlmmquuwimhscgfm/database/tables
- **API Endpoint:** https://xgpvjlmmquuwimhscgfm.supabase.co/functions/v1/make-server-d19ebccd/waitlist
- **Export:** Use Supabase dashboard to export to CSV

**Data structure:**
Each waitlist entry contains:
- `email` - Customer email
- `name` - Customer name
- `phone` - Phone number (optional)
- `submittedAt` - ISO timestamp

### 9. Analytics Setup (Optional)

Consider adding:
- **Google Analytics 4** - Track visitors and behavior
- **Meta Pixel** - If you plan to run Facebook/Instagram ads
- **Plausible/Fathom** - Privacy-friendly alternative to Google Analytics

### 10. SEO Optimization

- [ ] Add meta descriptions to all pages
- [ ] Create `robots.txt` file
- [ ] Create `sitemap.xml` file
- [ ] Add Open Graph tags for social sharing
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools

---

## Quick Deployment Steps (TL;DR)

1. **Export images from Figma** → Place in `/public/assets/images/`
2. **Update component imports** (see Component Updates above)
3. **Run `npm install && npm run build`**
4. **Deploy to Vercel/Netlify** (connect GitHub repo)
5. **Add environment variables** in hosting dashboard
6. **Point your domain** to the deployment
7. **Test everything works!**

---

## Support & Resources

- **Supabase Documentation:** https://supabase.com/docs
- **Vite Documentation:** https://vitejs.dev
- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com

---

## Troubleshooting

**Images not loading:**
- Check file paths are correct
- Ensure images are in `/public/` directory
- Clear browser cache
- Check browser console for 404 errors

**Waitlist not submitting:**
- Verify Supabase environment variables are set
- Check browser console for errors
- Test health endpoint: `https://xgpvjlmmquuwimhscgfm.supabase.co/functions/v1/make-server-d19ebccd/health`
- Verify Supabase edge function is deployed

**Build errors:**
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors
- Ensure all import paths are correct

---

**Last Updated:** March 4, 2026
**Project:** Dr. Evil's Coffee - Precision Coffee Laboratory
