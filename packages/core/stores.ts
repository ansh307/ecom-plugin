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

export async function getStoreAnalytics(storeId: string) {
  // ----------------------------------
  // 1️⃣ Total Chats
  // ----------------------------------
  const totalChatsRes = await supabase
    .from("chats")
    .select("*", { count: "exact", head: true })
    .eq("store_id", storeId);

  const totalChats = totalChatsRes.count ?? 0;

  // ----------------------------------
  // 2️⃣ Unique Users (distinct session_id)
  // ----------------------------------
  const uniqueUsersRes = await supabase
    .from("chats")
    .select("session_id", { count: "exact", head: false })
    .eq("store_id", storeId);

  const uniqueUsers = new Set(
    uniqueUsersRes.data?.map((r) => r.session_id) ?? []
  ).size;

  // ----------------------------------
  // 3️⃣ Chats in Last 30 Days
  // ----------------------------------
  const monthChatsRes = await supabase
    .from("chats")
    .select("*", { count: "exact", head: true })
    .eq("store_id", storeId)
    .gte("created_at", getDaysAgo(30));

  const monthChats = monthChatsRes.count ?? 0;

  // ----------------------------------
  // 4️⃣ Chats last 7 days
  // ----------------------------------
  const last7Res = await supabase
    .from("chats")
    .select("*", { count: "exact", head: true })
    .eq("store_id", storeId)
    .gte("created_at", getDaysAgo(7));

  const last7 = last7Res.count ?? 0;

  // Previous 7 days
  const prev7Res = await supabase
    .from("chats")
    .select("*", { count: "exact", head: true })
    .eq("store_id", storeId)
    .gte("created_at", getDaysAgo(14))
    .lt("created_at", getDaysAgo(7));

  const prev7 = prev7Res.count ?? 0;

  const change7Days =
    prev7 === 0 ? 100 : Math.round(((last7 - prev7) / prev7) * 100);

  // ----------------------------------
  // 5️⃣ Daily Chat Counts (Last 14 Days)
  // ----------------------------------
  const dailyRowsRes = await supabase
    .from("chats")
    .select("created_at")
    .eq("store_id", storeId)
    .gte("created_at", getDaysAgo(14))
    .order("created_at", { ascending: true });

  const daily = aggregateDaily(dailyRowsRes.data ?? []);

  // ----------------------------------
  // 6️⃣ Top Brands
  // ----------------------------------
  // ----------------------------------
  // 6️⃣ Top Brands (Manually grouped)
  // ----------------------------------
  const brandRowsRes = await supabase
    .from("brand_mentions")
    .select("brand")
    .eq("store_id", storeId);

  const brandMap: Record<string, number> = {};

  brandRowsRes.data?.forEach((row) => {
    if (!row.brand) return;

    // normalize brands to consistent casing
    const key = row.brand.trim().toLowerCase();

    brandMap[key] = (brandMap[key] ?? 0) + 1;
  });

  const topBrands = Object.entries(brandMap)
    .map(([brand, count]) => ({
      brand,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // ----------------------------------
  // 7️⃣ Top Queries (Group by message)
  // Supabase doesn't support GROUP BY natively → use RPC or manual count
  // Here is the *safe manual approach*
  // ----------------------------------

  const queriesRes = await supabase
    .from("chats")
    .select("message")
    .eq("store_id", storeId)
    .eq("sender", "user");

  const messageMap: Record<string, number> = {};

  queriesRes.data?.forEach((row) => {
    if (!row.message) return;
    messageMap[row.message] = (messageMap[row.message] || 0) + 1;
  });

  const topQueries = Object.entries(messageMap)
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // ----------------------------------
  return {
    totalChats,
    monthChats,
    uniqueUsers,
    change7Days,

    daily,
    topBrands,
    topQueries,
  };
}

// Helpers ----------------------------------

function getDaysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function aggregateDaily(rows: { created_at: string }[]) {
  const counts: Record<string, number> = {};

  rows.forEach((row) => {
    const day = row.created_at.split("T")[0];
    if (!day) return;
    counts[day] = (counts[day] ?? 0) + 1;
  });

  const sortedDays = Object.keys(counts).sort();

  return {
    labels: sortedDays,
    values: sortedDays.map((d) => counts[d]),
  };
}
