import { supabase } from "../../../lib/supabase";
import { corsResponse, corsPreflight } from "../../../lib/cors";

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { storeId, sessionId, eventType } = body;

    if (!storeId || !sessionId || !eventType) {
      return corsResponse({ error: "Missing fields" }, 400);
    }

    const { error } = await supabase.from("widget_events").insert({
      store_id: storeId,
      session_id: sessionId,
      event_type: eventType,
    });

    if (error) return corsResponse({ error: error.message }, 500);

    return corsResponse({ ok: true });
  } catch (err: any) {
    return corsResponse({ error: err.message }, 500);
  }
}
