import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SidecardSkeleton() {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        <Card className="border-border bg-card">
          <Skeleton className="aspect-video w-full rounded-t-lg" />

          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>

            <div className="space-y-3 mb-6">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
