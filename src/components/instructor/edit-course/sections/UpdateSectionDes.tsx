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
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUpdateSection } from "@/hooks/Instructor";
import { sectionSchema } from "@/schemas/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Edit,
  Loader2,
  TriangleAlert,
  BookOpen,
  Save,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

export default function UpdateSectionDes({
  title,
  description,
  isPending,
  sectionId,
}: {
  title: string;
  description: string;
  isPending: boolean;
  sectionId: string;
}) {
  const { courseId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: updateSection, isPending: isUpdating } =
    useUpdateSection(courseId);

  const form = useForm<z.infer<typeof sectionSchema>>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const isLoading = isSubmitting || isUpdating || isPending;

  async function onSubmit(values: z.infer<typeof sectionSchema>) {
    const result = await updateSection({
      sectionId,
      title: values.title,
      description: values.description,
    });
    if (result.success) {
      setIsDialogOpen(false);
      form.reset();
    } else {
      setError(result.message || "Failed to update section");
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => {
        setIsDialogOpen(value);
        setError(null);
        form.reset({ title, description });
      }}
    >
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        asChild
        className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
      >
        <DialogTrigger>
          <Edit className="h-4 w-4" />
        </DialogTrigger>
      </Button>

      <DialogContent className="sm:max-w-[500px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-4 pb-6 px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground">
                  Edit Section
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  Update the section title and description to better organize
                  your course content.
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
                          Section Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Introduction to React Hooks"
                            className="h-10 bg-background border-border focus:ring-2 focus:ring-primary/20 transition-all"
                            {...field}
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
                            placeholder="Provide a brief description of what students will learn in this section..."
                            className="min-h-[100px] bg-background border-border focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-10 font-medium"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Update Section
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => form.reset({ title, description })}
                    className="h-10 px-4 font-medium hover:bg-muted/50 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
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
