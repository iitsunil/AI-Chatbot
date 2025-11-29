# Deployment Guide

This guide walks you through deploying the AI Chatbot app to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Supabase project set up (see SETUP.md)
- OpenAI API key

## Step 1: Push to GitHub

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub

2. Click **"Add New Project"**

3. Import your GitHub repository

4. Configure the project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key
   - `OPENAI_API_KEY` = your OpenAI API key
   - `NEXT_PUBLIC_APP_URL` = your Vercel deployment URL (will be provided after first deploy)

6. Click **"Deploy"**

7. Wait for deployment to complete (~2-3 minutes)

## Step 3: Update Environment Variables

After the first deployment, Vercel will give you a URL like `https://your-app.vercel.app`

1. Go to your project settings in Vercel
2. Go to **Environment Variables**
3. Update `NEXT_PUBLIC_APP_URL` to your Vercel URL
4. Redeploy (or it will auto-redeploy)

## Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Send a few test messages
3. Try asking "Who am I?" after chatting

## Continuous Deployment

Vercel automatically deploys when you push to your main branch. Each push creates a new deployment.

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click **Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions

## Monitoring

- Check deployment logs in Vercel dashboard
- Monitor Supabase usage in Supabase dashboard
- Check OpenAI usage at platform.openai.com

## Troubleshooting

### Build fails
- Check build logs in Vercel
- Ensure all environment variables are set
- Verify `package.json` has correct scripts

### App doesn't work after deployment
- Verify all environment variables are set correctly
- Check browser console for errors
- Verify Supabase RLS policies allow public access (for demo)

### Database connection errors
- Ensure Supabase project is active
- Verify environment variables match your Supabase project
- Check Supabase logs for connection issues

## Cost Estimates

**Free Tier Limits:**
- Vercel: Unlimited deployments, 100GB bandwidth/month
- Supabase: 500MB database, 2GB bandwidth/month
- OpenAI: Pay-as-you-go (~$0.002 per 1K tokens for GPT-3.5-turbo)

For a demo app with moderate usage, expect:
- Vercel: Free
- Supabase: Free (unless you exceed limits)
- OpenAI: ~$1-5/month depending on usage

## Security Notes

- Never commit `.env.local` to git
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret (it has admin access)
- Consider implementing proper authentication for production
- Review Supabase RLS policies for production use

