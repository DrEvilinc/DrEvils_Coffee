# Dr. Evil's Coffee

**A precision coffee laboratory honoring Philip Morris, founder of Morris Costumes (1962)**

---

## 🎯 Project Overview

Dr. Evil's Coffee is a modern coffee roasting operation combining theatrical heritage with pharmaceutical-style precision. The website features:

- **Dark Laboratory Aesthetic** - Clinical, precision manufacturing documentation style
- **Lab Report Cards** - Thermal performance data for each coffee bag
- **Roast On Demand Service** - Using ROEST Production Roaster
- **Wholesale Credibility** - Fortune 500 technical manufacturing language
- **Waitlist System** - Supabase-powered data collection

---

## 🚀 Quick Start

### For Development:
```bash
npm install
npm run dev
```

### For Production Build:
```bash
npm run build
```

---

## 📦 Export Status

✅ **Backend:** Supabase connected and tested  
✅ **Waitlist:** Fully functional and collecting data  
✅ **Asset Structure:** Folders created and documented  
⚠️ **Images:** Need to export 8 critical images from Figma  

---

## 📋 Pre-Deployment Steps

### 1. Export Images (REQUIRED)
Export 8 images from Figma to `/public/assets/images/`:

**Heritage folder (5 images):**
- vintage-dr-evil.png
- dressing-room.png
- morris-costumes.png
- modern-lab.png
- philip-morris.png

**Equipment folder (2 images):**
- roest-lab.png
- lamarzocco.png

**About folder (1 image):**
- founder.png

### 2. Update Component Imports
Update 5 component files to use local image paths instead of `figma:asset` imports.

**See: `/EXPORT-CHECKLIST.md` for detailed instructions**

### 3. Build & Deploy
```bash
npm install
npm run build
# Deploy to Vercel, Netlify, or Cloudflare Pages
```

---

## 📚 Documentation Files

- **`/EXPORT-CHECKLIST.md`** ⭐ START HERE - Quick export guide
- **`/DEPLOYMENT.md`** - Complete deployment documentation
- **`/public/assets/README.md`** - Image asset details
- **`/image-manifest.json`** - JSON inventory of all images

---

## 🗂️ Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── components/         # React components
│   │   │   ├── collection/     # Coffee collection grid
│   │   │   ├── ui/             # UI components (buttons, inputs)
│   │   │   ├── Hero.tsx        # Landing hero section
│   │   │   ├── Legacy.tsx      # Heritage section
│   │   │   ├── TheLab.tsx      # Laboratory/equipment section
│   │   │   ├── SpectacleSection.tsx
│   │   │   ├── ThirdAct.tsx
│   │   │   └── WaitlistSection.tsx  # Waitlist form
│   │   ├── pages/              # Page components
│   │   ├── data/               # Coffee data
│   │   ├── routes.tsx          # React Router config
│   │   └── App.tsx             # Main app component
│   └── styles/                 # CSS and theme files
├── supabase/
│   └── functions/
│       └── server/             # Backend API endpoints
│           ├── index.tsx       # Hono web server
│           └── kv_store.tsx    # Database utilities
├── public/
│   └── assets/
│       └── images/             # Image asset folders
│           ├── heritage/       # 5 heritage photos
│           ├── equipment/      # 2 equipment photos
│           ├── about/          # 1 about photo
│           ├── coffee/         # Optional: coffee origin photos
│           ├── hero/           # Optional: hero background
│           └── backgrounds/    # Optional: decorative backgrounds
└── utils/
    └── supabase/
        └── info.tsx            # Supabase connection details
```

---

## 🔧 Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router (Data Mode)
- **Animation:** Motion (Framer Motion fork)
- **UI Components:** Radix UI primitives
- **Backend:** Supabase (Database + Edge Functions)
- **Server:** Hono web framework (Deno runtime)
- **Form:** React Hook Form + Phone Input

---

## 🗄️ Database & Backend

**Supabase Project:**
- URL: `https://xgpvjlmmquuwimhscgfm.supabase.co`
- Dashboard: https://supabase.com/dashboard/project/xgpvjlmmquuwimhscgfm

**Waitlist Endpoint:**
- POST: `/functions/v1/make-server-d19ebccd/waitlist` - Submit signup
- GET: `/functions/v1/make-server-d19ebccd/waitlist` - View all signups

**Data Storage:**
- Table: `kv_store_d19ebccd`
- Prefix: `waitlist:`
- Fields: email, name, phone, submittedAt

---

## 🎨 Design System

**Color Palette:**
- Background: `#09090b` (zinc-950)
- Primary Text: `#ffffff` (white)
- Secondary Text: `#a1a1aa` (zinc-400)
- Borders: `#3f3f46` (zinc-700)
- Accents: Clinical white on black

**Typography:**
- Headers: Light weight, tight tracking
- Body: System mono fonts for technical feel
- Labels: Uppercase, extra wide tracking

**Philosophy:**
- Precision manufacturing documentation
- Zero theatrical distractions
- Clinical operational authority
- Fortune 500 technical aesthetic

---

## 🔐 Environment Variables

For production deployment, configure:

```env
SUPABASE_URL=https://xgpvjlmmquuwimhscgfm.supabase.co
SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
SUPABASE_DB_URL=[your-database-url]
```

---

## 📊 Features

✅ Hero section with theatrical coffee aesthetic  
✅ Heritage timeline (Morris Costumes → Dr. Evil's Coffee)  
✅ Laboratory equipment showcase (ROEST, La Marzocco)  
✅ Coffee collection grid with origin data  
✅ Roast On Demand service details  
✅ Waitlist form with database integration  
✅ Multi-page routing (Home, About)  
✅ Responsive design  
✅ Dark laboratory theme  

---

## 🚢 Deployment Recommendations

**Hosting Platforms:**
1. **Vercel** (Recommended) - Best for React/Vite
2. **Netlify** - Simple drag-and-drop deployment
3. **Cloudflare Pages** - Great performance, free tier

**Domain Setup:**
- Register: `drevilscoffee.com` or similar
- Point DNS to hosting provider
- SSL automatically configured

---

## 📈 Post-Launch

- [ ] Monitor waitlist signups in Supabase dashboard
- [ ] Export waitlist data to CSV for email campaigns
- [ ] Add Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up social media accounts
- [ ] Prepare for Batch 001 production run

---

## 🆘 Support

**Documentation:**
- Vite: https://vitejs.dev
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Supabase: https://supabase.com/docs

**Troubleshooting:**
See `/DEPLOYMENT.md` for common issues and solutions.

---

## 📝 License

Private - Dr. Evil's Coffee © 2026

---

## 🎬 Legacy

*Honoring Philip Morris (1962-present)*  
*From theatrical costumes to precision coffee roasting*  
*Transforming craft into science, spectacle into substance*

---

**Last Updated:** March 4, 2026  
**Version:** 1.0.0  
**Status:** Ready for image export and deployment
