// Chat Message Handler

import { parseMessage } from "./parser";
import { convertSize } from "./engine";

export function convertUserMessage(message: string) {
  const { brand, size } = parseMessage(message);

  if (!brand || !size) {
    return "Please tell me your brand and size (e.g., Nike size 9).";
  }

  const result = convertSize(brand, size);

  if ((result as any).error) {
    return (result as any).error;
  }

  return `
Based on your ${brand} size ${size}:
Your universal size is **${result.universal}**.

Equivalent sizes:
${Object.entries(result.convertedBrands)
  .map(([b, s]) => `- **${b}**: ${s}`)
  .join("\n")}
  `;
}
