import { supabase } from "../../../../lib/supabase";
import { corsResponse, corsPreflight } from "../../../../lib/cors";

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { storeId, sessionId, sender, message } = body;

    if (!storeId || !sessionId || !sender || !message) {
      return corsResponse({ error: "Missing fields" }, 400);
    }

    const { error } = await supabase.from("chats").insert({
      store_id: storeId,
      session_id: sessionId,
      sender,
      message,
    });

    if (error) return corsResponse({ error: error.message }, 500);

    return corsResponse({ ok: true });
  } catch (err: any) {
    return corsResponse({ error: err.message }, 500);
  }
}
