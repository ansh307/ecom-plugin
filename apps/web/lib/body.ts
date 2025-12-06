export async function parseJsonSafe(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await req.json();
    }

    // If no content-type or different, still try to parse as JSON
    const text = await req.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (err) {
      return null;
    }
  } catch (err) {
    return null;
  }
}
