import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const { storeId, sessionId, eventType } = body;

  await supabase.from("widget_events").insert({
    store_id: storeId,
    session_id: sessionId,
    event_type: eventType,
  });

  return NextResponse.json({ ok: true });
}
