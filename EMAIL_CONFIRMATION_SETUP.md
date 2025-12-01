# Email Confirmation Setup Guide

## Issue

After signing up, clicking the confirmation link in the email redirects back to the app but still shows the sign-in page with "Please verify your email" error.

## Solution

### 1. Code Changes (Already Applied)

- ✅ Updated `signUp` to include `emailRedirectTo: ${window.location.origin}/auth/callback`
- ✅ Created `/app/auth/callback/route.ts` to handle email confirmation callback

### 2. Supabase Dashboard Configuration (Required)

You need to configure the redirect URLs in your Supabase project:

#### Steps:

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Authentication** → **URL Configuration**
4. Add the following URLs:

**Site URL:**

```
http://localhost:3000
```

**Redirect URLs (add both):**

```
http://localhost:3000/auth/callback
http://localhost:3000
```

**For Production (when deploying):**

```
https://yourdomain.com/auth/callback
https://yourdomain.com
```

5. Click **Save**

### 3. How It Works Now

**Email Confirmation Flow:**

1. User signs up with email/password
2. Supabase sends confirmation email
3. User clicks "Confirm your mail" link in email
4. Link redirects to: `http://localhost:3000/auth/callback?code=...`
5. The callback route exchanges the code for a session
6. User is redirected to home page `/`
7. Home page detects authenticated session
8. User sees the chat interface (not the sign-in form)

### 4. Additional Configuration (Optional but Recommended)

In Supabase Dashboard → Authentication → Email Templates:

**Confirm signup template:**
You can customize the confirmation email. Make sure it includes:

```html
<a href="{{ .ConfirmationURL }}">Confirm your mail</a>
```

The `{{ .ConfirmationURL }}` will automatically include your configured redirect URL.

### 5. Testing

1. Sign up with a new email
2. Check your email inbox
3. Click "Confirm your mail" link
4. You should be redirected to `http://localhost:3000/auth/callback?code=...`
5. Then automatically redirected to `http://localhost:3000`
6. You should now see the chat interface (authenticated)

### 6. Troubleshooting

**Still seeing sign-in page after confirmation:**

- Clear browser cache and cookies
- Check Supabase Dashboard → Authentication → Users to verify email is confirmed
- Check browser console for errors
- Verify the redirect URLs are correctly set in Supabase

**"Email not confirmed" error:**

- User needs to click the confirmation link in email
- Check spam folder for confirmation email
- In Supabase Dashboard → Authentication → Users, you can manually confirm the user's email for testing

**404 Error on callback:**

- Make sure the file `/app/auth/callback/route.ts` exists
- Restart the dev server: `npm run dev`

### 7. Development vs Production

**Development (localhost):**

- Site URL: `http://localhost:3000`
- Redirect URL: `http://localhost:3000/auth/callback`

**Production:**

- Site URL: `https://yourdomain.com`
- Redirect URL: `https://yourdomain.com/auth/callback`

Update these in Supabase Dashboard before deploying!
