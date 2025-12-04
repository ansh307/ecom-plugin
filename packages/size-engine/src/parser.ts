export function parseMessage(message: string) {
  const lower = message.toLowerCase();

  const brands = ["nike", "adidas", "puma"];
  let brand = brands.find((b) => lower.includes(b)) || null;

  const sizeMatch = lower.match(/(\d{1,2})/);
  const size = sizeMatch ? Number(sizeMatch[1]) : null;

  return { brand, size };
}
