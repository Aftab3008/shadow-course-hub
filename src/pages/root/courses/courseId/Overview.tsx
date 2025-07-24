import { Card, CardContent } from "@/components/ui/card";
import OverviewSkeleton from "@/components/shared/skeletons/OverviewSkeleton";
import { CheckCircle, ClipboardCheckIcon } from "lucide-react";

export default function Overview({
  briefDescription,
  objectives,
  requirements,
  isLoading,
}: {
  briefDescription: string;
  objectives: string[];
  requirements: string[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <OverviewSkeleton />;
  }

  return (
    <main className="space-y-8">
      <Card className="border-border bg-gradient-to-br from-card to-card/80 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6 lg:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Course Description
            </h3>
          </div>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed text-lg">
              {briefDescription}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-gradient-to-br from-card to-card/80 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6 lg:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              What you'll learn
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {objectives.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-muted-foreground leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-gradient-to-br from-card to-card/80 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6 lg:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-500">
              <ClipboardCheckIcon className="h-6 w-6 " />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Requirements</h3>
          </div>
          <div className="space-y-3">
            {requirements.map((req, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  {req}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
