export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Instructor extends User {
  bio?: string;
  expertise?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: Instructor;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  price: number;
  originalPrice?: number;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  chapters?: Chapter[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  courseId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  order: number;
  chapterId?: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  lectureId: string;
  currentTime: number;
  lastUpdated: Date;
}

export interface Category {
  name: string;
  icon: string;
  courses: string;
  slug: string;
}

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseCategory =
  | "programming"
  | "design"
  | "business"
  | "marketing"
  | "photography"
  | "music";

export interface CourseFormData {
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number;
  thumbnail?: string;
}

export interface ChapterFormData {
  title: string;
  description: string;
  order: number;
}

export interface LessonFormData {
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  order: number;
}

export interface UserAuthState {
  user: any;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  signup: (
    name: string,
    email: string,
    password: string,
    agreeToTerms: boolean,
    agreeToPrivacyPolicy: boolean
  ) => Promise<{ message: string; success: boolean }>;
  verifyEmail: (code: string) => Promise<any>;
  checkAuth: () => Promise<void>;
  login: (
    email: string,
    password: string
  ) => Promise<{ message: string; success: boolean }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}
