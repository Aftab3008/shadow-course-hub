import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <Card className="border-border bg-card">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Skeleton className="h-5 w-full mb-1" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        <div className="mb-3">
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        <div className="mb-3 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        <Skeleton className="h-6 w-20 rounded-full" />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCardSkeleton;
