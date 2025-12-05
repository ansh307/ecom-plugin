// apps/web/app/dashboard/[storeId]/page.tsx

import { getCurrentUserId, getStoreAnalytics, getStoreById } from "@repo/core";
import { notFound } from "next/navigation";
import DashboardClient from "./DashboardClient";

interface Props {
  params: { storeId: string };
}

export default async function StoreDashboardPage({ params }: Props) {
  const userId = await getCurrentUserId();
  const resolvedParams = await params;
  const store = await getStoreById(resolvedParams.storeId);

  if (!store || store.owner_id !== userId) return notFound();

  // Fetch analytics (you will implement next)
  const analytics = await getStoreAnalytics(resolvedParams.storeId);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-6">
          {store.name} — Overview
        </h1>
        <button className="mb-6 px-4 py-2 shadow-sm text-black rounded">
          Settings
        </button>
      </div>

      <DashboardClient store={store} analytics={analytics} />
    </div>
  );
}
