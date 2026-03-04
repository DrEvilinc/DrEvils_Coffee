# Dr. Evil's Coffee - Export Checklist

## ✅ READY FOR EXPORT!

Your project structure is now prepared. Follow these steps:

---

## 🎯 CRITICAL: Export 8 Images from Figma

You MUST export these 8 images from Figma before deployment:

### 1. Heritage Photos (5 images)
Export to: `/public/assets/images/heritage/`

- [ ] **vintage-dr-evil.png** - Vintage photo of Dr. Evil
- [ ] **dressing-room.png** - Morris Costumes dressing room
- [ ] **morris-costumes.png** - Historic Morris Costumes building
- [ ] **modern-lab.png** - Modern coffee laboratory
- [ ] **philip-morris.png** - Grandfather Philip Morris photo

### 2. Equipment Photos (2 images)
Export to: `/public/assets/images/equipment/`

- [ ] **roest-lab.png** - ROEST Production Roaster
- [ ] **lamarzocco.png** - La Marzocco espresso machine

### 3. About Page (1 image)
Export to: `/public/assets/images/about/`

- [ ] **founder.png** - Founder photo

---

## 📝 Update Component Imports

After placing images, update these 5 files:

### File 1: `/src/app/components/Legacy.tsx`
Replace lines 3-6 with:
```tsx
const vintageDrEvilPhoto = '/assets/images/heritage/vintage-dr-evil.png';
const dressingRoomPhoto = '/assets/images/heritage/dressing-room.png';
const morrisCostumesPhoto = '/assets/images/heritage/morris-costumes.png';
const modernLabPhoto = '/assets/images/heritage/modern-lab.png';
```

### File 2: `/src/app/components/SpectacleSection.tsx`
Replace line 3 with:
```tsx
const vintageDrEvilPhoto = '/assets/images/heritage/vintage-dr-evil.png';
```

### File 3: `/src/app/components/TheLab.tsx`
Replace lines 5-6 with:
```tsx
const roestLabPhoto = '/assets/images/equipment/roest-lab.png';
const lamarzoccoPhoto = '/assets/images/equipment/lamarzocco.png';
```

### File 4: `/src/app/components/ThirdAct.tsx`
Replace line 3 with:
```tsx
const philipMorrisPhoto = '/assets/images/heritage/philip-morris.png';
```

### File 5: `/src/app/pages/About.tsx`
Replace line 3 with:
```tsx
const founderPhoto = '/assets/images/about/founder.png';
```

---

## 🚀 Build & Deploy

```bash
# 1. Install dependencies
npm install

# 2. Test locally
npm run dev

# 3. Build for production
npm run build

# 4. Deploy to hosting (Vercel/Netlify recommended)
```

---

## 📊 Database Configuration

Your Supabase backend is ready! Don't forget to set environment variables:

**Project Details:**
- URL: `https://xgpvjlmmquuwimhscgfm.supabase.co`
- Project ID: `xgpvjlmmquuwimhscgfm`

**View waitlist data:**
- Dashboard: https://supabase.com/dashboard/project/xgpvjlmmquuwimhscgfm/database/tables
- API: https://xgpvjlmmquuwimhscgfm.supabase.co/functions/v1/make-server-d19ebccd/waitlist

---

## 📁 Files Created for Export

✅ `/public/assets/` - Asset folder structure  
✅ `/public/assets/README.md` - Complete image documentation  
✅ `/DEPLOYMENT.md` - Full deployment guide  
✅ `/image-manifest.json` - Detailed image inventory  
✅ `/EXPORT-CHECKLIST.md` - This quick reference (you are here)  

---

## 🔍 Quick Verification

Before deploying:
- [ ] All 8 critical images exported and placed in `/public/assets/images/`
- [ ] All 5 component files updated with new import paths
- [ ] Run `npm run build` successfully
- [ ] No console errors when testing locally
- [ ] Waitlist form works and saves to Supabase

---

## 💡 Optional Enhancements

- [ ] Download Unsplash images for local hosting (better performance)
- [ ] Optimize images with TinyPNG or Squoosh
- [ ] Add Google Analytics
- [ ] Create custom 404 page
- [ ] Add meta tags for SEO

---

## 📚 Reference Documents

- **Quick Start:** This file (EXPORT-CHECKLIST.md)
- **Detailed Guide:** /DEPLOYMENT.md
- **Image Details:** /public/assets/README.md
- **Image Manifest:** /image-manifest.json

---

**Next Step:** Export your 8 Figma images and place them in the folders!

Good luck with your launch! 🎉
