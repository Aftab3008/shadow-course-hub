import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CourseLevels } from "@/constants/constants";
import { courseFormSchema } from "@/schemas/courseSchema";
import { createCourse } from "@/services/instructor.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CreateCategory from "./CreateCategory";
import { Category } from "@/types/category";
import { useState } from "react";

export default function CourseForm({
  categories,
  isLoadingCategories,
  refetch,
}: {
  categories?: Category[];
  isLoadingCategories: boolean;
  refetch: () => void;
}) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "BEGINNER",
      price: 1,
    },
  });

  const {
    getValues,
    setValue,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof courseFormSchema>) {
    try {
      const course = await createCourse({
        title: values.title,
        description: values.description,
        category: values.category,
        level: values.level,
        price: values.price,
      });
      if (course.success) {
        form.reset();
        navigate(`/instructor/edit-course/${course.data.id}`);
      } else {
        setError(course.message);
      }
    } catch (error) {
      setError(error.message || "Failed to create course");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm flex items-center gap-3 justify-center bg-red-300  bg-opacity-10 p-4 rounded-lg">
            <TriangleAlert className="inline mr-1" />
            {error}
          </div>
        )}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Course Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter course title"
                  className="bg-background border-border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief course description"
                  className="bg-background border-border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Category</FormLabel>
              <div className="flex gap-2">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  disabled={isLoadingCategories}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className="bg-background border-border flex-1"
                      value={field.value}
                    >
                      <SelectValue
                        placeholder={field.value || "Select category"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover border-border">
                    {categories && categories.length > 0 ? (
                      categories.map(({ name }) => (
                        <SelectItem key={name} value={name}>
                          {name[0].toUpperCase() + name.slice(1)}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No categories available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>

                <CreateCategory refetch={refetch} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-popover border-border">
                  {CourseLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Price ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="99.99"
                  className="bg-background border-border"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              <p>Creating...</p>
            </>
          ) : (
            "Create Course"
          )}
        </Button>
      </form>
    </Form>
  );
}
