
import { Users, Clock } from "lucide-react";

interface CourseStatsProps {
  students: number;
  duration: string;
}

const CourseStats = ({ students, duration }: CourseStatsProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1 text-muted-foreground">
        <Users className="h-4 w-4" />
        <span className="text-sm">{students.toLocaleString()}</span>
      </div>
      <div className="flex items-center space-x-1 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span className="text-sm">{duration}</span>
      </div>
    </div>
  );
};

export default CourseStats;
