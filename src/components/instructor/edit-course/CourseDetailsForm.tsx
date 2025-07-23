import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useCategories } from "@/hooks/Category";
import { useUpdateCourseDetails } from "@/hooks/Instructor";
import { courseDetailsSchema } from "@/schemas/courseSchema";
import { CourseLevel } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import z from "zod";

export default function CourseDetailsForm({
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
}) {
  const { courseId } = useParams();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { mutateAsync: updateDetails } = useUpdateCourseDetails(courseId);
  const form = useForm<z.infer<typeof courseDetailsSchema>>({
    resolver: zodResolver(courseDetailsSchema),
    defaultValues: {
      title,
      price,
      description,
      category: { name: category.name.toLowerCase() },
      level: level,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (values: z.infer<typeof courseDetailsSchema>) => {
    const { title, price, description, category, level } = values;
    const result = await updateDetails({
      title,
      price,
      description,
      category: { name: category.name },
      level,
    });
  };

  const handleReset = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset({
      title,
      price,
      description,
      category: { name: category.name },
      level: level,
    });
  };

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Course Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background border-border"
                        placeholder="Enter course title"
                      />
                    </FormControl>
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
                        {...field}
                        type="number"
                        className="bg-background border-border"
                        placeholder="0.00"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="bg-background border-border min-h-[120px]"
                      placeholder="Enter course description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Category</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange({ name: value });
                      }}
                      value={field.value.name}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border">
                        {isLoadingCategories ? (
                          <SelectItem value="loading" disabled>
                            Loading categories...
                          </SelectItem>
                        ) : categories && categories.data.length > 0 ? (
                          categories.data.map(({ name }) => (
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              type="reset"
              className="w-full bg-gray-700"
              variant="outline"
              onClick={handleReset}
            >
              Reset Details
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
