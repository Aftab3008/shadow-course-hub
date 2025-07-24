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
