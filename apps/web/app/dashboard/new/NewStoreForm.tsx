"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewStoreForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/store/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, domain }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create store.");
        setSaving(false);
        return;
      }

      // Redirect to settings page for the new store
      router.push(`/dashboard/${data.store.id}`);
    } catch (err) {
      console.error(err);
      setError("Unexpected error occured.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border rounded-xl p-5">
      <div>
        <label className="block text-sm mb-1 font-medium">Store Name</label>
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">
          Store Domain (optional)
        </label>
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-black text-white text-sm rounded disabled:opacity-50"
      >
        {saving ? "Creating..." : "Create Store"}
      </button>
    </form>
  );
}
