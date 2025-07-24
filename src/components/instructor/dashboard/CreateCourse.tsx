import { useCategories } from "@/hooks/Category";
import CourseForm from "./CourseForm";

export default function CreateCourse() {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    refetch,
  } = useCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Share Your Expertise
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Create an engaging online course and help thousands of students
              learn new skills
            </p>
          </div>

          {/* Form Section */}
          <div className="w-full">
            <CourseForm
              categories={categories?.data}
              isLoadingCategories={isLoadingCategories}
              refetch={refetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
