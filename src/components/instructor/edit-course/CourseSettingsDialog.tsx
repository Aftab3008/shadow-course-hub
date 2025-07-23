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
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CourseSettingsDialogProps {
  course: any;
  onSave: (updatedCourse: any) => void;
}

const CourseSettingsDialog = ({
  course,
  onSave,
}: CourseSettingsDialogProps) => {
  const [settings, setSettings] = useState({
    title: course.title,
    description: course.description,
    price: course.price,
    category: course.category,
    level: course.level,
    thumbnail: course.thumbnail,
    isPublished: course.status === "published",
    enableDiscounts: false,
    allowReviews: true,
    enableCertificate: true,
    maxStudents: 0,
    language: "english",
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    const updatedCourse = {
      ...course,
      ...settings,
      status: settings.isPublished ? "published" : "draft",
      thumbnail: thumbnailFile
        ? URL.createObjectURL(thumbnailFile)
        : settings.thumbnail,
    };

    onSave(updatedCourse);
    toast({
      title: "Settings Saved",
      description: "Course settings have been updated successfully.",
    });
  };

  return (
    <DialogContent className="max-w-2xl bg-popover border-border max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-foreground">Course Settings</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="courseTitle" className="text-foreground">
                Course Title
              </Label>
              <Input
                id="courseTitle"
                value={settings.title}
                onChange={(e) =>
                  setSettings({ ...settings, title: e.target.value })
                }
                className="bg-background border-border"
              />
            </div>

            <div>
              <Label htmlFor="coursePrice" className="text-foreground">
                Price ($)
              </Label>
              <Input
                id="coursePrice"
                type="number"
                value={settings.price}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    price: parseFloat(e.target.value),
                  })
                }
                className="bg-background border-border"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="courseDescription" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="courseDescription"
              value={settings.description}
              onChange={(e) =>
                setSettings({ ...settings, description: e.target.value })
              }
              className="bg-background border-border min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="courseCategory" className="text-foreground">
                Category
              </Label>
              <Select
                value={settings.category}
                onValueChange={(value) =>
                  setSettings({ ...settings, category: value })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="courseLevel" className="text-foreground">
                Level
              </Label>
              <Select
                value={settings.level}
                onValueChange={(value) =>
                  setSettings({ ...settings, level: value })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language" className="text-foreground">
                Language
              </Label>
              <Select
                value={settings.language}
                onValueChange={(value) =>
                  setSettings({ ...settings, language: value })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Course Thumbnail */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Course Thumbnail
          </h3>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={
                  thumbnailFile
                    ? URL.createObjectURL(thumbnailFile)
                    : settings.thumbnail
                }
                alt="Course thumbnail"
                className="w-32 h-20 object-cover rounded border"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                <Image className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="bg-background border-border"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Recommended size: 1280x720 pixels. Max file size: 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Publishing Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Publishing Options
          </h3>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings.isPublished}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, isPublished: checked as boolean })
                }
              />
              <Label className="text-foreground">
                Publish course (make it visible to students)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings.enableDiscounts}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    enableDiscounts: checked as boolean,
                  })
                }
              />
              <Label className="text-foreground">
                Enable promotional discounts
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings.allowReviews}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowReviews: checked as boolean })
                }
              />
              <Label className="text-foreground">
                Allow student reviews and ratings
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings.enableCertificate}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    enableCertificate: checked as boolean,
                  })
                }
              />
              <Label className="text-foreground">
                Provide completion certificate
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="maxStudents" className="text-foreground">
              Maximum Students (0 = unlimited)
            </Label>
            <Input
              id="maxStudents"
              type="number"
              value={settings.maxStudents}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxStudents: parseInt(e.target.value) || 0,
                })
              }
              className="bg-background border-border"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-border">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default CourseSettingsDialog;
