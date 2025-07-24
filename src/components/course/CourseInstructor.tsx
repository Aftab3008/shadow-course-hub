import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types";

interface CourseInstructorProps {
  instructor: {
    name: string;
    email: string;
    profileUrl: string;
  };
}

const CourseInstructor = ({ instructor }: CourseInstructorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={instructor.profileUrl} alt={instructor.name} />
        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
          {instructor.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm text-muted-foreground">{instructor.name}</span>
    </div>
  );
};

export default CourseInstructor;
