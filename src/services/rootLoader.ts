import { userAuthStore } from "@/store/auth.store";

export async function rootLoader() {
  userAuthStore.getState().checkAuth();
  return null;
}
