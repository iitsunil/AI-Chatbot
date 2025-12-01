import { createServerClient } from "./supabase";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Get authenticated user from server-side request
export async function getServerUser(request?: NextRequest) {
  const supabase = createServerClient();
  
  // Try to get session from cookies
  const cookieStore = cookies();
  const accessToken = cookieStore.get("sb-access-token")?.value;
  const refreshToken = cookieStore.get("sb-refresh-token")?.value;
  
  if (accessToken) {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (user && !error) {
      return user;
    }
  }
  
  // Try from Authorization header if request is provided
  if (request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (user && !error) {
        return user;
      }
    }
  }
  
  return null;
}

