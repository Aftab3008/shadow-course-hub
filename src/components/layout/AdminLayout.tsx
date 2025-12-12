import NotFound from "@/pages/not-found/NotFound";
import { userAuthStore } from "@/store/auth.store";
import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout() {
  const { isAuthenticated, isCheckingAuth, user } = userAuthStore();

  if (!isCheckingAuth && !isAuthenticated && !user?.isAdmin) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
