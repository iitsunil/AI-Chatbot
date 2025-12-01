import { NextRequest, NextResponse } from "next/server";
import { getAllUserMessages, getUserProfile, saveUserProfile } from "@/lib/db";
import { generatePersonalityProfileFallback } from "@/lib/aiFallback";
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

    const userId = user.id;
    console.log(
      `[Profile API] Processing profile request for userId: ${userId} (email: ${user.email})`
    );

    // Get all user messages
    const messages = await getAllUserMessages(userId);

    console.log(
      `[Profile API] Found ${messages.length} messages for userId: ${userId}`
    );

    if (messages.length < 3) {
      return NextResponse.json({
        profile:
          "I don't have enough information about you yet. Please chat with me more so I can learn about you!",
      });
    }

    // Check if we have a cached profile (use it if recent enough)
    const existingProfile = await getUserProfile(userId);
    if (existingProfile) {
      console.log(`[Profile API] Found existing profile for userId: ${userId}`);
      // Optionally, you could check if the profile is recent enough to reuse
      // For now, we'll always regenerate to ensure it's based on latest messages
    }

    // Generate new profile from chat history with fallback (Groq -> Gemini -> OpenAI)
    const profileText = await generatePersonalityProfileFallback(messages);

    // Save the profile
    await saveUserProfile(userId, profileText);

    console.log(
      `[Profile API] Successfully generated and saved profile for userId: ${userId}`
    );

    return NextResponse.json({
      profile: profileText,
    });
  } catch (error) {
    console.error("Profile API error:", error);
    const raw = error instanceof Error ? error.message : String(error);

    let publicMessage = "Unable to generate profile right now.";
    if (/rate|quota|limit/i.test(raw))
      publicMessage = "Profile generation rate limit reached. Retry later.";
    if (/timeout|network/i.test(raw))
      publicMessage = "Network issue. Please retry.";
    if (/invalid api key|auth|unauthorized/i.test(raw))
      publicMessage = "Authentication error. Check configuration.";

    const debug = process.env.NODE_ENV === "development" ? { debug: raw } : {};

    return NextResponse.json(
      { error: publicMessage, ...debug },
      { status: 500 }
    );
  }
}
