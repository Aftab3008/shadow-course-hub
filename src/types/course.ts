export type CourseProgressStatus = "NOTSTARTED" | "INPROGRESS" | "COMPLETED";

export interface Course {
  id: string;
  title: string;
  description: string;
  briefDescription?: string;
  category: { name: string };
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  price: number;
  OriginalPrice: number;
  thumbnail?: string;
  thumbnailId?: string;
  published?: boolean;
  instructor: Instructor;
  reviews: Review[];
  requirements: string[];
  objectives: string[];
  language: string;
  duration: number;
  totalLessons: number;
  totalSections: number;
  sections: Section[];
  enrollments: Enrollment[];
  isEnrolled?: boolean; // Client-side flag: true if current user is enrolled
  userEnrollment?: Enrollment; // Current user's enrollment data (if enrolled)
  updatedAt: string;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  order: number;
  fileName?: string;
  videoUrl?: string; // Only returned for enrolled users or preview lessons
  videoId?: string;
  isPreview?: boolean; // Indicates if this is a free preview lesson
  isLocked?: boolean; // UI flag to show lesson is locked (computed client-side)
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  content: string;
  user: {
    name: string;
    email: string;
    profileUrl: string;
  };
  rating: Rating;
  createdAt: string;
}

export interface Rating {
  id: string;
  rating: number;
}

export interface Enrollment {
  id: string;
  courseId: string;
  progressCourse: CourseProgressStatus;
  currentLessonId?: string;
  currentSectionId?: string;
  currentSection?: Partial<Section>;
  currentLesson?: Partial<Lesson>;
  user: {
    name: string;
    email: string;
  };
  LessonProgress: LessonProgress[];
  course: Partial<Course>;
}

export interface LessonProgress {
  lesson: LessonTitle;
}

export interface LessonTitle {
  title: string;
}

export interface Instructor {
  name: string;
  profileUrl: string;
  email: string;
}

export interface InstructorCourse {
  message: string;
  success: boolean;
  data?: Partial<Course>;
  status?: number;
}

export interface InstructorCourses {
  message: string;
  success: boolean;
  data?: Partial<Course>[];
}

export interface CoursesResponse {
  message: string;
  success: boolean;
  data?: Course[];
}

export interface CourseIdResponse {
  message: string;
  success: boolean;
  data?: Course;
}

export interface MyLearningResponse {
  success: true;
  message: string;
  data: Partial<Enrollment>[];
}

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
