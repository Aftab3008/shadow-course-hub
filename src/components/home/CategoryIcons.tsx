import { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  Palette,
  Briefcase,
  Camera,
  TrendingUp,
  Smartphone,
  Brain,
  Music,
  Languages,
  Heart,
  Wrench,
} from "lucide-react";

export interface CategoryData {
  name: string;
  icon: LucideIcon;
  courses: string;
  description: string;
  gradient: string;
}

export const categoryData: CategoryData[] = [
  {
    name: "Web Development",
    icon: Code2,
    courses: "1,200+",
    description: "Full-stack, frontend, and backend development",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Data Science",
    icon: Database,
    courses: "800+",
    description: "Analytics, machine learning, and AI",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Design",
    icon: Palette,
    courses: "600+",
    description: "UI/UX, graphic design, and illustration",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Business",
    icon: Briefcase,
    courses: "500+",
    description: "Management, strategy, and entrepreneurship",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Photography",
    icon: Camera,
    courses: "400+",
    description: "Digital photography and video production",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    name: "Marketing",
    icon: TrendingUp,
    courses: "350+",
    description: "Digital marketing and social media",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "Mobile Dev",
    icon: Smartphone,
    courses: "450+",
    description: "iOS, Android, and cross-platform apps",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    name: "IT & Software",
    icon: Wrench,
    courses: "550+",
    description: "IT infrastructure and system administration",
    gradient: "from-slate-500 to-gray-500",
  },
  {
    name: "Personal Dev",
    icon: Brain,
    courses: "320+",
    description: "Leadership, productivity, and mindfulness",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    name: "Music",
    icon: Music,
    courses: "280+",
    description: "Music theory, production, and instruments",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Languages",
    icon: Languages,
    courses: "390+",
    description: "Learn new languages from native speakers",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    name: "Health & Fitness",
    icon: Heart,
    courses: "310+",
    description: "Nutrition, exercise, and wellness",
    gradient: "from-red-500 to-pink-500",
  },
];
