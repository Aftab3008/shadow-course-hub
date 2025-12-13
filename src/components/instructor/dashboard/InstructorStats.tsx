import InstructorStatsSkeleton from "@/components/shared/skeletons/InstructorStatsSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, DollarSign, Star, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function InstructorStats({
  totalStudents,
  totalCourses,
  totalRevenue,
  averageRating,
  totalReviews,
  isLoading,
}: {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <InstructorStatsSkeleton />;
  }

  const stats = [
    {
      icon: Users,
      value: totalStudents.toLocaleString(),
      label: "Total Students",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: BookOpen,
      value: totalCourses,
      label: "Total Courses",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: DollarSign,
      value: `$${totalRevenue.toLocaleString()}`,
      label: "Total Revenue",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: Star,
      value: averageRating,
      label: "Avg Rating",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-600 dark:text-yellow-500",
    },
    {
      icon: TrendingUp,
      value: totalReviews.toLocaleString(),
      label: "Total Reviews",
      gradient: "from-red-500/20 to-rose-500/20",
      iconColor: "text-red-600 dark:text-red-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <CardContent className="p-6 text-center relative z-10">
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
