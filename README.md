# 🌿 Recipe Garden

A beautiful, nature-inspired recipe-sharing website built for three roommates to share and manage their favorite dishes. Features a modern, smooth UI with plant-themed aesthetics and comprehensive recipe management.

## ✨ Features

### User Features
- 📜 Beautiful landing page with smooth scroll transitions
- 🔍 Search recipes by name
- 🏷️ Filter by categories (Breakfast, Lunch, Dinner, Drinks, Snacks)
- 📄 Pagination for easy browsing
- 📖 Detailed recipe pages with step-by-step instructions
- 🎨 Modern, nature-inspired design with greenery theme
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations using Framer Motion

### Admin Features
- 🔐 Password-only authentication
- ➕ Add new recipes
- ✏️ Edit existing recipes
- 🗑️ Delete recipes
- 📸 Upload images directly from phone or computer
- 🖼️ Automatic image compression and optimization

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 14+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: JWT with jose
- **Image Compression**: browser-image-compression
- **Hosting**: Vercel
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier is fine)
- Vercel account (for deployment)

## 🚀 Setup Instructions

### 1. Clone or Download the Project

```bash
cd recipe-garden
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. **Create a new Supabase project**:
   - Go to [https://supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details and wait for setup to complete

2. **Run the database schema**:
   - In your Supabase project, go to the SQL Editor
   - Copy the contents of `supabase-schema.sql`
   - Paste and run the SQL script
   - This creates the `recipes` table and `recipe-images` storage bucket

3. **Get your Supabase credentials**:
   - Go to Project Settings > API
   - Copy:
     - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
     - `anon` `public` key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
     - `service_role` `secret` key (`SUPABASE_SERVICE_ROLE_KEY`)

4. **Configure Storage Bucket**:
   - Go to Storage in Supabase dashboard
   - Find the `recipe-images` bucket (created by the SQL script)
   - Make sure it's set to Public
   - If not created, create it manually and make it public

### 4. Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. Fill in the values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin Password
ADMIN_PASSWORD=admin123

# JWT Secret (generate a random string)
JWT_SECRET=your-secret-key-here-change-in-production
```

**Important**:
- Replace all placeholder values with your actual Supabase credentials
- Change `ADMIN_PASSWORD` to something secure
- Generate a strong random string for `JWT_SECRET` (you can use: `openssl rand -base64 32`)

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ADMIN_PASSWORD
vercel env add JWT_SECRET
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)

3. Click "New Project"

4. Import your GitHub repository

5. Configure environment variables in Vercel dashboard:
   - Go to Settings > Environment Variables
   - Add all variables from `.env.local`
   - Make sure to add them for all environments (Production, Preview, Development)

6. Deploy!

### Post-Deployment

After deployment:
1. Visit your deployed URL
2. Test the admin login at `/admin` (default password: `admin123`)
3. Add some test recipes
4. Verify image uploads work correctly

## 📁 Project Structure

```
recipe-garden/
├── app/
│   ├── admin/              # Admin pages
│   │   ├── add/           # Add recipe page
│   │   ├── edit/[id]/     # Edit recipe page
│   │   ├── dashboard/     # Admin dashboard
│   │   └── page.tsx       # Admin login
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── recipes/       # Recipe CRUD endpoints
│   │   └── upload/        # Image upload endpoint
│   ├── recipe/[id]/       # Recipe detail page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── LandingSection.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeFilters.tsx
│   └── Pagination.tsx
├── lib/                   # Utilities
│   ├── supabase.ts        # Supabase client
│   ├── types.ts           # TypeScript types
│   ├── auth.ts            # Authentication utilities
│   └── image-utils.ts     # Image compression
├── public/                # Static assets
├── supabase-schema.sql    # Database schema
├── .env.example           # Environment variables template
└── package.json
```

## 🎨 Design Colors

- **Cream Background**: `#FAF8F5`, `#F5F1EB`
- **Sage Green**: `#CFE3D7`, `#A8CCBA`
- **Olive Green**: `#5C7A4D`, `#4A6238`
- **Forest Green**: `#2F4532`, `#243C2B`

## 🔐 Security Notes

1. **Change Default Password**: Make sure to change `ADMIN_PASSWORD` in production
2. **JWT Secret**: Use a strong, random string for `JWT_SECRET`
3. **Environment Variables**: Never commit `.env.local` to version control
4. **Supabase RLS**: Row Level Security policies are included in the schema
5. **Service Role Key**: Keep `SUPABASE_SERVICE_ROLE_KEY` secret - it bypasses RLS

## 📱 Usage

### For Users
1. Visit the homepage
2. Scroll down from the landing section
3. Use filters to find recipes by category
4. Search for recipes by name
5. Click on a recipe card to view details
6. Navigate between pages using pagination

### For Admins
1. Click "Admin" link in the top right
2. Enter admin password (default: `admin123`)
3. View all recipes in the dashboard
4. Add new recipes with the "+ Add New Recipe" button
5. Edit recipes using the edit icon
6. Delete recipes using the delete icon
7. Upload images directly from your device

## 🐛 Troubleshooting

### Images not loading
- Check that the `recipe-images` bucket is public in Supabase
- Verify the storage URL pattern in `next.config.ts`
- Check browser console for CORS errors

### Authentication issues
- Verify `JWT_SECRET` is set correctly
- Check that cookies are enabled in browser
- Clear cookies and try logging in again

### Database errors
- Ensure the SQL schema was run successfully
- Check Supabase logs for detailed error messages
- Verify environment variables are correct

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check for TypeScript errors: `npm run lint`

## 🤝 Contributing

This is a personal project for three roommates, but feel free to fork and customize for your own use!

## 📄 License

This project is open source and available for personal use.

## 👥 Made with ❤️ by

Lynda, Ayano, and Anastasiia

---

Enjoy cooking and sharing your favorite recipes! 🌿👨‍🍳
