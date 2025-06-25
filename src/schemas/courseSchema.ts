import { z } from "zod";

export const courseFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  category: z.enum(
    ["programming", "design", "business", "marketing", "photography", "music"],
    {
      required_error: "Category is required",
    }
  ),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Level is required",
  }),
  price: z
    .number()
    .min(0, "Price must be positive")
    .max(999.99, "Price must be less than $1000"),
});

export const chapterFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description must be less than 300 characters"),
  order: z.number().min(1, "Order must be at least 1"),
});

export const lessonFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description must be less than 300 characters"),
  duration: z.string().min(1, "Duration is required"),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  order: z.number().min(1, "Order must be at least 1"),
});

export type CourseFormData = z.infer<typeof courseFormSchema>;
export type ChapterFormData = z.infer<typeof chapterFormSchema>;
export type LessonFormData = z.infer<typeof lessonFormSchema>;
