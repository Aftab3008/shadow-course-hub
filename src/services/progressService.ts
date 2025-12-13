import { api } from "@/lib/api";

export interface SaveLastViewedPayload {
  courseId: string;
  sectionId: string;
  lessonId: string;
}

interface UserProgress {
  userId: string;
  courseId: string;
  lectureId: string;
  currentTime: number;
  lastUpdated: Date;
}

interface LessonProgressData {
  lessonId: string;
  currentTime: number;
  duration: number;
  completed: boolean;
  watchPercentage: number;
}

interface CourseProgress {
  courseId: string;
  progress: LessonProgressData[];
}

// class ProgressService {
//   private storageKey = "user_progress";
//   private useServerSync = true; // Toggle for server-side sync

//   // Mock user ID - replace with actual user from auth when Supabase is connected
//   private getCurrentUserId(): string {
//     return "mock_user_id";
//   }

//   /**
//    * Save progress to server (primary method)
//    * Falls back to localStorage if server request fails
//    */
//   async saveProgress(
//     courseId: string,
//     lectureId: string,
//     currentTime: number,
//     duration?: number,
//     completed?: boolean
//   ): Promise<void> {
//     if (this.useServerSync) {
//       try {
//         // Calculate watch percentage if duration is provided
//         const watchPercentage = duration ? (currentTime / duration) * 100 : 0;

//         await api.post(`/api/progress/lesson/${lectureId}`, {
//           courseId,
//           currentTime,
//           duration,
//           completed: completed || watchPercentage > 90,
//           watchPercentage,
//         });

//         console.log(
//           `Progress synced to server: ${currentTime}s for lesson ${lectureId}`
//         );
//         return;
//       } catch (error) {
//         console.error(
//           "Failed to sync progress to server, using localStorage:",
//           error
//         );
//         // Fall through to localStorage backup
//       }
//     }

//     // Fallback: localStorage (for offline or when server fails)
//     const userId = this.getCurrentUserId();
//     const progressKey = `${userId}_${courseId}_${lectureId}`;

//     const progress: UserProgress = {
//       userId,
//       courseId,
//       lectureId,
//       currentTime,
//       lastUpdated: new Date(),
//     };

//     const existingProgress = JSON.parse(
//       localStorage.getItem(this.storageKey) || "{}"
//     );
//     existingProgress[progressKey] = progress;
//     localStorage.setItem(this.storageKey, JSON.stringify(existingProgress));

//     console.log(
//       `Progress saved locally: ${currentTime}s for lecture ${lectureId}`
//     );
//   }

//   /**
//    * Get progress from server (primary method)
//    * Falls back to localStorage if server request fails
//    */
//   async getProgress(courseId: string, lectureId: string): Promise<number> {
//     if (this.useServerSync) {
//       try {
//         const response = await api.get<{
//           currentTime: number;
//           completed: boolean;
//         }>(`/api/progress/lesson/${lectureId}`);
//         return response.data.currentTime || 0;
//       } catch (error) {
//         console.error(
//           "Failed to fetch progress from server, using localStorage:",
//           error
//         );
//         // Fall through to localStorage backup
//       }
//     }

//     // Fallback: localStorage
//     const userId = this.getCurrentUserId();
//     const progressKey = `${userId}_${courseId}_${lectureId}`;

//     const existingProgress = JSON.parse(
//       localStorage.getItem(this.storageKey) || "{}"
//     );
//     const progress = existingProgress[progressKey] as UserProgress;

//     if (progress) {
//       console.log(
//         `Progress loaded: ${progress.currentTime}s for lecture ${lectureId}`
//       );
//       return progress.currentTime;
//     }

//     return 0;
//   }

//   /**
//    * Get all progress for a course from server
//    * @param courseId - The ID of the course
//    * @returns Array of lesson progress data
//    */
//   async getCourseProgress(courseId: string): Promise<CourseProgress> {
//     if (this.useServerSync) {
//       try {
//         const response = await api.get<CourseProgress>(
//           `/api/progress/course/${courseId}`
//         );
//         return response.data;
//       } catch (error) {
//         console.error("Failed to fetch course progress from server:", error);
//         return { courseId, progress: [] };
//       }
//     }

//     // Fallback: localStorage aggregation
//     const userId = this.getCurrentUserId();
//     const existingProgress = JSON.parse(
//       localStorage.getItem(this.storageKey) || "{}"
//     );

//     const courseProgressData: LessonProgressData[] = [];
//     Object.keys(existingProgress).forEach((key) => {
//       if (key.startsWith(`${userId}_${courseId}_`)) {
//         const progress = existingProgress[key] as UserProgress;
//         courseProgressData.push({
//           lessonId: progress.lectureId,
//           currentTime: progress.currentTime,
//           duration: 0, // Not stored in localStorage
//           completed: false,
//           watchPercentage: 0,
//         });
//       }
//     });

//     return { courseId, progress: courseProgressData };
//   }

//   /**
//    * Mark a lesson as completed
//    * @param courseId - The ID of the course
//    * @param lessonId - The ID of the lesson
//    */
//   async markLessonComplete(courseId: string, lessonId: string): Promise<void> {
//     if (this.useServerSync) {
//       try {
//         await api.post(`/api/progress/lesson/${lessonId}/complete`, {
//           courseId,
//         });
//         console.log(`Lesson ${lessonId} marked as completed`);
//       } catch (error) {
//         console.error("Failed to mark lesson as complete:", error);
//       }
//     }
//   }

//   /**
//    * Reset progress for a specific lesson
//    * @param courseId - The ID of the course
//    * @param lessonId - The ID of the lesson
//    */
//   async resetLessonProgress(courseId: string, lessonId: string): Promise<void> {
//     if (this.useServerSync) {
//       try {
//         await api.delete(`/api/progress/lesson/${lessonId}`);
//       } catch (error) {
//         console.error("Failed to reset lesson progress:", error);
//       }
//     }

//     // Also clear from localStorage
//     const userId = this.getCurrentUserId();
//     const progressKey = `${userId}_${courseId}_${lessonId}`;
//     const existingProgress = JSON.parse(
//       localStorage.getItem(this.storageKey) || "{}"
//     );
//     delete existingProgress[progressKey];
//     localStorage.setItem(this.storageKey, JSON.stringify(existingProgress));
//   }
// }

// export const progressService = new ProgressService();

/**
 * Save last viewed lesson (courseId, sectionId, lessonId) to track user's position in course
 * Used when user exits a lesson to remember where they left off
 */
export const saveLastViewedLesson = async (
  payload: SaveLastViewedPayload
): Promise<void> => {
  const response = await api.post("/api/progress/last-viewed", payload);
  return response.data;
};

/**
 * Synchronous save for unmount scenarios using sendBeacon
 * Guarantees delivery even if page closes or navigates away
 */
export const saveLastViewedLessonSync = (
  payload: SaveLastViewedPayload
): void => {
  if (navigator.sendBeacon) {
    // Browser guarantees delivery even if page closes
    const blob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });
    navigator.sendBeacon("/api/progress/last-viewed", blob);
  } else {
    // Fallback for older browsers (blocking but necessary)
    fetch("/api/progress/last-viewed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true, // Keeps request alive after page unload
    }).catch((error) => {
      console.error("Failed to save last viewed lesson:", error);
    });
  }
};
