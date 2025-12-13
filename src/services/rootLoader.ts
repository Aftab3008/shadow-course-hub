import { userAuthStore } from "@/store/auth.store";

export async function rootLoader() {
  await userAuthStore.getState().checkAuth();
  return null;
}
