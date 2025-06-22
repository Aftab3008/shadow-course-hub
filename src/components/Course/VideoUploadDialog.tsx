import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Upload, Video } from "lucide-react";

interface VideoUploadDialogProps {
  chapterId?: string;
  onSave: (data: any) => void;
}

const VideoUploadDialog = ({ chapterId, onSave }: VideoUploadDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    transcodeQuality: "1080p",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    // If it's a lesson (has chapterId), require video file
    if (chapterId && !selectedFile) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);

          const videoUrl = selectedFile
            ? URL.createObjectURL(selectedFile)
            : "";

          if (chapterId) {
            // Creating a lesson
            onSave({
              title: formData.title,
              description: formData.description,
              duration: formData.duration,
              videoUrl: videoUrl,
            });
          } else {
            // Creating a chapter
            onSave({
              title: formData.title,
              description: formData.description,
              lessons: [],
            });
          }

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <DialogContent className="max-w-lg bg-popover border-border">
      <DialogHeader>
        <DialogTitle className="text-foreground">
          {chapterId ? "Add New Lesson" : "Add New Chapter"}
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-foreground">
            {chapterId ? "Lesson Title" : "Chapter Title"}
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder={
              chapterId ? "Enter lesson title" : "Enter chapter title"
            }
            className="bg-background border-border"
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Brief description"
            className="bg-background border-border"
            required
          />
        </div>

        {chapterId && (
          <>
            <div>
              <Label htmlFor="duration" className="text-foreground">
                Duration
              </Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g. 15:30"
                className="bg-background border-border"
                required
              />
            </div>

            <div>
              <Label htmlFor="videoFile" className="text-foreground">
                Video File
              </Label>
              <Input
                id="videoFile"
                type="file"
                accept="video/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="bg-background border-border"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: MP4, MOV, AVI, MKV, M3U8
              </p>
            </div>

            <div>
              <Label htmlFor="transcodeQuality" className="text-foreground">
                Transcode Quality
              </Label>
              <Select
                value={formData.transcodeQuality}
                onValueChange={(value) =>
                  setFormData({ ...formData, transcodeQuality: value })
                }
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
                Higher quality videos take longer to process and require more
                storage
              </p>
            </div>
          </>
        )}

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Upload className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">
                {chapterId
                  ? "Uploading and transcoding video..."
                  : "Creating chapter..."}
              </span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-xs text-muted-foreground">
              {uploadProgress}% complete
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" disabled={isUploading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading
              ? "Processing..."
              : chapterId
              ? "Add Lesson"
              : "Add Chapter"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default VideoUploadDialog;
