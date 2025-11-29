# Quick Start Guide

## ⚠️ Important: Environment Variables Required

The app **requires** environment variables to run. Before starting the dev server, you need to:

### 1. Create `.env.local` file

Create a file named `.env.local` in the root directory with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a project
2. Run the SQL from `supabase/schema.sql` in Supabase SQL Editor
3. Copy your credentials from Settings → API

### 3. Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key

### 4. Then Run

```bash
npm install
npm run dev
```

The app will be available at http://localhost:3000

## Current Status

The dev server is trying to start, but it will fail without environment variables. Check the terminal output for specific error messages.

