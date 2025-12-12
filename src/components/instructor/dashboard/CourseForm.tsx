import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CourseLevels, CourseLanguages } from "@/constants/constants";
import { courseFormSchema } from "@/schemas/courseSchema";
import { createCourse } from "@/services/instructor.services";
import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  CheckCircle,
  DollarSign,
  FileText,
  Globe,
  Loader2,
  Plus,
  Star,
  Tag,
  Target,
  TriangleAlert,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CreateCategory from "./CreateCategory";

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
      briefDescription: "",
      category: "",
      level: "BEGINNER",
      language: "",
      price: 1,
      requirements: [],
      objectives: [],
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
        language: values.language,
        briefDescription: values.briefDescription,
        requirements: values.requirements,
        objectives: values.objectives,
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
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-8 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
              Create New Course
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1 text-sm sm:text-base">
              Fill in the details below to create your online course
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            {error && (
              <Alert
                variant="destructive"
                className="border-red-200 bg-red-50 dark:bg-red-950/20"
              >
                <TriangleAlert className="h-4 w-4" />
                <AlertDescription className="font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="lg:col-span-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                          <BookOpen className="h-4 w-4" />
                          Course Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Complete React Development Bootcamp"
                            className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-10 sm:h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="lg:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                          <FileText className="h-4 w-4" />
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a compelling description of your course that highlights what students will learn..."
                            className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors min-h-[80px] sm:min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="lg:col-span-2">
                  <FormField
                    control={form.control}
                    name="briefDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                          <FileText className="h-4 w-4" />
                          Course Brief Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a compelling brief description of your course..."
                            className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors min-h-[80px] sm:min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                        <Tag className="h-4 w-4" />
                        Category
                      </FormLabel>
                      <div className="flex gap-2">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          disabled={isLoadingCategories}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-10 sm:h-11 flex-1">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-popover border-border">
                            {categories && categories.length > 0 ? (
                              categories.map(({ name }) => (
                                <SelectItem key={name} value={name}>
                                  <div className="flex items-center gap-2">
                                    <Tag className="h-3 w-3" />
                                    {name[0].toUpperCase() + name.slice(1)}
                                  </div>
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
                      <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                        <Star className="h-4 w-4" />
                        Difficulty Level
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-10 sm:h-11">
                            <SelectValue placeholder="Select difficulty level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover border-border">
                          {CourseLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3" />
                                {level.label}
                              </div>
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
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                        <Globe className="h-4 w-4" />
                        Course Language
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-10 sm:h-11">
                            <SelectValue placeholder="Select course language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover border-border max-h-60">
                          {CourseLanguages.map((language) => (
                            <SelectItem
                              key={language.value}
                              value={language.value}
                            >
                              <div className="flex items-center gap-2">
                                <Globe className="h-3 w-3" />
                                {language.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-6 sm:my-8" />

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-primary" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Pricing
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                        <DollarSign className="h-4 w-4" />
                        Course Price (USD)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="99.99"
                            className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-10 sm:h-11 pl-10"
                            min="0"
                            step="0.01"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-end flex-col mb-1">
                  <Badge
                    variant="secondary"
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm"
                  >
                    💡 Competitive pricing helps attract more students
                  </Badge>
                </div>
              </div>
            </div>

            <Separator className="my-6 sm:my-8" />

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Course Structure
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                        <CheckCircle className="h-4 w-4" />
                        Prerequisites & Requirements
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Basic HTML knowledge, Computer with internet access"
                          className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors min-h-[60px] sm:min-h-[80px] resize-none"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(", ")
                              : field.value
                          }
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={(e) => {
                            const items = e.target.value
                              .split(",")
                              .map((req) => req.trim())
                              .filter(Boolean);
                            field.onChange(items);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="objectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                        <Target className="h-4 w-4" />
                        Learning Objectives
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Build modern web applications, Master React concepts"
                          className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors min-h-[60px] sm:min-h-[80px] resize-none"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(", ")
                              : field.value
                          }
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={(e) => {
                            const items = e.target.value
                              .split(",")
                              .map((obj) => obj.trim())
                              .filter(Boolean);
                            field.onChange(items);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-6 sm:my-8" />

            <div className="flex justify-center pt-4 sm:pt-6 w-full">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2 w-full justify-center">
                    <Loader2 className="animate-spin h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Creating Course...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full justify-center">
                    <Plus className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Create Course
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
