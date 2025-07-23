import { queryClient } from "@/main";
import {
  deleteSection,
  fetchCourseByIdInstructor,
  getInstructorCourses,
  publishCourse,
  updateCourseDetails,
  updateLessonOrder,
  updateSection,
  updateSectionOrder,
  updateSettings,
} from "@/services/instructor.services";
import {
  Course,
  InstructorCourse,
  InstructorCourses,
  Lesson,
  Section,
} from "@/types/course";
import { useMutation, useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useMemo } from "react";
import { useToast } from "./use-toast";

export const useInstructorCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["course-instructor", courseId],
    queryFn: () => fetchCourseByIdInstructor({ courseId }),
    enabled: !!courseId,
  });
};

export const useUpdateOrderMutation = (courseId: string) => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({
      section1,
      section2,
    }: {
      section1: Section;
      section2: Section;
    }) => {
      const section1Order = section1.order;
      const section2Order = section2.order;
      if (section1Order === section2Order) {
        return;
      }
      section1.order = section2Order;
      section2.order = section1Order;
      const result = await updateSectionOrder({
        courseId,
        section1: { id: section1.id, order: section1.order },
        section2: { id: section2.id, order: section2.order },
      });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.data;
    },
    onMutate: async ({ section1, section2 }) => {
      await queryClient.cancelQueries({
        queryKey: ["course-instructor", courseId],
      });

      const prev = queryClient.getQueryData<Course>([
        "course-instructor",
        courseId,
      ]);
      queryClient.setQueryData<InstructorCourse>(
        ["course-instructor", courseId],
        (oldData) => {
          if (!oldData) return oldData;
          const updatedSections = oldData.data.sections.map((section) => {
            if (section.id === section1.id) {
              return { ...section, order: section2.order };
            }
            if (section.id === section2.id) {
              return { ...section, order: section1.order };
            }
            return section;
          });
          return { ...oldData, sections: updatedSections };
        }
      );

      return { prev };
    },
    onError(error, variables, context) {
      toast({
        title: "Error",
        description: error.message || "Failed to update section order",
        variant: "destructive",
      });
      if (context?.prev) {
        queryClient.setQueryData(["course-instructor", courseId], context.prev);
      }
    },
    onSuccess(data, variables, context) {
      toast({
        title: "Success",
        description: "Section order updated successfully!",
        variant: "success",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["course-instructor", courseId],
      });
    },
  });

  const debouncedMutate = useMemo(
    () => debounce(mutation.mutate, 300),
    [mutation.mutate]
  );

  return { ...mutation, mutate: debouncedMutate };
};

export const useUpdateLessonOrderMutation = (
  courseId: string,
  sectionId: string
) => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({
      lesson1,
      lesson2,
    }: {
      lesson1: Lesson;
      lesson2: Lesson;
    }) => {
      if (lesson1.order === lesson2.order) {
        return;
      }
      const result = await updateLessonOrder({
        courseId,
        sectionId,
        lesson1: { id: lesson1.id, order: lesson1.order },
        lesson2: { id: lesson2.id, order: lesson2.order },
      });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.data;
    },
    onMutate: async ({ lesson1, lesson2 }) => {
      await queryClient.cancelQueries({
        queryKey: ["course-instructor", courseId],
      });

      const prev = queryClient.getQueryData<InstructorCourse>([
        "course-instructor",
        courseId,
      ]);

      queryClient.setQueryData<InstructorCourse>(
        ["course-instructor", courseId],
        (oldData) => {
          if (!oldData) return oldData;
          const updatedSections = oldData.data.sections.map((section) => {
            if (section.id === sectionId) {
              const updatedLessons = section.lessons.map((lesson) => {
                if (lesson.id === lesson1.id) {
                  return { ...lesson, order: lesson2.order };
                }
                if (lesson.id === lesson2.id) {
                  return { ...lesson, order: lesson1.order };
                }
                return lesson;
              });
              return { ...section, lessons: updatedLessons };
            }
            return section;
          });
          return { ...oldData, sections: updatedSections };
        }
      );

      return { prev };
    },
    onError(error, variables, context) {
      toast({
        title: "Error",
        description: error.message || "Failed to update lesson order",
        variant: "destructive",
      });
      if (context?.prev) {
        queryClient.setQueryData(["course-instructor", courseId], context.prev);
      }
    },
    onSuccess(data, variables, context) {
      toast({
        title: "Success",
        description: "Lesson order updated successfully!",
        variant: "success",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["course-instructor", courseId],
      });
    },
  });

  const debouncedMutate = useMemo(
    () => debounce(mutation.mutate, 300),
    [mutation.mutate]
  );

  return { ...mutation, mutate: debouncedMutate };
};

export const useUpdateCourseDetails = (courseId: string) => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      title,
      price,
      description,
      category,
      level,
    }: {
      title: string;
      price: number;
      description: string;
      category: { name: string };
      level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    }) => {
      const result = await updateCourseDetails({
        courseId,
        title,
        price,
        description,
        category: { name: category.name.toLowerCase() },
        level: level,
      });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onMutate: async ({ title, price, description, category, level }) => {
      await queryClient.cancelQueries({
        queryKey: ["course-instructor", courseId],
      });

      const prev = queryClient.getQueryData<InstructorCourse>([
        "course-instructor",
        courseId,
      ]);

      queryClient.setQueryData<InstructorCourse>(
        ["course-instructor", courseId],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            title,
            price,
            description,
            category,
            level,
          };
        }
      );

      return { prev };
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Course details updated successfully!",
        variant: "success",
      });
    },
    onError: (error, variables, context) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update course details",
        variant: "destructive",
      });
      if (context?.prev) {
        queryClient.setQueryData(["course-instructor", courseId], context.prev);
      }
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["course-instructor", courseId],
      });
    },
  });
};

