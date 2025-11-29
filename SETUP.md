# Quick Setup Guide

Follow these steps to get the chatbot running locally:

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. **Create a Supabase account** at [supabase.com](https://supabase.com) (free tier works)

2. **Create a new project**:
   - Click "New Project"
   - Choose a name and database password
   - Wait for the project to be created (takes ~2 minutes)

3. **Set up the database**:
   - Go to **SQL Editor** in the left sidebar
   - Click "New Query"
   - Copy and paste the entire contents of `supabase/schema.sql`
   - Click "Run" (or press Ctrl+Enter)
   - You should see "Success. No rows returned"

4. **Get your API keys**:
   - Go to **Settings** → **API**
   - Copy the following:
     - **Project URL** (looks like `https://xxxxx.supabase.co`)
     - **anon public** key (long string starting with `eyJ...`)
     - **service_role** key (long string starting with `eyJ...`) - **Keep this secret!**

## Step 3: Get Google Gemini API Key

1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the API key (starts with `AIza...`)

## Step 4: Configure Environment Variables

1. Create a file named `.env.local` in the root directory
2. Copy the template from `.env.example` or use this:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
GOOGLE_API_KEY=your-google-gemini-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Replace all the placeholder values with your actual keys

## Step 5: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Test It Out

1. Send a few messages to build conversation history
2. Try asking:
   - "Who am I?"
   - "Tell me about myself"
   - "What do you know about me?"

The chatbot should generate a personality profile based on your conversations!

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists and has all required variables
- Restart the dev server after creating/updating `.env.local`

### "Failed to create conversation"
- Check that you ran the SQL schema in Supabase
- Verify your Supabase URL and keys are correct

### "Failed to generate chat response"
- Check your Google Gemini API key is correct
- Make sure your API key is active
- Check the browser console for detailed error messages

### Database connection issues
- Verify your Supabase project is active (not paused)
- Check that Row Level Security policies were created (they're in the schema.sql)

## Next Steps

- Read the full [README.md](./README.md) for more details
- Check out the test suite: `npm test`
- Deploy to Vercel for a hosted version

