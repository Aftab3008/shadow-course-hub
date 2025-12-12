import { useMemo } from "react";
import { EnrollmentLearning } from "@/types/learning";
import { calculateProgress, generateCourseId } from "@/utils/learningUtils";

interface EnhancedEnrollment extends EnrollmentLearning {
  progress: number;
  lastWatched: string;
  nextLesson: string;
  completedDate: string;
  certificateAvailable: boolean;
  courseId: string;
}

interface UseMyLearningDataProps {
  enrollments: EnrollmentLearning[];
  searchQuery: string;
}

interface MyLearningStats {
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  totalProgress: number;
}

export function useMyLearningData({
  enrollments,
  searchQuery,
}: UseMyLearningDataProps) {
  const enhancedEnrollments = useMemo(() => {
    return enrollments.map(
      (enrollment): EnhancedEnrollment => ({
        ...enrollment,
        progress: calculateProgress(enrollment), // Use the utility function for real progress
        lastWatched: "2 days ago", // TODO: Replace with real last watched data
        nextLesson:
          enrollment.LessonProgress?.[0]?.lesson?.title || "Start Course",
        completedDate: "2 weeks ago", // TODO: Replace with real completion date
        certificateAvailable: enrollment.progressCourse === "COMPLETED",
        courseId: generateCourseId(enrollment.course.title), // Use the utility function
      })
    );
  }, [enrollments]);

  const filteredEnrollments = useMemo(() => {
    if (!searchQuery.trim()) return enhancedEnrollments;

    const searchLower = searchQuery.toLowerCase();
    return enhancedEnrollments.filter((enrollment) => {
      return (
        enrollment.course?.title?.toLowerCase().includes(searchLower) ||
        enrollment.course?.instructor?.name
          ?.toLowerCase()
          .includes(searchLower) ||
        enrollment.course?.category?.name?.toLowerCase().includes(searchLower)
      );
    });
  }, [enhancedEnrollments, searchQuery]);

  const stats = useMemo((): MyLearningStats => {
    const completedCourses = enhancedEnrollments.filter(
      (e) => e.progress === 100
    ).length;

    const totalHours = enrollments.reduce((acc, enrollment) => {
      return acc + (enrollment.course?.totalLessons * 10 || 0); // Assume 10 minutes per lesson
    }, 0);

    const totalProgress =
      enhancedEnrollments.length > 0
        ? enhancedEnrollments.reduce(
            (acc, enrollment) => acc + (enrollment.progress || 0),
            0
          ) / enhancedEnrollments.length
        : 0;

    return {
      totalCourses: enrollments.length,
      completedCourses,
      totalHours,
      totalProgress,
    };
  }, [enrollments, enhancedEnrollments]);

  return {
    enhancedEnrollments,
    filteredEnrollments,
    stats,
  };
}

export type { EnhancedEnrollment, MyLearningStats };
