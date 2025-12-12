import { Enrollment } from "@/types/course";
import { MyLearningCourseCard } from "./MyLearningCourseCard";
import MyLearningGrid from "./MyLearningGrid";

interface MyLearningCardProps {
  enrollments: Partial<Enrollment>[];
  viewMode?: "grid" | "list";
}

export default function MyLearningSection({
  enrollments,
  viewMode = "list",
}: MyLearningCardProps) {
  if (viewMode === "grid") {
    return <MyLearningGrid enrollments={enrollments} />;
  }

  return (
    <div className="space-y-6">
      {enrollments.map((enrollment) => (
        <MyLearningCourseCard
          key={enrollment.course?.id}
          enrollment={enrollment}
        />
      ))}
    </div>
  );
}
