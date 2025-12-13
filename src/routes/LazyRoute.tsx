import { ReactNode, Suspense } from "react";

export const LazyRoute = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    }
  >
    {children}
  </Suspense>
);
