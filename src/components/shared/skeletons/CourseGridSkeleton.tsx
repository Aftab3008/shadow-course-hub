import CourseCardSkeleton from "./CourseCardSkeleton";

interface CourseGridSkeletonProps {
  count?: number;
}

const CourseGridSkeleton = ({ count = 6 }: CourseGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CourseGridSkeleton;
