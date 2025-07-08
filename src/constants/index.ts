import { ReactNode } from "react";

export const testimonials = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];
interface Category {
  id: string;
  name: string;
  query: string;
  courseCount: number;
  icon: ReactNode;
}
export const testCategories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    courseCount: 1250,
    icon: "Code",
    query: "web-development",
  },
  {
    id: "2",
    name: "Data Science",
    courseCount: 850,
    icon: "BarChart3",
    query: "data-science",
  },
  {
    id: "3",
    name: "Mobile Development",
    courseCount: 650,
    icon: "Smartphone",
    query: "mobile-development",
  },
  {
    id: "4",
    name: "Design",
    courseCount: 920,
    icon: "Palette",
    query: "design",
  },
  {
    id: "5",
    name: "Business",
    courseCount: 1100,
    icon: "Briefcase",
    query: "business",
  },
  {
    id: "6",
    name: "Marketing",
    courseCount: 780,
    icon: "TrendingUp",
    query: "marketing",
  },
  {
    id: "7",
    name: "Photography",
    courseCount: 450,
    icon: "Camera",
    query: "photography",
  },
  {
    id: "8",
    name: "Music",
    courseCount: 320,
    icon: "Music",
    query: "music",
  },
];
