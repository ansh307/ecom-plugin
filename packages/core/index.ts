export * from "./stores";

import { supabase } from "./supabase";

export async function validateStore(storeId: string) {
  const { data, error } = await supabase
    .from("stores")
    .select("id, enabled")
    .eq("id", storeId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    enabled: data.enabled,
  };
}

export async function getStoreSettings(storeId: string) {
  const { data, error } = await supabase
    .from("stores")
    .select("id, enabled, theme_color, title, subtitle, default_brand")
    .eq("id", storeId)
    .single();

  if (error || !data) return null;

  return {
    storeId: data.id,
    enabled: data.enabled,
    themeColor: data.theme_color,
    title: data.title,
    subtitle: data.subtitle,
    defaultBrand: data.default_brand,
  };
}
