import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userAuthStore } from "@/store/auth.store";

export function useAuthRedirect({
  requireAuth = false,
  redirectTo = "/signin",
  redirectIfAuth = false,
  redirectAuthenticatedTo = "/",
}: {
  requireAuth?: boolean;
  redirectTo?: string;
  redirectIfAuth?: boolean;
  redirectAuthenticatedTo?: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isCheckingAuth, checkAuth } = userAuthStore();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isCheckingAuth) return;
    if (requireAuth && !isAuthenticated) {
      navigate(redirectTo, { replace: true, state: { from: location } });
    }
    if (redirectIfAuth && isAuthenticated) {
      navigate(redirectAuthenticatedTo, { replace: true });
    }
    // eslint-disable-next-line
  }, [isAuthenticated, isCheckingAuth]);
}
