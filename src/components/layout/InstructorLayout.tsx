import { Outlet } from "react-router-dom";

export default function InstructorLayout() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Outlet />
    </main>
  );
}
