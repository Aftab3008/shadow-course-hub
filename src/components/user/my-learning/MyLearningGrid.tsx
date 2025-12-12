import { Enrollment } from "@/types/course";
import { MyLearningGridCard } from "./MyLearningGridCard";

interface MyLearningGridProps {
  enrollments: Partial<Enrollment>[];
}

export default function MyLearningGrid({ enrollments }: MyLearningGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {enrollments.map((enrollment) => (
        <MyLearningGridCard
          key={enrollment.course.id}
          enrollment={enrollment}
        />
      ))}
    </div>
  );
}
