import { supabase } from "./supabase";

export async function getStoresForUser(userId: string) {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("owner_id", userId);

  if (error) throw error;
  return data;
}

export async function getStoreById(storeId: string) {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("id", storeId)
    .single();

  if (error) return null;
  return data;
}

export async function getStoreSettings(storeId: string) {
  const { data, error } = await supabase
    .from("stores")
    .select("id, enabled, theme_color, title, subtitle, default_brand")
    .eq("id", storeId)
    .single();

  if (error) return null;

  return {
    storeId: data.id,
    enabled: data.enabled,
    themeColor: data.theme_color,
    title: data.title,
    subtitle: data.subtitle,
    defaultBrand: data.default_brand,
  };
}

export async function updateStoreSettings(
  storeId: string,
  ownerId: string,
  patch: Partial<{
    themeColor: string;
    title: string;
    subtitle: string;
    defaultBrand: string;
    enabled: boolean;
  }>
) {
  const { data, error } = await supabase
    .from("stores")
    .update({
      theme_color: patch.themeColor,
      title: patch.title,
      subtitle: patch.subtitle,
      default_brand: patch.defaultBrand,
      enabled: patch.enabled,
    })
    .eq("id", storeId)
    .eq("owner_id", ownerId)
    .select()
    .single();

  if (error) return null;
  return data;
}

export async function createStore(
  ownerId: string,
  name: string,
  domain?: string
) {
  const { data, error } = await supabase
    .from("stores")
    .insert({
      owner_id: ownerId,
      name,
      domain,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
