import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useInstructorCourse } from "@/hooks/Instructor";
import { useToast } from "@/hooks/use-toast";
import { deleteLesson } from "@/services/instructor.services";
import { Lesson } from "@/types/course";
import { formatDuration } from "@/utils/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Loader2, Trash2, Video } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface LessonCardProps {
  lesson: Lesson;
  sectionId: string;
}

export default function LessonCard({ lesson, sectionId }: LessonCardProps) {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    setNodeRef,
    listeners,
    isDragging,
    attributes,
    transform,
    transition,
  } = useSortable({
    id: lesson.id,
    data: {
      type: "lesson",
      sectionId,
      lessonId: lesson.id,
      order: lesson.order,
    },
  });
  const { refetch } = useInstructorCourse(courseId);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDeleteLesson = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);
    if (!courseId || !sectionId) {
      toast({
        title: "Error",
        description: "Course or Section ID is missing.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    try {
      await deleteLesson({
        courseId,
        sectionId,
        lessonId: lesson.id,
      });
      toast({
        title: "Lesson Deleted",
        description: "The lesson has been successfully deleted.",
        variant: "success",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error Deleting Lesson",
        description: error.message || "Failed to delete lesson.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50"
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-center space-x-3 flex-1">
        <GripVertical
          className="h-4 w-4 text-muted-foreground cursor-move"
          {...listeners}
          {...attributes}
        />

        <div className="flex items-center space-x-2">
          {lesson.fileName ? (
            <Video className="h-4 w-4 text-primary" />
          ) : (
            <Video className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-medium text-foreground">{lesson.title}</h4>
          <p className="text-sm text-muted-foreground">{lesson.description}</p>
          <div className="flex items-center space-x-4 mt-1">
            {lesson.fileName && (
              <span className="text-xs text-muted-foreground">
                {lesson.fileName}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              Duration: {formatDuration(lesson.duration)}
            </span>
            <span className="text-xs text-muted-foreground">
              {lesson.fileName ? "Video uploaded" : "No video"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* <Dialog open={isVideoUploadOpen} onOpenChange={setIsVideoUploadOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-popover border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Upload Video
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="videoFile" className="text-foreground">
                  Video File
                </Label>
                <Input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={(e) => {}}
                  className="bg-background border-border"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: MP4, MOV, AVI, MKV
                </p>
              </div>

              <div>
                <Label htmlFor="transcodeQuality" className="text-foreground">
                  Transcode Quality
                </Label>
                <Select
                  value={transcodeQuality}
                  onValueChange={setTranscodeQuality}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="480p">
                      480p (Standard Definition)
                    </SelectItem>
                    <SelectItem value="720p">720p (HD)</SelectItem>
                    <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                    <SelectItem value="1440p">1440p (2K)</SelectItem>
                    <SelectItem value="2160p">2160p (4K)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Higher quality videos take longer to process
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsVideoUploadOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleVideoUpload}>Upload & Transcode</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog> */}

        {/*<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-popover border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Edit Lesson</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="lessonTitle" className="text-foreground">
                  Lesson Title
                </Label>
                <Input
                  id="lessonTitle"
                  value={editedLesson.title}
                  onChange={(e) =>
                    setEditedLesson({ ...editedLesson, title: e.target.value })
                  }
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="lessonDescription" className="text-foreground">
                  Description
                </Label>
                <Textarea
                  id="lessonDescription"
                  value={editedLesson.description}
                  onChange={(e) =>
                    setEditedLesson({
                      ...editedLesson,
                      description: e.target.value,
                    })
                  }
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="lessonDuration" className="text-foreground">
                  Duration
                </Label>
                <Input
                  id="lessonDuration"
                  value={editedLesson.duration}
                  onChange={(e) =>
                    setEditedLesson({
                      ...editedLesson,
                      duration: e.target.value,
                    })
                  }
                  placeholder="e.g. 15:30"
                  className="bg-background border-border"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveLesson}>Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog> */}

        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteLesson}
          className="text-destructive hover:text-red-500"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}
