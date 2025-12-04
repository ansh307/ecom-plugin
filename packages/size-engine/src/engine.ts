import { nikeToUniversal } from "./mappings/nike";
import { adidasToUniversal } from "./mappings/adidas";
import { pumaToUniversal } from "./mappings/puma";
import { universalToBrands } from "./mappings/universal";

const brandMaps: Record<string, any> = {
  nike: nikeToUniversal,
  adidas: adidasToUniversal,
  puma: pumaToUniversal,
};

export function convertSize(brand: string, size: number) {
  brand = brand.toLowerCase();

  if (!brandMaps[brand]) {
    return { error: "Brand not supported" };
  }

  const universal = brandMaps[brand][size];

  if (!universal) {
    return { error: "Size not supported for this brand" };
  }

  const converted = universalToBrands[universal];

  return {
    universal,
    convertedBrands: converted,
  };
}
