import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CourseHeaderSkeleton from "@/components/shared/skeletons/CourseHeaderSkeleton";
import { formatDuration, formatName, formatString } from "@/utils/utils";
import { Clock, Globe, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseHeader({
  category,
  level,
  duration,
  description,
  language,
  title,
  instructor,
  reviewsLength,
  enrollements,
  isLoading,
}: {
  category: { name: string };
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: number;
  title: string;
  description: string;
  instructor: {
    name: string;
    profileUrl: string;
  };
  language: string;
  reviewsLength: number;
  enrollements: number;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <CourseHeaderSkeleton />;
  }

  return (
    <div className="w-full bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
      <div className="flex flex-wrap gap-3 mb-6">
        <Badge
          variant="secondary"
          className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {formatString(category.name)}
        </Badge>
        <Badge
          variant="outline"
          className="px-3 py-1 text-sm font-medium border-primary/20 text-foreground hover:bg-primary/5 transition-colors"
        >
          {formatString(level)}
        </Badge>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
        {title}
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-4xl">
        {description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-8 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Reviews</span>
            <span className="font-semibold text-foreground">
              {reviewsLength}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Students</span>
            <span className="font-semibold text-foreground">
              {enrollements}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
            <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="font-semibold text-foreground">
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
            <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Language</span>
            <span className="font-semibold text-foreground">
              {formatString(language)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
        <Avatar className="h-16 w-16 border-2 border-border">
          <AvatarImage src={instructor.profileUrl} alt={instructor.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
            {formatName(instructor.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Link
            to={`/instructor/${instructor.name}`}
            className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 block"
          >
            {instructor.name}
          </Link>
          <p className="text-sm text-muted-foreground">
            Course Instructor • {enrollements} students enrolled
          </p>
        </div>
      </div>
    </div>
  );
}
