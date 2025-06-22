import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Video,
  ChevronDown,
  ChevronRight,
  Upload,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VideoUploadDialog from "./VideoUploadDialog";
import LessonItem from "./LessonItem";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  order: number;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

interface ChapterManagerProps {
  chapters: Chapter[];
  onChaptersUpdate: (chapters: Chapter[]) => void;
}

const ChapterManager = ({
  chapters,
  onChaptersUpdate,
}: ChapterManagerProps) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set()
  );
  const [isVideoUploadOpen, setIsVideoUploadOpen] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [draggedChapter, setDraggedChapter] = useState<string | null>(null);
  const { toast } = useToast();

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const moveChapter = (chapterId: string, direction: "up" | "down") => {
    const currentIndex = chapters.findIndex((c) => c.id === chapterId);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === chapters.length - 1)
    ) {
      return;
    }

    const newChapters = [...chapters];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Swap chapters
    [newChapters[currentIndex], newChapters[targetIndex]] = [
      newChapters[targetIndex],
      newChapters[currentIndex],
    ];

    // Update order numbers
    newChapters.forEach((chapter, index) => {
      chapter.order = index + 1;
    });

    onChaptersUpdate(newChapters);
    toast({
      title: "Chapter Moved",
      description: `Chapter moved ${direction} successfully.`,
    });
  };

  const deleteChapter = (chapterId: string) => {
    const updatedChapters = chapters
      .filter((c) => c.id !== chapterId)
      .map((chapter, index) => ({ ...chapter, order: index + 1 }));

    onChaptersUpdate(updatedChapters);
    toast({
      title: "Chapter Deleted",
      description: "Chapter has been removed from the course.",
    });
  };

  const addLesson = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setIsVideoUploadOpen(true);
  };

  const updateLessons = (chapterId: string, updatedLessons: Lesson[]) => {
    const updatedChapters = chapters.map((chapter) =>
      chapter.id === chapterId
        ? { ...chapter, lessons: updatedLessons }
        : chapter
    );
    onChaptersUpdate(updatedChapters);
  };

  const handleDragStart = (e: React.DragEvent, chapterId: string) => {
    setDraggedChapter(chapterId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetChapterId: string) => {
    e.preventDefault();

    if (!draggedChapter || draggedChapter === targetChapterId) {
      setDraggedChapter(null);
      return;
    }

    const draggedIndex = chapters.findIndex((c) => c.id === draggedChapter);
    const targetIndex = chapters.findIndex((c) => c.id === targetChapterId);

    const newChapters = [...chapters];
    const [draggedItem] = newChapters.splice(draggedIndex, 1);
    newChapters.splice(targetIndex, 0, draggedItem);

    // Update order numbers
    newChapters.forEach((chapter, index) => {
      chapter.order = index + 1;
    });

    onChaptersUpdate(newChapters);
    setDraggedChapter(null);

    toast({
      title: "Chapter Reordered",
      description: "Chapters have been reordered successfully.",
    });
  };

  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <Card
          key={chapter.id}
          className="border-border bg-card"
          draggable
          onDragStart={(e) => handleDragStart(e, chapter.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, chapter.id)}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="cursor-move">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>

                <Collapsible>
                  <CollapsibleTrigger
                    onClick={() => toggleChapter(chapter.id)}
                    className="flex items-center space-x-2 hover:text-primary"
                  >
                    {expandedChapters.has(chapter.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                </Collapsible>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    Chapter {chapter.order}: {chapter.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {chapter.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {chapter.lessons.length} lesson
                      {chapter.lessons.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveChapter(chapter.id, "up")}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveChapter(chapter.id, "down")}
                  disabled={index === chapters.length - 1}
                >
                  ↓
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteChapter(chapter.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <Collapsible open={expandedChapters.has(chapter.id)}>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {chapter.lessons.map((lesson) => (
                    <LessonItem
                      key={lesson.id}
                      lesson={lesson}
                      chapterId={chapter.id}
                      onLessonsUpdate={(updatedLessons) =>
                        updateLessons(chapter.id, updatedLessons)
                      }
                      allLessons={chapter.lessons}
                    />
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => addLesson(chapter.id)}
                    className="w-full border-dashed"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}

      <Dialog open={isVideoUploadOpen} onOpenChange={setIsVideoUploadOpen}>
        <VideoUploadDialog
          chapterId={selectedChapterId}
          onSave={(lessonData) => {
            // Handle lesson creation
            const targetChapter = chapters.find(
              (c) => c.id === selectedChapterId
            );
            if (targetChapter) {
              const newLesson = {
                id: `${selectedChapterId}-${Date.now()}`,
                ...lessonData,
                order: targetChapter.lessons.length + 1,
              };
              updateLessons(selectedChapterId, [
                ...targetChapter.lessons,
                newLesson,
              ]);
            }
            setIsVideoUploadOpen(false);
            toast({
              title: "Lesson Added!",
              description: "New lesson has been added to the chapter.",
            });
          }}
        />
      </Dialog>
    </div>
  );
};

export default ChapterManager;
