import { Skeleton } from "@/components/ui/skeleton";

export default function CurriculumSkeleton() {
  return (
    <main className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="w-full flex flex-col gap-4">
        {[...Array(4)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="border border-border rounded-lg">
            <div className="flex justify-between items-center w-full p-4">
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="px-4 pb-4">
              <div className="space-y-2 pt-2">
                {[...Array(3)].map((_, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="flex items-center justify-between p-2 hover:bg-muted/50 rounded"
                  >
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
