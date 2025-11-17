# 🚀 Deployment Guide - Recipe Garden

## Prerequisites Checklist

Before deploying, ensure you've completed these steps:

- [ ] **Supabase Database Setup**
  - Ran `supabase-schema-complete.sql` in Supabase SQL Editor
  - Verified `recipes` table exists
  - Verified `recipe-images` storage bucket exists and is PUBLIC

- [ ] **Environment Variables Ready**
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - ADMIN_PASSWORD
  - JWT_SECRET

## Quick Deploy (Recommended)

### Option A: Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   # Replace YOUR-USERNAME with your GitHub username
   git remote add origin https://github.com/YOUR-USERNAME/recipe-garden.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Import your `recipe-garden` repository
   - Add the 5 environment variables
   - Click Deploy

### Option B: Vercel CLI (Faster)

1. **Install & Deploy**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add ADMIN_PASSWORD
   vercel env add JWT_SECRET
   ```

3. **Redeploy**
   ```bash
   vercel --prod
   ```

## Environment Variables

Copy these exactly into Vercel:

**Name:** `NEXT_PUBLIC_SUPABASE_URL`
**Value:** `https://uulgveruhfmdpcuoonyz.supabase.co`

**Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
**Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1bGd2ZXJ1aGZtZHBjdW9vbnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyNDAwNDEsImV4cCI6MjA3ODgxNjA0MX0.DYoHw8rM__9X4GMtTnSVagjoN3qsmlgOVT59GGsKuu8`

**Name:** `SUPABASE_SERVICE_ROLE_KEY`
**Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1bGd2ZXJ1aGZtZHBjdW9vbnl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI0MDA0MSwiZXhwIjoyMDc4ODE2MDQxfQ.kFvOulH2pr950htkn6H5DgOot4QddROu3ADTmEHfLPQ`

**Name:** `ADMIN_PASSWORD`
**Value:** `admin123` (change this to something secure!)

**Name:** `JWT_SECRET`
**Value:** `lQKgASPPSFver/UIlKiY9aNyc/Wfh/XM2v1VUbbakm0=`

## After Deployment

1. Visit your deployed URL: `https://recipe-garden-xxxxx.vercel.app`
2. Test the landing page
3. Go to `/admin` and login with `admin123`
4. Add a test recipe with ingredients
5. Verify recipe appears on homepage
6. Click recipe to view full details

## Troubleshooting

### "supabaseUrl is required" error
- Check that environment variables are set in Vercel
- Make sure variable names are EXACT (case-sensitive)
- Redeploy after adding variables

### Images not uploading
- Verify `recipe-images` bucket is PUBLIC in Supabase
- Check Storage policies were created by the SQL schema

### Can't login to admin
- Verify `ADMIN_PASSWORD` and `JWT_SECRET` are set in Vercel
- Check browser console for errors

### Database errors
- Ensure you ran the complete SQL schema in Supabase
- Verify the `recipes` table exists with `ingredients` column

## Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Domains**
3. Add your domain
4. Update DNS records as instructed

## Automatic Deployments

Once connected to GitHub, every push to `main` will automatically deploy:

```bash
# Make changes
git add .
git commit -m "Update recipe feature"
git push

# Vercel automatically deploys! 🎉
```

---

Your Recipe Garden is now live! 🌿

Share the URL with Lynda, Ayano, and Anastasiia!
