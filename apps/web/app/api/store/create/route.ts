import { NextResponse } from "next/server";
import { createStore } from "@repo/core";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, domain } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Store name is required" },
        { status: 400 }
      );
    }

    const store = await createStore(user.id, name, domain);

    return NextResponse.json({ ok: true, store });
  } catch (err) {
    console.error("Create store error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
