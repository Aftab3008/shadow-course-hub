import { api } from "@/lib/api";
import { EnrollmentCheckResponse, UserEnrollment } from "@/types/learning";

/**
 * Verify if the current user is enrolled in a specific course
 * @param courseId - The ID of the course to check enrollment for
 * @returns Object with enrollment status and enrollment data if enrolled
 */
export async function checkUserEnrollment(
  courseId: string
): Promise<EnrollmentCheckResponse> {
  try {
    const response = await api.get(
      `/api/enrollments/verify-access/${courseId}`
    );
    return response.data;
  } catch (error: any) {
    // If 404 or 403, user is not enrolled
    if (error.response?.status === 404 || error.response?.status === 403) {
      return { isEnrolled: false, enrollment: undefined };
    }

    throw error;
  }
}

/**
 * Get all enrollments for the current user
 * @returns Array of user enrollments with course details
 */
export async function getUserEnrollments(): Promise<UserEnrollment[]> {
  const response = await api.get("/api/user/my-learning");
  return response.data;
}

/**
 * Check if user is enrolled in a course (client-side check)
 * @param courseId - The ID of the course to check
 * @param enrollments - Array of user enrollments
 * @returns boolean indicating if user is enrolled
 */
export function isEnrolledInCourse(
  courseId: string,
  enrollments: UserEnrollment[]
): boolean {
  return enrollments.some((enrollment) => enrollment.courseId === courseId);
}