export const useUpdateSettings = (courseId: string) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({
      thumbnailUrl,
      thumbnailId,
      fileName,
    }: {
      thumbnailUrl: string;
      thumbnailId: string;
      fileName: string;
    }) => {
      const result = await updateSettings({
        courseId,
        thumbnailUrl,
        thumbnailId,
        fileName,
      });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onMutate: async ({ thumbnailUrl, thumbnailId }) => {
      await queryClient.cancelQueries({
        queryKey: ["course-instructor", courseId],
      });

      const prev = queryClient.getQueryData<InstructorCourse>([
        "course-instructor",
        courseId,
      ]);

      queryClient.setQueryData<InstructorCourse>(
        ["course-instructor", courseId],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            thumbnail: thumbnailUrl,
            thumbnailId,
          };
        }
      );

      return { prev };
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Course settings updated successfully!",
        variant: "success",
      });
    },
    onError: (error, variables, context) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update course settings",
        variant: "destructive",
      });
      if (context?.prev) {
        queryClient.setQueryData(["course-instructor", courseId], context.prev);
      }
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["course-instructor", courseId],
      });
    },
  });
  return mutation;
};

export const useDeleteSection = (courseId: string) => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (sectionId: string) => {
      const result = await deleteSection({ courseId, sectionId });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onMutate: async (sectionId) => {
      await queryClient.cancelQueries({
        queryKey: ["course-instructor", courseId],
      });

      const prev = queryClient.getQueryData<InstructorCourse>([
        "course-instructor",
        courseId,
      ]);

      queryClient.setQueryData<InstructorCourse>(
        ["course-instructor", courseId],
        (oldData) => {
          if (!oldData) return oldData;
          const updatedSections = oldData.data.sections.filter(
            (section) => section.id !== sectionId
          );
          return { ...oldData, sections: updatedSections };
        }
      );

      return { prev };
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Section deleted successfully!",
        variant: "success",
      });
    },
    onError: (error, variables, context) => {
      toast({
        title: "Failed to delete",
        description: error.message || "Failed to delete section",
        variant: "destructive",
      });
      if (context?.prev) {
        queryClient.setQueryData(["course-instructor", courseId], context.prev);
      }
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["course-instructor", courseId],
      });
    },
  });
  return { ...mutation };
};

export const useUpdateSection = (courseId: string) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({
      title,
      description,
      sectionId,
    }: {
      title: string;
      description: string;
      sectionId: string;
    }) => {
      const result = await updateSection({
        courseId,
        title,
        description,
        sectionId,
      });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onMutate: async ({ title, description, sectionId }) => {
      await queryClient.cancelQueries({
        queryKey: ["course-instructor", courseId],
      });
      const prev = queryClient.getQueryData<InstructorCourse>([
        "course-instructor",
        courseId,
      ]);

      queryClient.setQueryData<InstructorCourse>(
        ["course-instructor", courseId],
        (oldData) => {
          if (!oldData) return oldData;
          const updatedSections = oldData.data.sections.map((section) => {
            if (section.id === sectionId) {
              return { ...section, title, description };
            }
            return section;
          });
          return { ...oldData, sections: updatedSections };
        }
      );

      return { prev };
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Section updated successfully!",
        variant: "success",
      });
    },
    onError: (error, variables, context) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update section",
        variant: "destructive",
      });
      if (context?.prev) {
        queryClient.setQueryData(["course-instructor", courseId], context.prev);
      }
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["course-instructor", courseId],
      });
    },
  });

  return { ...mutation };
};

export const useGetInstructorCourses = () => {
  return useQuery({
    queryKey: ["instructor-courses"],
    queryFn: getInstructorCourses,
    enabled: true,
  });
};

export const useInstructorPublish = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (courseId: string) => {
      const result = await publishCourse({ courseId });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onMutate: async (courseId) => {
      await queryClient.cancelQueries({
        queryKey: ["instructor-courses"],
      });

      const prev = queryClient.getQueryData<InstructorCourses>([
        "instructor-courses",
      ]);

      queryClient.setQueryData<InstructorCourses>(
        ["instructor-courses"],
        (oldData) => {
          if (!oldData) return oldData;

          const updatedCourses = oldData.data.map((course) => {
            if (course.id === courseId) {
              return { ...course, published: true };
            }
            return course;
          });
          return { ...oldData, data: updatedCourses };
        }
      );

      return { prev };
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Course published successfully!",
        variant: "success",
      });
    },
    onError: (error, variables, context) => {
      toast({
        title: "Error",
        description: error.message || "Failed to publish course",
        variant: "destructive",
      });
      if (context?.prev) {
        queryClient.setQueryData(["instructor-courses"], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["instructor-courses"],
      });
    },
  });
  return { ...mutation };
};
