import { NextResponse } from "next/server";
import { supabase } from "lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const { storeId, sessionId, sender, message } = body;

  await supabase.from("chats").insert({
    store_id: storeId,
    session_id: sessionId,
    sender,
    message,
  });

  return NextResponse.json({ ok: true });
}
