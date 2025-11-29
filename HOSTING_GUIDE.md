# Complete Hosting Guide - Step by Step

This guide will help you get your chatbot hosted and ready for submission.

## 📋 What You Need to Provide

- ✅ Repo link (GitHub)
- ✅ Hosted link (Vercel)
- ✅ Video demo (30-60 seconds)
- ✅ Instructions to run locally (in README)

---

## Step 1: Create GitHub Repository

### 1.1 Initialize Git (if not already done)

```bash
# In your project directory
git init
git add .
git commit -m "Initial commit: AI Chatbot with personality profiling"
```

### 1.2 Create Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Fill in:
   - **Repository name**: `ai-chatbot` (or your preferred name)
   - **Description**: "AI chatbot that learns from conversations and generates personality profiles"
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** initialize with README (you already have one)
4. Click **"Create repository"**

### 1.3 Push Your Code

```bash
# Add your GitHub repo as remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**✅ Your Repo Link**: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

---

## Step 2: Deploy to Vercel (Hosted Link)

### 2.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (easiest option)
4. Authorize Vercel to access your GitHub

### 2.2 Deploy Your Project

1. In Vercel dashboard, click **"Add New Project"**
2. Find and select your repository (`ai-chatbot` or whatever you named it)
3. Click **"Import"**

### 2.3 Configure Project Settings

Vercel should auto-detect Next.js. Verify:
- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅

### 2.4 Add Environment Variables

**IMPORTANT**: Before deploying, add these environment variables:

Click **"Environment Variables"** and add each one:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: Your Supabase project URL (from Supabase dashboard → Settings → API)
   - Example: `https://xxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: Your Supabase anon/public key
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: Your Supabase service_role key (keep this secret!)
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

4. **GOOGLE_API_KEY**
   - Value: Your Google Gemini API key
   - Get it from: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - Example: `AIzaSy...`

5. **NEXT_PUBLIC_APP_URL**
   - Value: Leave empty for now, we'll update after first deploy
   - Or use: `https://your-app-name.vercel.app` (you'll get this after deploy)

### 2.5 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Once done, you'll see: **"Congratulations! Your project has been deployed"**

### 2.6 Update App URL

1. Copy your deployment URL (e.g., `https://ai-chatbot-xyz.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_APP_URL` with your Vercel URL
4. Redeploy (or it will auto-redeploy)

**✅ Your Hosted Link**: `https://your-app-name.vercel.app`

---

## Step 3: Create Video Demo (30-60 seconds)

### What to Show:

1. **Opening (5 seconds)**
   - Show the chatbot interface
   - "This is my AI chatbot app"

2. **Chatting (20-30 seconds)**
   - Send a few messages
   - Show the conversation flow
   - "The chatbot learns from our conversations"

3. **Personality Profile (15-20 seconds)**
   - Ask "Who am I?" or "Tell me about myself"
   - Show the generated personality profile
   - "After chatting, it can generate a personality profile"

4. **Closing (5 seconds)**
   - Show the clean UI
   - "Built with Next.js, Supabase, and Google Gemini"

### Tools for Recording:

- **Windows**: Built-in Xbox Game Bar (Win + G) or OBS Studio
- **Mac**: QuickTime Player or ScreenFlow
- **Online**: Loom, Screencastify
- **Free**: OBS Studio (cross-platform)

### Tips:

- Record in 1080p or higher
- Show clear, readable text
- Keep it under 60 seconds
- Upload to YouTube (unlisted) or Vimeo for easy sharing

**✅ Your Video Demo Link**: Upload and share the link

---

## Step 4: Update README with Your Links

Update the README.md file with your actual links:

```markdown
## Demo

- **Live Demo**: [Your Vercel URL]
- **Video Demo**: [Your video link]
- **Repository**: [Your GitHub URL]
```

---

## Step 5: Test Everything

Before submitting, verify:

- [ ] GitHub repo is accessible
- [ ] Vercel deployment works
- [ ] Chat functionality works on hosted version
- [ ] "Who am I?" feature works
- [ ] README has clear local setup instructions
- [ ] Video demo shows key features

---

## Quick Checklist for Submission

```
✅ Repo link: https://github.com/YOUR_USERNAME/YOUR_REPO
✅ Hosted link: https://YOUR_APP.vercel.app
✅ Video demo: [Link to your video]
✅ Local instructions: [In README.md]
```

---

## Troubleshooting

### Vercel Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `package.json` has correct scripts

### App Doesn't Work After Deployment
- Check environment variables are set correctly
- Verify Supabase project is active
- Check browser console for errors
- Ensure `NEXT_PUBLIC_APP_URL` matches your Vercel URL

### Database Connection Issues
- Verify Supabase project is not paused
- Check RLS policies allow public access (for demo)
- Verify environment variables match Supabase dashboard

---

## Cost Estimate

**Free Tier Limits:**
- ✅ Vercel: Unlimited deployments, 100GB bandwidth/month
- ✅ Supabase: 500MB database, 2GB bandwidth/month
- ⚠️ Google Gemini: Free tier available, pay-as-you-go after limits

**Expected Monthly Cost**: $0-5 (mostly free, Gemini usage dependent)

---

## Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure Supabase database schema is set up correctly

