-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table for storing personality profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id TEXT PRIMARY KEY,
  profile_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
-- In production, you'd want more restrictive policies
CREATE POLICY "Allow public read access" ON conversations FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON conversations FOR UPDATE USING (true);

CREATE POLICY "Allow public read access" ON messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON user_profiles FOR UPDATE USING (true);

