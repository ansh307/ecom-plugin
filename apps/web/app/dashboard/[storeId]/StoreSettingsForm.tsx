"use client";

import { useState } from "react";

export default function StoreSettingsForm({ store }: { store: any }) {
  const [title, setTitle] = useState(store.title ?? "Size Assistant");
  const [subtitle, setSubtitle] = useState(
    store.subtitle ?? "Tell me what fits you well."
  );
  const [themeColor, setThemeColor] = useState(store.themeColor ?? "#111827");
  const [defaultBrand, setDefaultBrand] = useState(
    store.defaultBrand ?? "Nike"
  );
  const [enabled, setEnabled] = useState<boolean>(store.enabled);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/store/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeId: store.id,
          title,
          subtitle,
          themeColor,
          defaultBrand,
          enabled,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to save settings.");
      } else {
        setMessage("Settings saved!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Unexpected error while saving.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border rounded-xl p-5">
      <div>
        <label className="block text-sm font-medium mb-1">Widget Title</label>
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Widget Subtitle
        </label>
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Theme Color</label>
        <input
          type="color"
          className="h-8 w-16 p-0 border rounded"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Default Brand</label>
        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={defaultBrand}
          onChange={(e) => setDefaultBrand(e.target.value)}
        >
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          {/* add more later */}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="enabled"
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <label htmlFor="enabled" className="text-sm">
          Enable widget for this store
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 text-sm rounded bg-black text-white disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save settings"}
      </button>

      {message && <p className="text-xs text-gray-600 mt-2">{message}</p>}
    </form>
  );
}
