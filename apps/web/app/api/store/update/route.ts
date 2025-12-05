import { NextResponse } from "next/server";
import { updateStoreSettings } from "@repo/core";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { storeId, ...settings } = body;

  const updated = await updateStoreSettings(storeId, user.id, settings);

  if (!updated) {
    return NextResponse.json(
      { error: "Store not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, store: updated });
}
