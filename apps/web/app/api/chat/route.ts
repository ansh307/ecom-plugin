// POST /api/chat

import { corsResponse, corsPreflight } from "lib/cors";
import { convertUserMessage, parseMessage } from "@repo/size-engine";
import { validateStore } from "@repo/core";
import { supabase } from "lib/supabase";

export async function OPTIONS() {
  // Required for browser preflight (CORS)
  return corsPreflight();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { storeId, message, sessionId } = body;

    if (!storeId || !message || !sessionId) {
      return corsResponse(
        { error: "Missing storeId, message, or sessionId" },
        400
      );
    }

    // Validate store
    const store = await validateStore(storeId);
    if (!store) {
      return corsResponse({ error: "Invalid storeId" }, 403);
    }

    // Convert using size engine
    const reply = await convertUserMessage(message);
    const { brand, size } = parseMessage(message);
    if (brand) {
      await supabase.from("brand_mentions").insert({
        store_id: storeId,
        session_id: sessionId,
        brand,
      });
    }

    return corsResponse({ reply });
  } catch (err) {
    console.error("Chat API Error:", err);
    return corsResponse({ error: "Internal server error" }, 500);
  }
}
