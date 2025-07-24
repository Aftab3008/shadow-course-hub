import {
  fetchCourseById,
  fetchCourses,
  fetchFeaturedCourses,
} from "@/services/courses.services";
import { Course } from "@/types/course";
import { updateCourse } from "@/utils/courseData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useCourses = () => {
  const query = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
  return query;
};

export const useFeaturedCourses = (count: number) => {
  return useQuery({
    queryKey: ["featuredCourses", count],
    queryFn: () => fetchFeaturedCourses(count),
  });
};

export const useCourseById = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id,
  });
};

// Sample hook to fetch all courses
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
