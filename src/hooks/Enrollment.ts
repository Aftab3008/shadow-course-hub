import { useQuery } from "@tanstack/react-query";
import {
  checkUserEnrollment,
  getUserEnrollments,
} from "@/services/enrollment.services";

/**
 * Hook to check if user is enrolled in a specific course
 * @param courseId - The ID of the course to check enrollment for
 * @param enabled - Whether to enable the query (default: true)
 */
export const useEnrollmentCheck = (courseId: string, enabled = true) => {
  return useQuery({
    queryKey: ["enrollment", courseId],
    queryFn: () => checkUserEnrollment(courseId),
    enabled: enabled && !!courseId,
    retry: false, // Don't retry on 404/403 errors
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
  });
};

/**
 * Hook to fetch all user enrollments (for My Learning page)
 */
export const useUserEnrollments = () => {
  return useQuery({
    queryKey: ["userEnrollments"],
    queryFn: getUserEnrollments,
    staleTime: 2 * 60 * 1000, // Consider fresh for 2 minutes
  });
};
