# Submission Checklist

Use this checklist to ensure you have everything ready for submission.

## ✅ Required Items

### 1. Repo Link
- [ ] Code pushed to GitHub
- [ ] Repository is public (or accessible to reviewers)
- [ ] README.md is complete and clear
- [ ] All code is committed and pushed

**Your Repo Link**: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

---

### 2. Hosted Link
- [ ] App deployed to Vercel
- [ ] All environment variables configured
- [ ] App is accessible and working
- [ ] Chat functionality works
- [ ] "Who am I?" feature works
- [ ] Database is connected

**Your Hosted Link**: `https://YOUR_APP_NAME.vercel.app`

**To Deploy:**
1. Push code to GitHub
2. Import repo in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GOOGLE_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
4. Deploy!

See [HOSTING_GUIDE.md](./HOSTING_GUIDE.md) for detailed steps.

---

### 3. Video Demo (30-60 seconds)
- [ ] Video recorded showing:
   - Chat interface
   - Sending messages
   - "Who am I?" feature
   - Personality profile generation
- [ ] Video is 30-60 seconds long
- [ ] Video is uploaded (YouTube unlisted, Vimeo, or similar)
- [ ] Video link is accessible

**Your Video Link**: `[Your video URL]`

**What to Show:**
- Opening: Show the chatbot UI (5 sec)
- Chatting: Send a few messages (20-30 sec)
- Profile: Ask "Who am I?" and show result (15-20 sec)
- Closing: Quick summary (5 sec)

---

### 4. Instructions to Run Locally
- [ ] README.md includes clear setup instructions
- [ ] All prerequisites listed
- [ ] Step-by-step setup guide
- [ ] Environment variables documented
- [ ] Troubleshooting section included

**Current Instructions**: See "Local Setup" section in README.md

---

## 📝 Submission Template

Copy this template and fill it out:

```
Repo Link:
https://github.com/YOUR_USERNAME/YOUR_REPO

Hosted Link:
https://YOUR_APP.vercel.app

Video Demo:
https://youtube.com/watch?v=... (or your video platform)

Instructions to Run Locally:
See README.md - "Local Setup" section
```

---

## 🧪 Pre-Submission Testing

Before submitting, test:

- [ ] **Local Development**
  - [ ] `npm install` works
  - [ ] `npm run dev` starts successfully
  - [ ] App loads at localhost:3000
  - [ ] Can send messages
  - [ ] Can ask "Who am I?"

- [ ] **Hosted Version**
  - [ ] App loads on Vercel
  - [ ] Chat works
  - [ ] Messages are saved
  - [ ] Profile generation works
  - [ ] No console errors

- [ ] **Code Quality**
  - [ ] No linting errors
  - [ ] Tests pass (`npm test`)
  - [ ] README is complete
  - [ ] Code is clean and commented

---

## 🚀 Quick Deployment Steps

1. **GitHub** (5 minutes)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create repo on GitHub
   git remote add origin https://github.com/USER/REPO.git
   git push -u origin main
   ```

2. **Vercel** (10 minutes)
   - Go to vercel.com
   - Import GitHub repo
   - Add environment variables
   - Deploy

3. **Video** (15 minutes)
   - Record screen showing app
   - Edit to 30-60 seconds
   - Upload to YouTube/Vimeo

**Total Time**: ~30 minutes

---

## 💡 Tips

- **Video**: Keep it simple, show the key features
- **README**: Make it easy for reviewers to run locally
- **Hosted Link**: Test it works before submitting
- **Code**: Make sure it's pushed to GitHub

---

## Need Help?

See [HOSTING_GUIDE.md](./HOSTING_GUIDE.md) for detailed instructions on each step.

