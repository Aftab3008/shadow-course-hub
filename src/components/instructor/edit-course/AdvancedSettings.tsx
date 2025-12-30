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
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { m } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="shadow-xl border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="space-y-4 pb-8 px-4 sm:px-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shrink-0">
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

        <CardContent className="px-4 sm:px-6 pb-8 pt-6">
          {error && (
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert
                variant="destructive"
                className="border-red-200 bg-red-50 dark:bg-red-950/20 mb-6"
              >
                <TriangleAlert className="h-4 w-4" />
                <AlertDescription className="font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            </m.div>
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
              {/* Thumbnail Section */}
              <m.div variants={itemVariants}>
                <Card className="border-border/50 bg-gradient-to-br from-pink-500/5 to-rose-500/5 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="pt-6 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20">
                        <Image className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                      </div>
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
                  </CardContent>
                </Card>
              </m.div>

              {/* Video Settings Section */}
              <m.div variants={itemVariants}>
                <Card className="border-border/50 bg-gradient-to-br from-orange-500/5 to-amber-500/5 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="pt-6 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20">
                        <Video className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
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
                        <SelectTrigger className="bg-background border-border hover:border-primary/50 focus:border-primary transition-all duration-200 h-10 sm:h-11 focus:ring-2 focus:ring-primary/20">
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

                      <Badge
                        variant="secondary"
                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20"
                      >
                        <Sparkles className="h-3 w-3 mr-1 inline" />
                        This setting applies to new video uploads. Existing
                        videos keep their quality.
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </m.div>

              {/* Save Button */}
              <m.div variants={itemVariants} className="pt-4">
                <Button
                  onClick={handleSaveSettings}
                  disabled={isLoadingResult || !file}
                  className="w-full text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary hover:scale-[1.02] active:scale-[0.98] h-12 sm:h-14"
                >
                  {isLoadingResult ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      <span>Saving Settings...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      <span>Save Settings</span>
                      <Sparkles className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </m.div>
            </div>
          )}
        </CardContent>
      </Card>
    </m.div>
  );
}
