import CourseLearningLayout from "@/components/layout/CourseLearningLayout";
import EnrollmentGuard from "@/components/layout/EnrollmentGuard";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import NotFound from "@/pages/not-found/NotFound";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { LazyRoute } from "./LazyRoute";

const LessonPlayer = lazy(
  () => import("@/pages/root/users/my-learning/courseLearning/LessonPlayer")
);

export const learningRoutes: RouteObject = {
  element: <ProtectedLayout />,
  errorElement: <NotFound />,
  children: [
    {
      element: <EnrollmentGuard />,
      children: [
        {
          path: "/my-learning/:courseName/:courseId/learn",
          element: <CourseLearningLayout />,
          children: [
            {
              path: ":sectionId/:lessonId",
              element: (
                <LazyRoute>
                  <LessonPlayer />
                </LazyRoute>
              ),
            },
          ],
        },
      ],
    },
  ],
};
