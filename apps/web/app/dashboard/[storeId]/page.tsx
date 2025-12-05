// apps/web/src/app/dashboard/[storeId]/page.tsx
import { notFound } from "next/navigation";
import { getStoreById } from "@repo/core";
import StoreSettingsForm from "./StoreSettingsForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getCurrentUserId() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user?.id || null;
}

type Props = {
  params: { storeId: string };
};

export default async function StoreDashboardPage({ params }: Props) {
  const resolvedParams = await params;
  const userId = await getCurrentUserId();
  const store = await getStoreById(resolvedParams.storeId);

  if (!store || store.owner_id !== userId) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{store.name}</h1>
        <p className="text-xs text-gray-500">
          Store ID: {store.id}
          {store.domain ? ` • ${store.domain}` : ""}
        </p>
      </div>

      <StoreSettingsForm store={store} />
    </main>
  );
}
