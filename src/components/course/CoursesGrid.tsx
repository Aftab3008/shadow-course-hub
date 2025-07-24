import { Course } from "@/types/course";
import CourseCard from "./CourseCard";
import CourseGridSkeleton from "../shared/skeletons/CourseGridSkeleton";
import { Button } from "../ui/button";

interface CoursesGridProps {
  courses: Course[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
  refetch?: () => void;
}

const CoursesGrid = ({
  courses,
  isLoading,
  isError,
  error,
  refetch,
}: CoursesGridProps) => {
  if (isLoading) {
    return <CourseGridSkeleton />;
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold text-foreground mb-2">Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={refetch} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CoursesGrid;
