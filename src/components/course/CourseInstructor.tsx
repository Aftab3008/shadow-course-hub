
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Instructor } from "@/types";

interface CourseInstructorProps {
  instructor: Instructor;
}

const CourseInstructor = ({ instructor }: CourseInstructorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={instructor.avatar} alt={instructor.name} />
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
