import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SectionManagerSkeleton() {
  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-8 px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <Skeleton className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-5 w-72" />
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-48" />
          </div>

          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              className="border-border bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-4 w-4" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                      <Skeleton className="h-4 w-64 mb-2" />
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-5 w-12" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
