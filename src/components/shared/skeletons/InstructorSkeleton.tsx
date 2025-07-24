import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function InstructorSkeleton() {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-6">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-5 w-full mb-4" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="text-center">
                  <Skeleton className="h-7 w-12 mx-auto mb-1" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
