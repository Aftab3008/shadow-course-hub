import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useInstructorCourse } from "@/hooks/Instructor";
import { uploadVideo } from "@/lib/imagekit";
import { lessonSchema } from "@/schemas/courseSchema";
import { addLessonToSection } from "@/services/instructor.services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from "@imagekit/react";
import {
  Loader2,
  Plus,
  TriangleAlert,
  PlayCircle,
  Save,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { VideoUpload } from "./VideoUpload";

export default function AddLesson({ sectionId }) {
  const { courseId } = useParams();
  const { refetch } = useInstructorCourse(courseId);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const abortController = new AbortController();

  const form = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      videoFile: null,
    },
  });

  const {
    formState: { isSubmitting },
    setValue,
    getValues,
  } = form;

  async function onSubmit(values: z.infer<typeof lessonSchema>) {
    try {
      setError(null);
      const { url, fileId, duration } = await uploadVideo({
        courseId,
        sectionId,
        file: values.videoFile,
        abortSignal: abortController.signal,
        setProgress,
      });
      const response = await addLessonToSection({
        courseId,
        sectionId,
        title: values.title,
        description: values.description,
        videoUrl: url,
        videoId: fileId,
        duration: duration,
        fileName: values.videoFile.name,
      });
      if (response.success) {
        setProgress(0);
        setError(null);
        form.reset();
        refetch();
        setOpen(false);
      } else {
        throw new Error(response.message || "Failed to create lesson");
      }
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        setError("Upload aborted by user");
      } else if (error instanceof ImageKitInvalidRequestError) {
        setError("Invalid request");
      } else if (error instanceof ImageKitUploadNetworkError) {
        setError("Network error");
      } else if (error instanceof ImageKitServerError) {
        setError("Server error");
      } else {
        setError(error.message || "Failed to create lesson");
      }
    }
  }

  const handleVideoSelect = (file: File) => {
    setValue("videoFile", file, { shouldValidate: true });
  };

  const handleVideoRemove = () => {
    setValue("videoFile", null, { shouldValidate: true });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          setError(null);
          setProgress(0);
          form.reset();
          abortController.abort();
        }
      }}
    >
      <Button
        variant="outline"
        className="w-full border-dashed border-2 h-12 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
        asChild
      >
        <DialogTrigger>
          <Plus className="mr-2 h-4 w-4" />
          Add Lesson
        </DialogTrigger>
      </Button>

      <DialogContent className="sm:max-w-[600px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-4 pb-6 px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <PlayCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground">
                  Add New Lesson
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  Create a new lesson with video content for your course
                  section.
                </DialogDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <TriangleAlert className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Lesson Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Introduction to useState Hook"
                            className="h-10 bg-background border-border focus:ring-2 focus:ring-primary/20 transition-all"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what students will learn in this lesson..."
                            className="min-h-[100px] bg-background border-border focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="videoFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Video File
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <VideoUpload
                              onVideoSelect={handleVideoSelect}
                              onRemove={handleVideoRemove}
                            />
                            {progress > 0 && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Upload Progress
                                  </span>
                                  <span className="font-medium">
                                    {Math.round(progress)}%
                                  </span>
                                </div>
                                <Progress
                                  value={progress}
                                  className="w-full h-2"
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Lesson
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
