export interface Course {
  id: string;
  title: string;
  description: string;
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
  };
  reviews: Review[];
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
  duration: string;
  order: number;
  fileName?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  content: string;
  user: {
    name: string;
    email: string;
  };
  rating: Rating;
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

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
