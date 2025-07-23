import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useInstructorCourse } from "@/hooks/Instructor";
import { lessonSchema } from "@/schemas/courseSchema";
import {
  addLessonToSection,
  getImageKitAuth,
} from "@/services/instructor.services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
} from "@imagekit/react";
import { Loader2, Plus, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { VideoUpload } from "./VideoUpload";

interface uploadProps extends UploadResponse {
  duration?: number;
}

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
      const { data } = await getImageKitAuth();

      if (!data) {
        throw new Error(
          "Something went wrong while uploading, please try again later."
        );
      }

      const { token, expire, signature, publicKey } = data;
      const filename = `${values.videoFile.name}-${Date.now()}`;
      const uploadResponse: uploadProps = await upload({
        token,
        expire,
        signature,
        publicKey,
        file: values.videoFile,
        fileName: filename,
        folder: `/courses/${courseId}/sections/${sectionId}/lessons`,
        isPrivateFile: false,
        useUniqueFileName: true,
        abortSignal: abortController.signal,
        onProgress(event) {
          setProgress((event.loaded / event.total) * 100);
        },
      });
      const { url, fileId } = uploadResponse;
      const duration = uploadResponse.duration;
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
        setValue("title", "");
        setValue("description", "");
        setValue("videoFile", null);
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
      onOpenChange={() => {
        setOpen(!open);
        setError(null);
        setProgress(0);
        form.reset();
      }}
    >
      <Button
        variant="outline"
        className="w-full border-dashed border-2"
        asChild
      >
        <DialogTrigger>
          <Plus className="mr-2 h-4 w-4" />
          Add Lesson
        </DialogTrigger>
      </Button>
      <DialogContent className="max-w-lg bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Lesson</DialogTitle>
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
                    <FormLabel className="text-foreground">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter lesson title"
                        className="bg-background border-border"
                        {...field}
                        disabled={isSubmitting}
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
                    <FormLabel className="text-foreground">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief course description"
                        className="bg-background border-border"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Video File
                    </FormLabel>
                    <FormControl>
                      <VideoUpload
                        onVideoSelect={handleVideoSelect}
                        onRemove={handleVideoRemove}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {progress > 0 && (
                <Progress
                  value={progress}
                  className="w-full h-2 bg-primary mt-2"
                />
              )}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    <p>Creating...</p>
                  </>
                ) : (
                  "Create Lesson"
                )}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
