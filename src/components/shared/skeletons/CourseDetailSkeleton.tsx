import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function CourseDetailSkeleton() {
  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-8 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <Skeleton className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-5 w-72" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 sm:h-11 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 sm:h-11 w-full" />
              </div>
              <div className="lg:col-span-2 space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-20 sm:h-24 w-full" />
              </div>
              <div className="lg:col-span-2 space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-20 sm:h-24 w-full" />
              </div>
            </div>
          </div>

          <Separator className="my-6 sm:my-8" />

          {/* Course Structure Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-40" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 sm:h-11 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-10 sm:h-11 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 sm:h-11 w-full" />
              </div>
            </div>
          </div>

          <Separator className="my-6 sm:my-8" />

          {/* Learning Outcomes Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-36" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-10 flex-1" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-9 w-32" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <div className="space-y-3">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-10 flex-1" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-9 w-36" />
              </div>
            </div>
          </div>

          <Separator className="my-6 sm:my-8" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
            <Skeleton className="h-10 sm:h-11 w-full sm:flex-1" />
            <Skeleton className="h-10 sm:h-11 w-full sm:w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
