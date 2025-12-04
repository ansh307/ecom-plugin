export async function validateStore(storeId: string) {
  // Replace with Supabase lookup later
  return { storeId };
}

export async function getStoreSettings(storeId: string) {
  return {
    storeId,
    widgetColor: "#000",
    brandPreference: "Nike",
    enableChat: true,
  };
}
