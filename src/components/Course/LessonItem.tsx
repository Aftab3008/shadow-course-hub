
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Edit, 
  Trash2, 
  GripVertical,
  Video,
  Play,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  order: number;
}

interface LessonItemProps {
  lesson: Lesson;
  chapterId: string;
  onLessonsUpdate: (lessons: Lesson[]) => void;
  allLessons: Lesson[];
}

const LessonItem = ({ lesson, chapterId, onLessonsUpdate, allLessons }: LessonItemProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isVideoUploadOpen, setIsVideoUploadOpen] = useState(false);
  const [editedLesson, setEditedLesson] = useState(lesson);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transcodeQuality, setTranscodeQuality] = useState("1080p");
  const { toast } = useToast();

  const moveLesson = (direction: 'up' | 'down') => {
    const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === allLessons.length - 1)
    ) {
      return;
    }

    const newLessons = [...allLessons];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    [newLessons[currentIndex], newLessons[targetIndex]] = 
    [newLessons[targetIndex], newLessons[currentIndex]];
    
    newLessons.forEach((l, index) => {
      l.order = index + 1;
    });

    onLessonsUpdate(newLessons);
    toast({
      title: "Lesson Moved",
      description: `Lesson moved ${direction} successfully.`,
    });
  };

  const deleteLesson = () => {
    const updatedLessons = allLessons
      .filter(l => l.id !== lesson.id)
      .map((l, index) => ({ ...l, order: index + 1 }));
    
    onLessonsUpdate(updatedLessons);
    toast({
      title: "Lesson Deleted",
      description: "Lesson has been removed from the chapter.",
    });
  };

  const saveLesson = () => {
    const updatedLessons = allLessons.map(l => 
      l.id === lesson.id ? editedLesson : l
    );
    onLessonsUpdate(updatedLessons);
    setIsEditOpen(false);
    toast({
      title: "Lesson Updated",
      description: "Lesson details have been saved.",
    });
  };

  const handleVideoUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a video file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Simulate video upload and transcoding
    const simulatedUrl = URL.createObjectURL(selectedFile);
    const updatedLesson = { ...editedLesson, videoUrl: simulatedUrl };
    const updatedLessons = allLessons.map(l => 
      l.id === lesson.id ? updatedLesson : l
    );
    
    onLessonsUpdate(updatedLessons);
    setIsVideoUploadOpen(false);
    setSelectedFile(null);
    
    toast({
      title: "Video Uploaded",
      description: `Video uploaded and transcoded to ${transcodeQuality}.`,
    });
  };

  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
      <div className="flex items-center space-x-3 flex-1">
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
        
        <div className="flex items-center space-x-2">
          {lesson.videoUrl ? (
            <Video className="h-4 w-4 text-primary" />
          ) : (
            <Video className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-medium text-foreground">{lesson.title}</h4>
          <p className="text-sm text-muted-foreground">{lesson.description}</p>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-xs text-muted-foreground">
              Duration: {lesson.duration}
            </span>
            <span className="text-xs text-muted-foreground">
              {lesson.videoUrl ? 'Video uploaded' : 'No video'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => moveLesson('up')}
          disabled={currentIndex === 0}
        >
          ↑
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => moveLesson('down')}
          disabled={currentIndex === allLessons.length - 1}
        >
          ↓
        </Button>

        <Dialog open={isVideoUploadOpen} onOpenChange={setIsVideoUploadOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-popover border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Upload Video</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="videoFile" className="text-foreground">Video File</Label>
                <Input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="bg-background border-border"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: MP4, MOV, AVI, MKV
                </p>
              </div>

              <div>
                <Label htmlFor="transcodeQuality" className="text-foreground">Transcode Quality</Label>
                <Select value={transcodeQuality} onValueChange={setTranscodeQuality}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="480p">480p (Standard Definition)</SelectItem>
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
                <Button variant="outline" onClick={() => setIsVideoUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleVideoUpload}>
                  Upload & Transcode
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
                <Label htmlFor="lessonTitle" className="text-foreground">Lesson Title</Label>
                <Input
                  id="lessonTitle"
                  value={editedLesson.title}
                  onChange={(e) => setEditedLesson({ ...editedLesson, title: e.target.value })}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="lessonDescription" className="text-foreground">Description</Label>
                <Textarea
                  id="lessonDescription"
                  value={editedLesson.description}
                  onChange={(e) => setEditedLesson({ ...editedLesson, description: e.target.value })}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="lessonDuration" className="text-foreground">Duration</Label>
                <Input
                  id="lessonDuration"
                  value={editedLesson.duration}
                  onChange={(e) => setEditedLesson({ ...editedLesson, duration: e.target.value })}
                  placeholder="e.g. 15:30"
                  className="bg-background border-border"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveLesson}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button 
          variant="outline" 
          size="sm"
          onClick={deleteLesson}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LessonItem;
