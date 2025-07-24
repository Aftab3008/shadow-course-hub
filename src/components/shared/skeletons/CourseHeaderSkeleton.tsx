import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseHeaderSkeleton() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>

      <Skeleton className="h-10 w-full max-w-2xl mb-4" />

      <Skeleton className="h-6 w-full max-w-3xl mb-6" />

      <div className="flex flex-wrap items-center gap-6 mb-6">
        <div className="flex items-center space-x-1">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex items-center space-x-1">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex items-center space-x-1">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex items-center space-x-1">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-18" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div>
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
}
