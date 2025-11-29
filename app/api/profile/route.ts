import { NextRequest, NextResponse } from "next/server";
import { getAllUserMessages, getUserProfile, saveUserProfile } from "@/lib/db";
import { generatePersonalityProfile } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Get all user messages
    const messages = await getAllUserMessages(userId);

    if (messages.length < 3) {
      return NextResponse.json({
        profile:
          "I don't have enough information about you yet. Please chat with me more so I can learn about you!",
      });
    }

    // Check if we have a cached profile
    const existingProfile = await getUserProfile(userId);

    // Generate new profile from chat history
    const profileText = await generatePersonalityProfile(messages);

    // Save the profile
    await saveUserProfile(userId, profileText);

    return NextResponse.json({
      profile: profileText,
    });
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
