# Migration Guide: Email-Based Authentication

This guide will help you migrate from the anonymous userId system to email-based authentication.

## Step 1: Update Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the following migration script:

```sql
-- Drop old policies
DROP POLICY IF EXISTS "Allow public read access" ON conversations;
DROP POLICY IF EXISTS "Allow public insert access" ON conversations;
DROP POLICY IF EXISTS "Allow public update access" ON conversations;
DROP POLICY IF EXISTS "Allow public read access" ON messages;
DROP POLICY IF EXISTS "Allow public insert access" ON messages;
DROP POLICY IF EXISTS "Allow public read access" ON user_profiles;
DROP POLICY IF EXISTS "Allow public insert access" ON user_profiles;
DROP POLICY IF EXISTS "Allow public update access" ON user_profiles;

-- Alter tables to use UUID instead of TEXT for user_id
-- Note: This will require migrating existing data if you have any

-- First, backup your data if needed
-- Then alter the columns:

ALTER TABLE conversations 
  ALTER COLUMN user_id TYPE UUID USING user_id::uuid;

ALTER TABLE user_profiles 
  ALTER COLUMN user_id TYPE UUID USING user_id::uuid;

-- Add foreign key constraints
ALTER TABLE conversations 
  ADD CONSTRAINT conversations_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE user_profiles 
  ADD CONSTRAINT user_profiles_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create new RLS policies (from schema.sql)
CREATE POLICY "Users can view their own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
  ON conversations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages from their conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);
```

**Important:** If you have existing data with TEXT user_ids, you'll need to either:
- Clear the old data (recommended for fresh start)
- Or create a migration script to map old user_ids to new auth.users

## Step 2: Enable Email Authentication in Supabase

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Ensure **Email** provider is enabled
3. Configure email settings:
   - Enable "Confirm email" if you want email verification (optional)
   - Set up email templates if needed

## Step 3: Update Environment Variables

No new environment variables needed - the existing ones are sufficient:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Step 4: Test the Authentication

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. You should see a login/signup form
4. Create a new account with your email
5. Sign in and test the chat functionality
6. Sign out and sign in again - your chat history should persist

## Step 5: Verify Multi-Device Access

1. Sign in on Device A and send some messages
2. Sign out
3. Sign in on Device B with the same email
4. Your chat history should be available on Device B

## Troubleshooting

### "Unauthorized" errors
- Check that your Supabase RLS policies are correctly set up
- Verify that the auth token is being sent with API requests
- Check browser console and server logs for detailed error messages

### Email not sending
- Check Supabase email settings
- Verify SMTP configuration if using custom email provider
- Check spam folder

### Old data not accessible
- Old anonymous user data won't be accessible after migration
- Consider exporting/backing up important data before migration
- Users will start fresh with authenticated accounts

## Benefits of This Migration

✅ **Multi-device access**: Users can access their chat history from any device  
✅ **Secure**: Proper authentication and authorization  
✅ **User-specific**: Each user only sees their own data  
✅ **Scalable**: Ready for production use  
✅ **Persistent**: Chat history persists across sessions and devices

