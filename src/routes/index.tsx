import RootLayout from "@/components/layout/RootLayout";
import { rootLoader } from "@/services/rootLoader";
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { instructorRoutes } from "./instructorRoutes";
import { learningRoutes } from "./learningRoutes";
import { publicRoutes } from "./publicRoutes";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: rootLoader,
    shouldRevalidate: () => {
      return false;
    },
    children: [
      authRoutes,
      publicRoutes,
      adminRoutes,
      instructorRoutes,
      learningRoutes,
    ],
  },
]);
