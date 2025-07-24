import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewSkeleton() {
  return (
    <main className="space-y-6">
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Skeleton className="h-5 w-5 mt-0.5" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Skeleton className="h-1.5 w-1.5 mt-2 rounded-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
