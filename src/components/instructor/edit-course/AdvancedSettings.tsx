import { FileUpload } from "@/components/shared/FileUpload";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateSettings } from "@/hooks/Instructor";
import { useToast } from "@/hooks/use-toast";
import { uploadThumbnail } from "@/lib/imagekit";
import {
  Image,
  Loader2,
  Save,
  Settings,
  TriangleAlert,
  Video,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface AdvancedSettingsProps {
  thumbnail?: string;
  isLoading?: boolean;
  videoQuality?: string;
}

export default function AdvancedSettings({
  thumbnail,
  isLoading,
  videoQuality = "1080p",
}: AdvancedSettingsProps) {
  const { courseId } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [selectedVideoQuality, setSelectedVideoQuality] =
    useState(videoQuality);
  const { toast } = useToast();
  const { mutateAsync: updateSettings } = useUpdateSettings(courseId!);
  const abortController = new AbortController();

  const handleSaveSettings = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoadingResult(true);
    setError(null);

    try {
      if (!file) {
        setError("Please select a thumbnail image to upload.");
        return;
      }

      const { url, fileId } = await uploadThumbnail({
        courseId,
        file,
        abortSignal: abortController.signal,
        setProgress,
      });

      await updateSettings({
        thumbnailUrl: url,
        thumbnailId: fileId,
        fileName: file.name,
      });

      setProgress(0);
      setFile(null);

      toast({
        title: "Success",
        description: "Course settings updated successfully!",
        variant: "success",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Failed to save settings";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoadingResult(false);
    }
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-8 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
              Advanced Settings
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1 text-sm sm:text-base">
              Configure your course appearance and video settings
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-8">
        {error && (
          <Alert
            variant="destructive"
            className="border-red-200 bg-red-50 dark:bg-red-950/20 mb-6"
          >
            <TriangleAlert className="h-4 w-4" />
            <AlertDescription className="font-medium">{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-32 h-20 rounded-lg" />
                  <Skeleton className="w-24 h-10 rounded" />
                </div>
              </div>
            </div>

            <Skeleton className="h-px w-full" />

            {/* Video Quality Section Skeleton */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-11 w-full rounded" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Image className="h-5 w-5 text-primary" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Course Thumbnail
                </h3>
              </div>

              <div className="space-y-4">
                <Label className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                  <Image className="h-4 w-4" />
                  Thumbnail Image
                </Label>

                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <FileUpload
                    thumbnail={thumbnail}
                    file={file}
                    setFile={setFile}
                  />
                </div>

                {file && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="px-3 py-1">
                      📁 {file.name}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Badge>
                  </div>
                )}

                {progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Uploading...
                      </span>
                      <span className="font-medium">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-6 sm:my-8" />

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Video className="h-5 w-5 text-primary" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Video Settings
                </h3>
              </div>

              <div className="space-y-4">
                <Label className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                  <Zap className="h-4 w-4" />
                  Default Video Quality
                </Label>

                <Select
                  value={selectedVideoQuality}
                  onValueChange={setSelectedVideoQuality}
                >
                  <SelectTrigger className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-10 sm:h-11">
                    <SelectValue placeholder="Select video quality" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="480p">
                      <div className="flex items-center gap-2">
                        <Video className="h-3 w-3" />
                        480p (Standard)
                      </div>
                    </SelectItem>
                    <SelectItem value="720p">
                      <div className="flex items-center gap-2">
                        <Video className="h-3 w-3" />
                        720p (HD)
                      </div>
                    </SelectItem>
                    <SelectItem value="1080p">
                      <div className="flex items-center gap-2">
                        <Video className="h-3 w-3" />
                        1080p (Full HD) - Recommended
                      </div>
                    </SelectItem>
                    <SelectItem value="1440p">
                      <div className="flex items-center gap-2">
                        <Video className="h-3 w-3" />
                        1440p (2K)
                      </div>
                    </SelectItem>
                    <SelectItem value="2160p">
                      <div className="flex items-center gap-2">
                        <Video className="h-3 w-3" />
                        2160p (4K)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    💡 <strong>Note:</strong> This setting applies to new video
                    uploads. Existing videos will keep their current quality
                    settings.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6 sm:my-8" />

            <div className="flex justify-center pt-4 sm:pt-6 w-full">
              <Button
                onClick={handleSaveSettings}
                disabled={isLoadingResult || !file}
                className="w-full  text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              >
                {isLoadingResult ? (
                  <>
                    <Loader2 className="animate-spin h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Saving Settings...
                  </>
                ) : (
                  <>
                    <Save className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
