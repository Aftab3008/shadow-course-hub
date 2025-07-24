import { Skeleton } from "@/components/ui/skeleton";
import CourseHeaderSkeleton from "./CourseHeaderSkeleton";
import SidecardSkeleton from "./SidecardSkeleton";

export default function CourseDetailPageSkeleton() {
  return (
    <main className="w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CourseHeaderSkeleton />

            <div className="w-full">
              <div className="grid w-full grid-cols-4 bg-muted h-10 p-1 mb-8 rounded-lg">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-8 mx-1" />
                ))}
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-48" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SidecardSkeleton />
        </div>
      </div>
    </main>
  );
}
