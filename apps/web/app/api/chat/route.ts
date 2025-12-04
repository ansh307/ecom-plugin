// POST /api/chat

import { NextResponse } from "next/server";
import { convertUserMessage } from "@repo/size-engine";
import { validateStore } from "@repo/core";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { storeId, message } = body;

    if (!storeId || !message) {
      return NextResponse.json(
        { error: "Missing storeId or message" },
        { status: 400 }
      );
    }

    // Validate store
    const store = await validateStore(storeId);
    if (!store) {
      return NextResponse.json({ error: "Invalid storeId" }, { status: 403 });
    }

    // Convert using size engine
    const reply = await convertUserMessage(message);

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
