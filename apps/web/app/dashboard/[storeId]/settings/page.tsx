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

export default async function StoreSettingsPage({ params }: Props) {
  const resolvedParams = await params;
  const userId = await getCurrentUserId();
  const store = await getStoreById(resolvedParams.storeId);

  if (!store || store.owner_id !== userId) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-6">
      <h1 className="text-2xl font-semibold mb-6">Store Settings</h1>

      <StoreSettingsForm store={store} />
    </main>
  );
}
