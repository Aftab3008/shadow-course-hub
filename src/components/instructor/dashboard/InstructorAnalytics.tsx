import InstructorAnalyticsSkeleton from "@/components/shared/skeletons/InstructorAnalyticsSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  BarChart3,
} from "lucide-react";
import { m } from "framer-motion";

export default function InstructorAnalytics({
  isLoading,
}: {
  isLoading: boolean;
}) {
  if (isLoading) {
    return <InstructorAnalyticsSkeleton />;
  }

  const analytics = [
    {
      title: "Monthly Revenue",
      value: "$12,340",
      change: "+15.3%",
      changeLabel: "from last month",
      icon: DollarSign,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "New Students",
      value: "1,247",
      change: "+8.7%",
      changeLabel: "from last month",
      icon: Users,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Course Completion",
      value: "73%",
      progress: 73,
      icon: Target,
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Average Rating",
      value: "4.8",
      rating: 4.8,
      icon: Star,
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-600 dark:text-yellow-500",
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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Analytics Overview
        </h2>
      </div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {analytics.map((item, index) => (
          <m.div key={index} variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground text-base font-semibold">
                    {item.title}
                  </CardTitle>
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient}`}
                  >
                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-foreground mb-3">
                  {item.value}
                </div>
                {item.change && (
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {item.change}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {item.changeLabel}
                    </span>
                  </div>
                )}
                {item.progress !== undefined && (
                  <Progress value={item.progress} className="mt-3 h-2" />
                )}
                {item.rating && (
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(item.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </m.div>
        ))}
      </m.div>
    </div>
  );
}
