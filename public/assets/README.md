# Dr. Evil's Coffee - Image Assets Guide

## Image Asset Requirements for Export

This document lists all images currently used in your website and where to place them for production deployment.

---

## **LEGACY & HERITAGE SECTION** (`/src/app/components/Legacy.tsx` & related)

### Required Images:
1. **vintageDrEvilPhoto.png** 
   - Current: `figma:asset/a5072b8f4dec9d029a7d0951bb41aad336ecc101.png`
   - Place at: `/public/assets/images/heritage/vintage-dr-evil.png`
   - Description: Vintage photo of Dr. Evil for heritage section

2. **dressingRoomPhoto.png**
   - Current: `figma:asset/5e4a846cfffc004d21d02346ebeb3babcffbf9e5.png`
   - Place at: `/public/assets/images/heritage/dressing-room.png`
   - Description: Morris Costumes dressing room photo

3. **morrisCostumesPhoto.png**
   - Current: `figma:asset/22c4a8cb31c39e2e298e9c858c24e9f8b7cb27cb.png`
   - Place at: `/public/assets/images/heritage/morris-costumes.png`
   - Description: Historic Morris Costumes building/storefront

4. **modernLabPhoto.png**
   - Current: `figma:asset/90204a9de87b219693e09b17948c05e1120dc62e.png`
   - Place at: `/public/assets/images/heritage/modern-lab.png`
   - Description: Modern coffee laboratory setup

5. **philipMorrisPhoto.png**
   - Current: `figma:asset/5afd102afd63c588d2a00815ad165975017777a9.png`
   - Place at: `/public/assets/images/heritage/philip-morris.png`
   - Description: Photo of grandfather Philip Morris (ThirdAct section)

---

## **LAB EQUIPMENT SECTION** (`/src/app/components/TheLab.tsx`)

### Required Images:
6. **roestLabPhoto.png**
   - Current: `figma:asset/da595d7793ad0acd760b0c20bef48302badb6a0d.png`
   - Place at: `/public/assets/images/equipment/roest-lab.png`
   - Description: ROEST Production Roaster in laboratory setting

7. **lamarzoccoPhoto.png**
   - Current: `figma:asset/963e61723988cd00ad18776e22253c8d4e876c91.png`
   - Place at: `/public/assets/images/equipment/lamarzocco.png`
   - Description: La Marzocco espresso machine

---

## **ABOUT PAGE** (`/src/app/pages/About.tsx`)

### Required Images:
8. **founderPhoto.png**
   - Current: `figma:asset/17ea9e464911f380cf6716cb8f26cca9edfd4d1d.png`
   - Place at: `/public/assets/images/about/founder.png`
   - Description: Founder photo for About page

---

## **COFFEE COLLECTION IMAGES** (`/src/app/components/collection/CollectionGrid.tsx`)

These are currently using Unsplash URLs. For production, you should either:
- Download and host locally for better performance and reliability
- Or keep using Unsplash URLs (they'll continue working)

### Current Unsplash Images (5 coffee origin photos):
1. Colombia coffee plantation (Andes)
2. Colombian coffee cherries harvest
3. Costa Rica coffee plantation
4. Ethiopia coffee plantation (highlands)
5. Peru coffee farm (mountains)
6. Yemen coffee terraces (mountain)

**Recommendation:** Download these from Unsplash and place in `/public/assets/images/coffee/` named:
- `colombia-plantation.jpg`
- `colombia-cherries.jpg`
- `costa-rica-plantation.jpg`
- `ethiopia-highlands.jpg`
- `peru-mountains.jpg`
- `yemen-terraces.jpg`

---

## **HERO SECTION** (`/src/app/components/Hero.tsx`)

### Current Image:
- **Coffee beans macro close-up**
  - Current: Unsplash URL
  - Place at: `/public/assets/images/hero/coffee-beans-macro.jpg`
  - Description: High-resolution macro shot of coffee beans for hero background

---

## **BACKGROUND IMAGES** (`/src/app/pages/About.tsx`)

### Current Images (decorative):
- **Theatrical stage lights** (dark) - Unsplash URL
  - Place at: `/public/assets/images/backgrounds/theatrical-lights.jpg`
  
- **Coffee roasting equipment** (industrial) - Unsplash URL
  - Place at: `/public/assets/images/backgrounds/roasting-equipment.jpg`

---

## Export Preparation Checklist

- [ ] Replace all 8 `figma:asset` imports with actual image files
- [ ] (Optional) Download and host Unsplash images locally
- [ ] Optimize all images for web (compress, resize appropriately)
- [ ] Update import paths in component files to reference `/assets/images/...`
- [ ] Test all pages to ensure images load correctly
- [ ] Add appropriate alt text for accessibility

---

## Image Optimization Recommendations

**Recommended formats:**
- **Photos**: JPEG or WebP (compressed to 80-90% quality)
- **Graphics with transparency**: PNG or WebP

**Recommended dimensions:**
- Hero images: 1920x1080 or larger
- Product/coffee images: 800x1200 (portrait) or 1200x800 (landscape)
- Heritage photos: 800x600 or native resolution
- Equipment photos: 1200x800

**Tools for optimization:**
- TinyPNG (https://tinypng.com)
- Squoosh (https://squoosh.app)
- ImageOptim (Mac)
- Or use command line tools like `imagemagick`

---

**Note:** This is a Figma Make project. The `figma:asset` scheme is a virtual import that only works in the Figma Make environment. For production deployment, you MUST replace these with actual image files.
