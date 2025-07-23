import InstructorResourcesSkeleton from "@/components/shared/skeletons/InstructorResourcesSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Upload, Video } from "lucide-react";

export default function InstructorResources({
  isLoading,
}: {
  isLoading: boolean;
}) {
  if (isLoading) {
    return <InstructorResourcesSkeleton />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">
        Instructor Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <Video className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              Video Guidelines
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn best practices for creating engaging video content
            </p>
            <Button variant="outline" size="sm">
              View Guide
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              Upload Center
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload and manage your course videos and materials
            </p>
            <Button variant="outline" size="sm">
              Upload Content
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              Instructor Handbook
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete guide to becoming a successful instructor
            </p>
            <Button variant="outline" size="sm">
              Read Handbook
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
