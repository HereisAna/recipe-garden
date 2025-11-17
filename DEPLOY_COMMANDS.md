# Deployment Commands

## Push to GitHub
Replace `YOUR-USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/recipe-garden.git
git branch -M main
git push -u origin main
```

## Or if you prefer SSH:

```bash
git remote add origin git@github.com:YOUR-USERNAME/recipe-garden.git
git branch -M main
git push -u origin main
```

---

After pushing to GitHub, continue with the Vercel deployment steps.
