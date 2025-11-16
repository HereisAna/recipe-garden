# 🚀 Quick Setup Guide

## Step-by-Step Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor
4. Copy and paste the entire contents of `supabase-schema.sql`
5. Click "Run"

### 3. Get Supabase Credentials

1. In Supabase, go to **Project Settings** → **API**
2. Copy these three values:
   - **Project URL**
   - **anon public key**
   - **service_role secret key**

### 4. Set Environment Variables

1. Create `.env.local` file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and fill in your values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
ADMIN_PASSWORD=admin123
JWT_SECRET=any-random-string-here
```

### 5. Run the App

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### 6. Test Admin Access

1. Click "Admin" in top right
2. Login with password: `admin123`
3. Add your first recipe!

## 📦 Deploy to Vercel

### Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Then add environment variables in Vercel dashboard:
- Settings → Environment Variables
- Add all 5 variables from `.env.local`

## ✅ Verification Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Supabase project created
- [ ] SQL schema executed
- [ ] `.env.local` file created with all 5 variables
- [ ] App runs locally (`npm run dev`)
- [ ] Can view home page at localhost:3000
- [ ] Can login to admin at localhost:3000/admin
- [ ] Can add a test recipe with image
- [ ] Recipe appears on home page
- [ ] Can view recipe detail page
- [ ] Can edit and delete recipes

## 🆘 Common Issues

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Images not uploading
- Check Supabase Storage → `recipe-images` bucket exists
- Make sure bucket is set to "Public"
- Verify CORS settings in Supabase

### Can't login to admin
- Check `ADMIN_PASSWORD` in `.env.local`
- Make sure `JWT_SECRET` is set
- Clear browser cookies

### Build errors
```bash
npm run build
```
Fix any TypeScript errors that appear.

## 🎉 You're Done!

Your recipe garden is ready to grow! 🌿

Start adding recipes and share them with your roommates!
