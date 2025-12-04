// POST /api/chat

import { corsResponse, corsPreflight } from "../../../lib/cors";
import { convertUserMessage } from "@repo/size-engine";
import { validateStore } from "@repo/core";

export async function OPTIONS() {
  // Required for browser preflight (CORS)
  return corsPreflight();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { storeId, message } = body;

    if (!storeId || !message) {
      return corsResponse({ error: "Missing storeId or message" }, 400);
    }

    // Validate store
    const store = await validateStore(storeId);
    if (!store) {
      return corsResponse({ error: "Invalid storeId" }, 403);
    }

    // Convert using size engine
    const reply = await convertUserMessage(message);

    return corsResponse({ reply });
  } catch (err) {
    console.error("Chat API Error:", err);
    return corsResponse({ error: "Internal server error" }, 500);
  }
}
