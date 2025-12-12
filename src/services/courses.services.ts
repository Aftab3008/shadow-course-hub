import { api } from "@/lib/api";
import { CourseIdResponse, CoursesResponse } from "@/types/course";

export async function fetchCourses(): Promise<CoursesResponse> {
  try {
    const response = await api.get(`/api/courses/all-courses`);
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to fetch courses",
      success: false,
    });
  }
}

export async function fetchFeaturedCourses(
  count: number
): Promise<CoursesResponse> {
  try {
    const response = await api.get(
      `/api/courses/featured-courses?count=${count}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message:
        error.response?.data?.message || "Failed to fetch featured courses",
      success: false,
    });
  }
}

export async function fetchCourseById(
  courseId: string
): Promise<CourseIdResponse> {
  try {
    const response = await api.get(`/api/courses/course/${courseId}`);
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to fetch course",
      success: false,
    });
  }
}

/**
 * Get secure streaming URL for a specific lesson
 * Returns a time-limited signed URL that expires after a set duration
 * @param courseId - The ID of the course
 * @param lessonId - The ID of the lesson to stream
 * @returns Object with videoUrl and expiration time
 */
export async function getVideoStreamUrl(
  courseId: string,
  lessonId: string
): Promise<{ videoUrl: string; expiresAt: number; expiresIn: number }> {
  try {
    const response = await api.get(
      `/api/courses/${courseId}/lessons/${lessonId}/stream`
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject({
      message:
        error.response?.data?.message || "Failed to get video streaming URL",
      success: false,
      status: error.response?.status,
    });
  }
}

/**
 * Get course content with lessons for enrolled users
 * This should include full lesson data with video URLs
 * @param courseId - The ID of the course
 * @returns Course data with sections and lessons
 */
export async function fetchEnrolledCourseContent(
  courseId: string
): Promise<CourseIdResponse> {
  try {
    const response = await api.get(`/api/courses/${courseId}/content`);
    return response.data;
  } catch (error: any) {
    return Promise.reject({
      message:
        error.response?.data?.message || "Failed to fetch course content",
      success: false,
      status: error.response?.status,
    });
  }
}
