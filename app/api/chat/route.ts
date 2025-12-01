import { NextRequest, NextResponse } from "next/server";
import {
  getOrCreateConversation,
  saveMessage,
  getConversationHistory,
} from "@/lib/db";
import { generateChatResponseFallback } from "@/lib/aiFallback";
import { createClient } from "@supabase/supabase-js";

// Helper to get authenticated user from request
async function getAuthenticatedUser(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  // Create a client with anon key for token verification
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Get the authorization header
  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (user && !error) {
      return user;
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const userId = user.id;
    console.log(`[Chat API] Processing message for userId: ${userId}`);

    // Get or create conversation
    const conversationId = await getOrCreateConversation(userId);
    console.log(
      `[Chat API] Using conversationId: ${conversationId} for userId: ${userId}`
    );

    // Get conversation history
    const history = await getConversationHistory(conversationId);

    // Save user message
    const userMessage = await saveMessage(conversationId, "user", message);

    // Generate AI response with fallback (Groq -> Gemini -> OpenAI)
    const response = await generateChatResponseFallback(
      [{ role: "user", content: message }],
      history
    );

    // Save assistant message
    const assistantMessage = await saveMessage(
      conversationId,
      "assistant",
      response
    );

    return NextResponse.json({
      conversationId,
      messageId: assistantMessage.id,
      response,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
