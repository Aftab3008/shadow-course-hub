import InstructorCard from "@/components/instructor/dashboard/InsturctorCard";
import InstructorCoursesSkeleton from "@/components/shared/skeletons/InstructorCoursesSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course } from "@/types/course";
import { Library, Filter } from "lucide-react";
import { m } from "framer-motion";

export default function InstructorCourses({
  instructorCourses,
  isLoading,
}: {
  instructorCourses: Partial<Course>[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <InstructorCoursesSkeleton />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Library className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-background border-border hover:border-primary/30 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {instructorCourses.map((course) => (
          <InstructorCard key={course.id} course={course} />
        ))}
      </m.div>
    </div>
  );
}
