// apps/web/src/app/dashboard/page.tsx
import Link from "next/link";
import { getStoresForUser } from "@repo/core";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

// TEMP auth stub
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getCurrentUserId() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user?.id || null;
}

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Unauthorized message */}
        <p className="text-blue-500  text-center mb-6">
          You are not authorized to view this page. Please sign in or sign up.
        </p>

        {/* Sign in and Sign up buttons */}
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            <LoginLink>Sign in</LoginLink>
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            <RegisterLink>Sign up</RegisterLink>
          </button>
        </div>
      </main>
    );
  }

  const stores = await getStoresForUser(userId);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Stores</h1>

      {stores.length === 0 && (
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Your Stores</h1>
          <a
            href="/dashboard/new"
            className="px-3 py-2 text-sm rounded bg-black text-white hover:bg-gray-800"
          >
            + New Store
          </a>
        </div>
      )}

      <div className="space-y-4">
        {stores.map((store) => (
          <Link
            key={store.id}
            href={`/dashboard/${store.id}`}
            className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{store.name}</p>
                <p className="text-xs text-gray-500">
                  Store ID: {store.id}
                  {store.domain ? ` • ${store.domain}` : ""}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  store.enabled
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {store.enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
