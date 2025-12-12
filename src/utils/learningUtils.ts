import { EnrollmentLearning } from "@/types/learning";

export function calculateProgress(enrollment: EnrollmentLearning): number {
  if (enrollment.progressCourse === "COMPLETED") {
    return 100;
  }

  if (enrollment.progressCourse === "INPROGRESS") {
    // Calculate based on lesson progress if available
    if (enrollment.LessonProgress && enrollment.course?.totalLessons) {
      // For now, we'll use the length of LessonProgress as completed lessons
      // In a real implementation, you'd have a completion status for each lesson
      const progressedLessons = enrollment.LessonProgress.length;

      return Math.round(
        (progressedLessons / enrollment.course.totalLessons) * 100
      );
    }

    // Fallback to random progress for demo (remove in production)
    return Math.floor(Math.random() * 80) + 10;
  }

  return 0;
}

export function generateCourseId(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function calculateTotalTime(
  totalLessons: number,
  avgTimePerLesson: number = 10
): number {
  return totalLessons * avgTimePerLesson;
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}
