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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-foreground">My Courses</h2>
        <div className="flex space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-background border-border">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {instructorCourses.map((course) => (
          <InstructorCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
