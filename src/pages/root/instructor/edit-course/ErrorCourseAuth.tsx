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
import { motion } from "framer-motion";

export default function ErrorCourseAuth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-xl border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto p-3 rounded-full bg-gradient-to-br from-red-500/20 to-red-500/10 w-fit mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-xl font-semibold text-destructive">
              Course Not Found
            </CardTitle>
            <CardDescription>
              You don't have permission to access this course or it doesn't
              exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              asChild
              className="w-full hover:scale-105 transition-all duration-200"
            >
              <Link to="/instructor/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
