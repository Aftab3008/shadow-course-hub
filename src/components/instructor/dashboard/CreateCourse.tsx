import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CourseForm from "./CourseForm";
import { useCategories } from "@/hooks/Category";

export default function CreateCourse() {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    refetch,
  } = useCategories();
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);

  return (
    <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
      <Button size="lg" asChild>
        <DialogTrigger>
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Course
        </DialogTrigger>
      </Button>
      <DialogContent className="max-w-md bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            <p>Create New Course</p>
          </DialogTitle>
        </DialogHeader>

        <CourseForm
          categories={categories?.data}
          isLoadingCategories={isLoadingCategories}
          refetch={refetch}
        />
      </DialogContent>
    </Dialog>
  );
}
