import { api } from "@/lib/api";
import { Course, InstructorCourse, InstructorCourses } from "@/types/course";
import { AxiosProgressEvent } from "axios";

export async function createCourse({
  title,
  description,
  category,
  level,
  price,
}: {
  title: string;
  description: string;
  category: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  price: number;
}): Promise<{
  message: string;
  success: boolean;
  data?: {
    id: string;
  };
}> {
  try {
    const response = await api.post("/api/instructor/courses/create", {
      title,
      description,
      category,
      level: level.toUpperCase(),
      price,
    });
    return response.data;
  } catch (error) {
    return Promise.resolve({
      message: error.response?.data?.message || "Failed to create course",
      success: false,
    });
  }
}

export async function fetchCourseByIdInstructor({
  courseId,
}: {
  courseId: string;
}): Promise<InstructorCourse> {
  try {
    const response = await api.get(
      `/api/instructor/course-instructor/${courseId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to fetch course",
      success: false,
      status: error.response?.status,
    });
  }
}

export async function createSection({
  courseId,
  title,
  description,
  order,
}: {
  courseId: string;
  title: string;
  description: string;
  order?: number;
}): Promise<{
  message: string;
  success: boolean;
  data?: {
    title: string;
    description?: string;
    order?: number;
  };
}> {
  try {
    const response = await api.post(
      `/api/instructor/courses/${courseId}/sections/create`,
      {
        title,
        description,
        order,
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to create section",
      success: false,
    });
  }
}

export async function getImageKitAuth(): Promise<{
  message: string;
  success: boolean;
  data?: {
    token: string;
    expire: number;
    signature: string;
    publicKey: string;
  };
}> {
  try {
    const response = await api.get("/api/imagekit/imagekit-auth");
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to fetch ImageKit auth",
      success: false,
    });
  }
}

export async function addLessonToSection({
  courseId,
  sectionId,
  title,
  description,
  videoUrl,
  videoId,
  duration,
  order,
  fileName,
  onUploadProgress,
}: {
  courseId: string;
  sectionId: string;
  title: string;
  description?: string;
  videoUrl: string;
  videoId: string;
  fileName: string;
  duration?: number;
  order?: number;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}): Promise<{
  message: string;
  success: boolean;
  data?: {
    title: string;
    description?: string;
    videoUrl: string;
    duration?: number;
    order?: number;
  };
}> {
  try {
    const response = await api.post(
      `/api/instructor/courses/${courseId}/sections/${sectionId}/lessons/create`,
      {
        title,
        description,
        videoUrl,
        duration,
        order,
        videoId,
        fileName,
      },
      {
        onUploadProgress,
      }
    );

    return response.data;
  } catch (error: any) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to add lesson",
      success: false,
    });
  }
}

export async function deleteLesson({
  courseId,
  sectionId,
  lessonId,
}: {
  courseId: string;
  sectionId: string;
  lessonId: string;
}): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    const response = await api.delete(
      `/api/instructor/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/delete`
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to delete lesson",
      success: false,
    });
  }
}

export async function updateSectionOrder({
  courseId,
  section1,
  section2,
}: {
  courseId: string;
  section1: { id: string; order: number };
  section2: { id: string; order: number };
}): Promise<{
  message: string;
  success: boolean;
  data?: Course;
}> {
  try {
    const response = await api.patch(
      `/api/instructor/courses/${courseId}/sections/order/update`,
      {
        section1,
        section2,
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message:
        error.response?.data?.message || "Failed to update section order",
      success: false,
    });
  }
}

export async function updateLessonOrder({
  courseId,
  sectionId,
  lesson1,
  lesson2,
}: {
  courseId: string;
  sectionId: string;
  lesson1: { id: string; order: number };
  lesson2: { id: string; order: number };
}): Promise<{
  message: string;
  success: boolean;
  data?: InstructorCourse;
}> {
  try {
    const response = await api.patch(
      `/api/instructor/courses/${courseId}/sections/${sectionId}/lessons/order/update`,
      {
        lesson1,
        lesson2,
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to update lesson order",
      success: false,
    });
  }
}

export async function updateSettings({
  courseId,
  thumbnailId,
  thumbnailUrl,
  fileName,
}: {
  courseId: string;
  thumbnailId: string;
  thumbnailUrl: string;
  fileName: string;
}): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    const response = await api.patch(
      `/api/instructor/courses/${courseId}/settings/update`,
      {
        thumbnailId,
        thumbnailUrl,
        fileName,
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to update settings",
      success: false,
    });
  }
}

export async function deleteSection({
  courseId,
  sectionId,
}: {
  courseId: string;
  sectionId: string;
}): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    const response = await api.delete(
      `/api/instructor/courses/${courseId}/sections/${sectionId}/delete`
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to delete section",
      success: false,
    });
  }
}

export async function updateSection({
  courseId,
  sectionId,
  title,
  description,
}: {
  courseId: string;
  sectionId: string;
  title: string;
  description?: string;
}): Promise<{
  message: string;
  success: boolean;
  data?: {
    title: string;
    description?: string;
  };
}> {
  try {
    const response = await api.patch(
      `/api/instructor/courses/${courseId}/sections/${sectionId}/update`,
      {
        title,
        description,
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to update section",
      success: false,
    });
  }
}

export async function updateCourseDetails({
  courseId,
  title,
  price,
  description,
  category,
  level,
}: {
  courseId: string;
  title: string;
  price: number;
  description: string;
  category: { name: string };
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.patch(
      `/api/instructor/courses/${courseId}/details/update`,
      {
        title,
        price,
        description,
        category: { name: category.name.toLowerCase() },
        level: level,
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to update details",
      success: false,
    });
  }
}

export async function getInstructorCourses(): Promise<InstructorCourses> {
  try {
    const response = await api.get("/api/instructor/courses");
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to fetch courses",
      success: false,
    });
  }
}

export async function publishCourse({
  courseId,
}: {
  courseId: string;
}): Promise<{
  message: string;
  success: boolean;
  data?: {
    title: string;
    description: string;
    publish: boolean;
  };
}> {
  try {
    const response = await api.patch(
      `/api/instructor/courses/${courseId}/publish`
    );
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to publish course",
      success: false,
    });
  }
}
