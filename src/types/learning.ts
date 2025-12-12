import { Course } from "./course";

export interface UserEnrollment {
  courseId: string;
  progressCourse: string;
  currentLessonId: string;
  currentSectionId: string;
  course: Partial<Course>;
  lessonProgress: LessonProgressLearning[];
  //   id: string;
  //   userId: string;
  //   enrolledAt: string; // ISO date string
  //   progress: number; // percentage of course completed
  //   course: {
  //     id: string;
  //     title: string;
  //     description: string;
  //     instructor: {
  //       id: string;
  //       name: string;
  //     };
  //     category: {
  //       id: string;
  //       name: string;
  //     };
  //     level: "beginner" | "intermediate" | "advanced";
  //     duration: number; // in minutes
  //     totalLessons: number;
  //     language?: string;
  //   };
}

export type EnrollmentCheckResponse = {
  isEnrolled: boolean;
  enrollment?: UserEnrollment;
};

export interface LessonProgressLearning {
  lessonId: string;
  isCompleted: boolean;
}
