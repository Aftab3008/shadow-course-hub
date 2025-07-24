import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import InstructorSkeleton from "@/components/shared/skeletons/InstructorSkeleton";
import { formatName } from "@/utils/utils";

export default function Instructor({
  profileUrl,
  name,
  enrolledStudents,
  isLoading,
}: {
  profileUrl: string;
  name: string;
  enrolledStudents: number;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <InstructorSkeleton />;
  }

  return (
    <Card className="border-border bg-gradient-to-br from-card to-card/80 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-6 mb-8">
          <Avatar className="h-24 w-24 lg:h-32 lg:w-32 border-4 border-border shadow-lg">
            <AvatarImage src={profileUrl} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl lg:text-3xl font-bold">
              {formatName(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                {name}
              </h3>
              <p className="text-lg text-muted-foreground">
                Course Instructor & Industry Expert
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200">
                <div className="text-2xl font-bold text-foreground mb-1">
                  4.8
                </div>
                <div className="text-sm text-muted-foreground">
                  Instructor Rating
                </div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {enrolledStudents.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200">
                <div className="text-2xl font-bold text-foreground mb-1">
                  12
                </div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200">
                <div className="text-2xl font-bold text-foreground mb-1">
                  8+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-foreground">
            About the Instructor
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            An experienced professional with expertise in the field, dedicated
            to providing high-quality education and helping students achieve
            their learning goals through practical, hands-on instruction and
            real-world examples.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
