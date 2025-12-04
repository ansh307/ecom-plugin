// size conversion engine

import { NextResponse } from "next/server";
import { convertSize } from "@repo/size-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brand, size, targetBrand } = body;

    if (!brand || !size) {
      return NextResponse.json(
        { error: "Brand and size are required" },
        { status: 400 }
      );
    }

    const result = convertSize(brand, size, targetBrand);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Size API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
