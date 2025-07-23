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
import { useUpdateSection } from "@/hooks/Instructor";
import { sectionSchema } from "@/schemas/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2, Plus, TriangleAlert } from "lucide-react";
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
        form.reset();
      }}
    >
      <Button variant="outline" size="sm" disabled={isPending} asChild>
        <DialogTrigger>
          <Edit className="h-4 w-4" />
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogTitle className="text-2xl font-semibold text-foreground">
          Update Section
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
            <Button type="submit" disabled={isLoading} className="w-full">
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  <span>Updating...</span>
                </div>
              ) : (
                "Update Section"
              )}
            </Button>
            <Button
              type="reset"
              className="w-full bg-gray-700"
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                form.reset({ title, description });
              }}
            >
              Reset
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
