import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getCurrentUserId() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user?.id || null;
}
