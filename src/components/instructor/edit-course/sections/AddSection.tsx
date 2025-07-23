import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { sectionSchema } from "@/schemas/courseSchema";
import { createSection } from "@/services/instructor.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, TriangleAlert } from "lucide-react";
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-2xl font-semibold text-foreground">
          Create New Section
        </DialogTitle>
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
                  <FormLabel className="text-foreground">
                    Section Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter section title"
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
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Section"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
