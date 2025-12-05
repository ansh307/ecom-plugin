export * from "./stores";

export async function validateStore(storeId: string) {
  // Replace with Supabase lookup later
  return { storeId };
}

export async function getStoreSettings(storeId: string) {
  // MOCK FOR NOW — later replace with DB call (Supabase/Postgres)
  return {
    storeId,
    enabled: true,
    themeColor: "#111827",
    title: "Size Assistant",
    subtitle: "Tell me what fits you well.",
    defaultBrand: "Nike",
  };
}
