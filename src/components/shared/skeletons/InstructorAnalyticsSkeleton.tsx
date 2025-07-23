import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function InstructorAnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-border bg-card">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-24 mb-2" />
              {index < 2 ? (
                <div className="flex items-center space-x-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ) : index === 2 ? (
                <Skeleton className="h-2 w-full mt-2" />
              ) : (
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Skeleton key={starIndex} className="h-5 w-5" />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
