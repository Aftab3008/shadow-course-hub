import InstructorResourcesSkeleton from "@/components/shared/skeletons/InstructorResourcesSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Upload,
  Video,
  Sparkles,
  FileText,
  HelpCircle,
} from "lucide-react";
import { m } from "framer-motion";

export default function InstructorResources({
  isLoading,
}: {
  isLoading: boolean;
}) {
  if (isLoading) {
    return <InstructorResourcesSkeleton />;
  }

  const resources = [
    {
      icon: Video,
      title: "Video Guidelines",
      description: "Learn best practices for creating engaging video content",
      buttonText: "View Guide",
      gradient: "from-red-500/20 to-rose-500/20",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      icon: Upload,
      title: "Upload Center",
      description: "Upload and manage your course videos and materials",
      buttonText: "Upload Content",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: BookOpen,
      title: "Instructor Handbook",
      description: "Complete guide to becoming a successful instructor",
      buttonText: "Read Handbook",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: FileText,
      title: "Course Templates",
      description: "Professional templates to structure your courses",
      buttonText: "Browse Templates",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: HelpCircle,
      title: "Support Center",
      description: "Get help and answers to common questions",
      buttonText: "Get Support",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-600 dark:text-yellow-500",
    },
    {
      icon: Sparkles,
      title: "Best Practices",
      description: "Tips and tricks from top-performing instructors",
      buttonText: "Learn More",
      gradient: "from-indigo-500/20 to-violet-500/20",
      iconColor: "text-indigo-600 dark:text-indigo-400",
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
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Instructor Resources
        </h2>
      </div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {resources.map((resource, index) => (
          <m.div key={index} variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group h-full">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${resource.gradient} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <resource.icon className={`h-8 w-8 ${resource.iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-lg">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                  {resource.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 group-hover:scale-105\"
                >
                  {resource.buttonText}
                </Button>
              </CardContent>
            </Card>
          </m.div>
        ))}
      </m.div>
    </div>
  );
}
