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
import { useCategories } from "@/hooks/Category";
import { useUpdateCourseDetails } from "@/hooks/Instructor";
import { courseDetailsSchema } from "@/schemas/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  CheckCircle,
  DollarSign,
  FileText,
  Globe,
  Loader2,
  RotateCcw,
  Save,
  Star,
  Tag,
  Target,
  TriangleAlert,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import z from "zod";

export default function CourseDetailsForm({
  title,
  price,
  description,
  briefDescription,
  requirements,
  objectives,
  language,
  category,
  level,
}: {
  title: string;
  price: number;
  description: string;
  briefDescription: string;
  requirements: string[];
  objectives: string[];
  language: string;
  category: { name: string };
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}) {
  const { courseId } = useParams();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { mutateAsync: updateDetails, isPending: isSubmitting } =
    useUpdateCourseDetails(courseId!);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof courseDetailsSchema>>({
    resolver: zodResolver(courseDetailsSchema),
    defaultValues: {
      title,
      price,
      description,
      category: { name: category.name.toLowerCase() },
      level: level,
      briefDescription,
      requirements,
      objectives,
      language,
    },
  });

  const onSubmit = async (values: z.infer<typeof courseDetailsSchema>) => {
    try {
      setError(null);
      await updateDetails({
        title: values.title,
        price: values.price,
        description: values.description,
        briefDescription: values.briefDescription,
        requirements: values.requirements,
        objectives: values.objectives,
        language: values.language,
        category: { name: values.category.name },
        level: values.level,
      });
    } catch (error: any) {
      setError(error.message || "Failed to update course details");
    }
  };

  const handleReset = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset({
      title,
      price,
      description,
      briefDescription,
      requirements,
      objectives,
      language,
      category: { name: category.name },
      level: level,
    });
    setError(null);
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-8 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
              Edit Course Details
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1 text-sm sm:text-base">
              Update your course information and settings
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

            {/* Basic Information Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                          {...field}
                          placeholder="Enter course title"
                          className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-10 sm:h-11"
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
                      <FormLabel className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                        <DollarSign className="h-4 w-4" />
                        Course Price (USD)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="number"
                            placeholder="99.99"
                            className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-10 sm:h-11 pl-10"
                            min="0"
                            step="0.01"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            {...field}
                            placeholder="Provide a compelling description of your course that highlights what students will learn..."
                            className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors min-h-[80px] sm:min-h-[100px] resize-none"
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
                          Brief Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Provide a compelling brief description of your course..."
                            className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors min-h-[60px] sm:min-h-[80px] resize-none"
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
                      <Select
                        onValueChange={(value) => {
                          field.onChange({ name: value });
                        }}
                        value={field.value.name}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-10 sm:h-11">
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
                        value={field.value}
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

            {/* Course Structure Section */}
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
                          value={field.value.join(", ")}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                .split(",")
                                .map((req) => req.trim())
                                .filter(Boolean)
                            )
                          }
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
                          value={field.value.join(", ")}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                .split(",")
                                .map((obj) => obj.trim())
                                .filter(Boolean)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-6 sm:my-8" />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-11 sm:h-12 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex-1 sm:flex-none sm:min-w-[160px] h-11 sm:h-12 text-sm sm:text-base font-medium border-border hover:bg-muted/50 transition-colors"
              >
                <RotateCcw className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                Reset Details
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
