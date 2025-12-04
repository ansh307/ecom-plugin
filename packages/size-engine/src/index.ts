export function convertUserMessage(message: string) {
  // TEMP LOGIC — you'll replace this later
  return `You said: ${message}. (Size conversion coming soon.)`;
}

export function convertSize(
  brand: string,
  size: string | number,
  targetBrand?: string
) {
  return {
    universal: "M",
    convertedBrands: {
      Puma: 8,
      Adidas: 8.5,
    },
  };
}
