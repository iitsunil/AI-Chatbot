# Authorization Flow Documentation

## Overview

This application uses **Supabase Authentication** with JWT (JSON Web Tokens) for secure user authentication and authorization.

## How Authorization Works

### 1. Frontend Authentication (`lib/auth.tsx`)

The frontend uses a React Context (`AuthProvider`) that manages authentication state:

- **Sign Up**: Creates a new user account in Supabase
  - User receives a confirmation email
  - Account must be verified before signing in
- **Sign In**: Authenticates user and receives a session with access token
  - Returns a JWT access token stored in the session
  - Token is automatically managed by Supabase client
- **Session Management**:
  - Access token is stored in browser (localStorage/cookies)
  - Token is automatically refreshed when needed
  - Session persists across page refreshes

### 2. API Request Authorization (`app/page.tsx`)

When making API requests to `/api/chat` or `/api/profile`:

```typescript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token}`, // JWT token sent here
  },
  body: JSON.stringify({ message: content.trim() }),
});
```

The `session.access_token` is a JWT token that contains:

- User ID
- Email
- Expiration time
- Signature for verification

### 3. Backend Token Verification (`app/api/chat/route.ts`)

The API routes verify the token on each request:

```typescript
async function getAuthenticatedUser(request: NextRequest) {
  // Create Supabase client with anon key
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Extract Bearer token from Authorization header
  const authHeader = request.headers.get("authorization");
  const token = authHeader.substring(7); // Remove "Bearer " prefix

  // Verify token with Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (user && !error) {
    return user; // Token is valid, return authenticated user
  }

  return null; // Token invalid or expired
}
```

### 4. Authorization Check

```typescript
const user = await getAuthenticatedUser(request);

if (!user) {
  return NextResponse.json(
    { error: "Unauthorized. Please sign in." },
    { status: 401 }
  );
}

// User is authenticated - proceed with request
const userId = user.id;
```

## Security Features

1. **JWT Tokens**: Cryptographically signed tokens that cannot be tampered with
2. **Token Expiration**: Tokens expire after a set time and must be refreshed
3. **Server-Side Verification**: Every API request verifies the token server-side
4. **No User ID Manipulation**: User ID comes from the verified token, not request body
5. **Email Verification**: Users must verify their email before accessing the app

## Authentication Flow

### Sign Up Flow:

1. User enters email and password
2. Supabase creates account
3. Confirmation email sent to user
4. User must click link in email to verify
5. After verification, user can sign in

### Sign In Flow:

1. User enters email and password
2. Supabase verifies credentials
3. If email not confirmed → Error message
4. If credentials valid → Session created with JWT token
5. Token stored in browser
6. User redirected to chat interface

### API Request Flow:

1. User sends message
2. Frontend gets `session.access_token` from Supabase
3. Token sent in `Authorization: Bearer <token>` header
4. Backend verifies token with Supabase
5. If valid → Process request with authenticated user ID
6. If invalid → Return 401 Unauthorized

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are used for:

- Frontend: Creating Supabase client for authentication
- Backend: Verifying JWT tokens

## Common Issues

### "Email not confirmed" Error

- **Cause**: User tried to sign in before verifying email
- **Solution**: Check email inbox/spam for confirmation link

### 401 Unauthorized Error

- **Causes**:
  - No token sent in request
  - Token expired
  - Token invalid/tampered
  - User signed out
- **Solution**: Sign in again to get fresh token

### Token Not Being Sent

- **Cause**: Session not available when making request
- **Solution**: Ensure `useAuth()` hook is called and session exists before API calls
