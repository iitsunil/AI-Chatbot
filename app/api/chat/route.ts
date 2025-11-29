import { NextRequest, NextResponse } from "next/server";
import {
  getOrCreateConversation,
  saveMessage,
  getConversationHistory,
} from "@/lib/db";
import { generateChatResponse } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { userId, message } = await request.json();

    if (!userId || !message) {
      return NextResponse.json(
        { error: "Missing userId or message" },
        { status: 400 }
      );
    }

    // Get or create conversation
    const conversationId = await getOrCreateConversation(userId);

    // Get conversation history
    const history = await getConversationHistory(conversationId);

    // Save user message
    const userMessage = await saveMessage(conversationId, "user", message);

    // Generate AI response
    const response = await generateChatResponse(
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
