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
import { sectionSchema } from "@/schemas/courseSchema";
import { createSection } from "@/services/instructor.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, TriangleAlert, BookOpen, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddSection({
  refetch,
  courseId,
}: {
  refetch: () => void;
  courseId: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof sectionSchema>>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof sectionSchema>) {
    try {
      setError(null);
      const section = await createSection({
        courseId: courseId,
        title: values.title,
        description: values.description,
      });
      if (section.success) {
        form.reset();
        refetch();
        setIsDialogOpen(false);
      } else {
        setError(section.message);
      }
    } catch (error) {
      setError(error.message || "Failed to create section");
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => {
        setIsDialogOpen(value);
        if (!value) {
          setError(null);
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="h-10 px-4 font-medium shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-4 pb-6 px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground">
                  Create New Section
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  Add a new section to organize your course content effectively.
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
                            placeholder="e.g., Introduction to React Fundamentals"
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
                            placeholder="Describe what students will learn in this section..."
                            className="min-h-[100px] bg-background border-border focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            {...field}
                          />
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
                        Create Section
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
