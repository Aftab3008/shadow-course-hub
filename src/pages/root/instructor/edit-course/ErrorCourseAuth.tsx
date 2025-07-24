import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorCourseAuth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto p-3 rounded-full bg-destructive/10 w-fit mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl font-semibold text-destructive">
            Course Not Found
          </CardTitle>
          <CardDescription>
            You don't have permission to access this course or it doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button asChild className="w-full">
            <Link to="/instructor/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
