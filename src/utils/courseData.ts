import { Course, Category } from "@/types";
import { IconType } from "react-icons";
import {
  FaCode,
  FaChartBar,
  FaMobileAlt,
  FaPalette,
  FaBriefcase,
  FaCamera,
  FaMusic,
} from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";

export const getMockCourses = (): Course[] => [
  {
    id: "1",
    title: "Complete React Development Bootcamp 2024",
    description:
      "Master React, Redux, Hooks, Context API, and modern development practices",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
    instructor: {
      id: "inst-1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop",
      profileUrl:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop",
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
    description:
      "Learn design principles, user research, prototyping, and development handoff",
    thumbnail:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop",
    instructor: {
      id: "inst-2",
      name: "Mike Chen",
      email: "mike@example.com",
      avatar:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop",
      profileUrl:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop",
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
    description:
      "From basics to advanced ML algorithms, neural networks, and real-world projects",
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
    instructor: {
      id: "inst-3",
      name: "Dr. Emily Rodriguez",
      email: "emily@example.com",
      avatar:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop",
      profileUrl:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop",
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
  {
    id: "1",
    name: "Web Development",
    courses: "1250+",
    icon: FaCode,
    slug: "web-development",
  },
  {
    id: "2",
    name: "Data Science",
    courses: "850+",
    icon: FaChartBar,
    slug: "data-science",
  },
  {
    id: "3",
    name: "Mobile Development",
    courses: "650+",
    icon: FaMobileAlt,
    slug: "mobile-development",
  },
  {
    id: "4",
    name: "Design",
    courses: "920+",
    icon: FaPalette,
    slug: "design",
  },
  {
    id: "5",
    name: "Business",
    courses: "1100+",
    icon: FaBriefcase,
    slug: "business",
  },
  {
    id: "6",
    name: "Marketing",
    courses: "780+",
    icon: HiTrendingUp,
    slug: "marketing",
  },
  {
    id: "7",
    name: "Photography",
    courses: "450+",
    icon: FaCamera,
    slug: "photography",
  },
  {
    id: "8",
    name: "Music",
    courses: "320+",
    icon: FaMusic,
    slug: "music",
  },
];

// Mock API functions
export const fetchCourses = async (): Promise<Course[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return getMockCourses();
};

export const fetchCourseById = async (id: string): Promise<Course> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const courses = getMockCourses();
  const course = courses.find((c) => c.id === id);
  if (!course) {
    throw new Error(`Course with id ${id} not found`);
  }
  return course;
};

export const updateCourse = async (
  id: string,
  data: Partial<Course>
): Promise<Course> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const courses = getMockCourses();
  const course = courses.find((c) => c.id === id);
  if (!course) {
    throw new Error(`Course with id ${id} not found`);
  }
  return { ...course, ...data };
};
