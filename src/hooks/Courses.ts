import { Course } from "@/types/course";
import {
  fetchCourseById,
  fetchCourses,
  updateCourse,
} from "@/utils/courseData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

// Sample hook to fetch all courses
export const useCourses = () => {
  const query = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  return query;
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id,
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Course> }) =>
      updateCourse(id, data),
    onSuccess: (updatedCourse) => {
      queryClient.setQueryData(["course", updatedCourse.id], updatedCourse);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast({
        title: "Success",
        description: "Course updated successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update course",
        variant: "destructive",
      });
    },
  });
};
