
import { Course, Category } from '@/types';

export const getMockCourses = (): Course[] => [
  {
    id: "1",
    title: "Complete React Development Bootcamp 2024",
    description: "Master React, Redux, Hooks, Context API, and modern development practices",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
    instructor: {
      id: "inst-1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop",
      profileUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop",
    },
    rating: 4.8,
    reviews: 12450,
    students: 45230,
    duration: "42h 30m",
    price: 89.99,
    originalPrice: 199.99,
    category: "programming",
    level: "intermediate",
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass - Figma to Production",
    description: "Learn design principles, user research, prototyping, and development handoff",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop",
    instructor: {
      id: "inst-2",
      name: "Mike Chen",
      email: "mike@example.com",
      avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop",
      profileUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop",
    },
    rating: 4.9,
    reviews: 8920,
    students: 23470,
    duration: "35h 15m",
    price: 79.99,
    originalPrice: 159.99,
    category: "design",
    level: "beginner",
  },
  {
    id: "3",
    title: "Machine Learning with Python - Complete Course",
    description: "From basics to advanced ML algorithms, neural networks, and real-world projects",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
    instructor: {
      id: "inst-3",
      name: "Dr. Emily Rodriguez",
      email: "emily@example.com",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop",
      profileUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop",
    },
    rating: 4.7,
    reviews: 15680,
    students: 38940,
    duration: "58h 45m",
    price: 119.99,
    originalPrice: 249.99,
    category: "design",
    level: "advanced",
  },
];

export const getMockCategories = (): Category[] => [
  { name: "Programming", icon: "💻", courses: "2,450+", slug: "programming" },
  { name: "Design", icon: "🎨", courses: "1,230+", slug: "design" },
  { name: "Business", icon: "📊", courses: "890+", slug: "business" },
  { name: "Marketing", icon: "📢", courses: "670+", slug: "marketing" },
  { name: "Photography", icon: "📸", courses: "520+", slug: "photography" },
  { name: "Music", icon: "🎵", courses: "340+", slug: "music" },
];

// Mock API functions
export const fetchCourses = async (): Promise<Course[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return getMockCourses();
};

export const fetchCourseById = async (id: string): Promise<Course> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const courses = getMockCourses();
  const course = courses.find(c => c.id === id);
  if (!course) {
    throw new Error(`Course with id ${id} not found`);
  }
  return course;
};

export const fetchCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getMockCategories();
};

export const updateCourse = async (id: string, data: Partial<Course>): Promise<Course> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const courses = getMockCourses();
  const course = courses.find(c => c.id === id);
  if (!course) {
    throw new Error(`Course with id ${id} not found`);
  }
  return { ...course, ...data };
};
