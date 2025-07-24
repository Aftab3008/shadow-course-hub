import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsSkeleton() {
  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-40" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, starIndex) => (
                      <Skeleton key={starIndex} className="h-4 w-4" />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
