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
  instructor: {
    name: string;
    email: string;
    profileUrl: string;
  };
  reviews: Review[];
  requirements: string[];
  objectives: string[];
  language: string;
  duration: number;
  sections: Section[];
  enrollments: Enrollment[];
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
  videoUrl?: string;
  videoId?: string;
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
  user: {
    name: string;
    email: string;
  };
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

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
