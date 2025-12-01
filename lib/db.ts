import { createServerClient } from "./supabase";

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string; // UUID from auth.users
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  user_id: string; // UUID from auth.users
  profile_text: string;
  created_at: string;
  updated_at: string;
}

const supabase = createServerClient();

// Get or create a conversation for a user
export async function getOrCreateConversation(userId: string): Promise<string> {
  // Try to get the most recent conversation
  const { data: existing, error: fetchError } = await supabase
    .from("conversations")
    .select("id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (existing && !fetchError) {
    return existing.id;
  }

  // Create a new conversation
  const { data: newConv, error: createError } = await supabase
    .from("conversations")
    .insert({ user_id: userId })
    .select("id")
    .single();

  if (createError || !newConv) {
    throw new Error(`Failed to create conversation: ${createError?.message}`);
  }

  return newConv.id;
}

// Save a message
export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string
): Promise<Message> {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      role,
      content,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to save message: ${error?.message}`);
  }

  // Update conversation updated_at
  await supabase
    .from("conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  return data as Message;
}

// Get conversation history
export async function getConversationHistory(
  conversationId: string,
  limit: number = 50
): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch conversation history: ${error.message}`);
  }

  return (data || []) as Message[];
}

// Get all messages for a user (across all conversations)
export async function getAllUserMessages(userId: string): Promise<Message[]> {
  console.log(`[DB] getAllUserMessages called for userId: ${userId}`);

  // First get all conversation IDs for the user
  const { data: conversations, error: convError } = await supabase
    .from("conversations")
    .select("id")
    .eq("user_id", userId);

  if (convError) {
    console.error(
      `[DB] Error fetching conversations for userId ${userId}:`,
      convError
    );
    throw new Error(`Failed to fetch conversations: ${convError.message}`);
  }

  if (!conversations || conversations.length === 0) {
    console.log(`[DB] No conversations found for userId: ${userId}`);
    return [];
  }

  console.log(
    `[DB] Found ${conversations.length} conversations for userId: ${userId}`
  );
  const conversationIds = conversations.map((c) => c.id);

  // Get all messages from those conversations
  const { data: messages, error: msgError } = await supabase
    .from("messages")
    .select("*")
    .in("conversation_id", conversationIds)
    .order("created_at", { ascending: true });

  if (msgError) {
    console.error(
      `[DB] Error fetching messages for userId ${userId}:`,
      msgError
    );
    throw new Error(`Failed to fetch messages: ${msgError.message}`);
  }

  console.log(
    `[DB] Retrieved ${messages?.length || 0} messages for userId: ${userId}`
  );
  return (messages || []) as Message[];
}

// Save or update user profile
export async function saveUserProfile(
  userId: string,
  profileText: string
): Promise<UserProfile> {
  console.log(
    `[DB] saveUserProfile called with userId: ${userId}, profile length: ${profileText.length}`
  );

  // Validate userId before saving
  if (!userId || userId.trim() === "" || userId === "server-user") {
    console.error(`[DB] Invalid userId provided to saveUserProfile: ${userId}`);
    throw new Error(`Invalid userId: ${userId}`);
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .upsert(
      {
        user_id: userId,
        profile_text: profileText,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    )
    .select()
    .single();

  if (error || !data) {
    console.error(`[DB] Error saving profile for userId ${userId}:`, error);
    throw new Error(`Failed to save user profile: ${error?.message}`);
  }

  console.log(`[DB] Successfully saved profile for userId: ${userId}`);
  return data as UserProfile;
}

// Get user profile
export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  console.log(`[DB] getUserProfile called for userId: ${userId}`);

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No profile found
      console.log(`[DB] No profile found for userId: ${userId}`);
      return null;
    }
    console.error(`[DB] Error fetching profile for userId ${userId}:`, error);
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }

  console.log(`[DB] Found profile for userId: ${userId}`);
  return data as UserProfile;
}

// Debug function: Get all user profiles (for debugging purposes)
export async function getAllUserProfiles(): Promise<UserProfile[]> {
  console.log(`[DB] getAllUserProfiles called`);

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`[DB] Error fetching all profiles:`, error);
    throw new Error(`Failed to fetch all user profiles: ${error.message}`);
  }

  console.log(`[DB] Found ${data?.length || 0} total profiles`);
  return (data || []) as UserProfile[];
}
