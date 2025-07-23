import { userAuthStore } from "@/store/auth.store";

export default function AdminDashboard() {
  const { isAuthenticated, isCheckingAuth, user } = userAuthStore();

  if (!isCheckingAuth && !isAuthenticated && !user.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Admin Dashboard</h1>
    </div>
  );
}
