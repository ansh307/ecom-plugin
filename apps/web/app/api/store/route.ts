// get store config, token validation

import { NextResponse } from "next/server";
import { getStoreSettings } from "@repo/core";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get("storeId");

    if (!storeId) {
      return NextResponse.json({ error: "Missing storeId" }, { status: 400 });
    }

    const settings = await getStoreSettings(storeId);

    if (!settings) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    return NextResponse.json(settings);
  } catch (err) {
    console.error("Store API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
