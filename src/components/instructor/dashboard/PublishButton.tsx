import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useInstructorPublish } from "@/hooks/Instructor";

export default function PublishButton({
  courseId,
  title,
}: {
  courseId: string;
  title: string;
}) {
  const { mutate: publishCourse, isPending } = useInstructorPublish();
  return (
    <AlertDialog>
      <Button size="sm" className="rounded-xl" asChild>
        <AlertDialogTrigger>Publish</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish {title}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to publish this course?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => publishCourse(courseId)}>
            {isPending ? "Publishing..." : "Publish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
