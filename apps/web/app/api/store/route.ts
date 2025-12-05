// apps/web/src/app/api/store/route.ts

import { corsResponse, corsPreflight } from "../../../lib/cors";
import { getStoreSettings } from "@repo/core";

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get("storeId");

    if (!storeId) {
      return corsResponse({ error: "Missing storeId" }, 400);
    }

    const settings = await getStoreSettings(storeId);
    if (!settings) {
      return corsResponse({ error: "Store not found" }, 404);
    }

    return corsResponse(settings);
  } catch (error) {
    console.error("Store API Error:", error);
    return corsResponse({ error: "Internal server error" }, 500);
  }
}
