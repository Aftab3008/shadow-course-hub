import { FileUpload } from "@/components/shared/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateSettings } from "@/hooks/Instructor";
import { useToast } from "@/hooks/use-toast";
import { getImageKitAuth } from "@/services/instructor.services";
import { upload } from "@imagekit/react";
import { Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface AdvancedSettingsProps {
  thumbnail?: string;
  isLoading?: boolean;
}

export default function AdvancedSettings({
  thumbnail,
  isLoading,
}: AdvancedSettingsProps) {
  const { courseId } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { mutateAsync: updateSettings } = useUpdateSettings(courseId);
  const abortController = new AbortController();

  const handleSaveSettings = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoadingResult(true);
    try {
      if (!file) {
        setError("Please select a file to upload.");
        return;
      }
      const { data } = await getImageKitAuth();

      if (!data) {
        throw new Error(
          "Something went wrong while uploading, please try again later."
        );
      }

      const { token, expire, signature, publicKey } = data;
      const filename = `${file.name}-${Date.now()}`;
      const uploadResponse = await upload({
        token,
        expire,
        signature,
        publicKey,
        file: file,
        fileName: filename,
        folder: `/thumbnails/${courseId}`,
        isPrivateFile: false,
        useUniqueFileName: true,
        abortSignal: abortController.signal,
        onProgress(event) {
          setProgress((event.loaded / event.total) * 100);
        },
      });
      const { url, fileId } = uploadResponse;
      const result = await updateSettings({
        thumbnailUrl: url,
        thumbnailId: fileId,
        fileName: file.name,
      });
      setProgress(0);
    } catch (error) {
      setError(error.message || "Failed to save settings");
      toast({
        title: "Error",
        description: error.message || "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setIsLoadingResult(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      {error && (
        <div className="text-red-500 text-sm flex items-center gap-3 justify-center bg-red-300  bg-opacity-10 p-4 rounded-lg">
          <TriangleAlert className="inline mr-1" />
          {error}
        </div>
      )}
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-6 flex flex-col gap-6">
            <div>
              <Label className="text-foreground">Course Thumbnail</Label>
              <div className="mt-2 flex items-center space-x-4">
                <Skeleton className="w-32 h-20 rounded" />
                <Skeleton className="w-24 h-8 rounded" />
              </div>
            </div>

            <div className="space-y-2 flex flex-col">
              <Label className="text-foreground">Default Video Quality</Label>
              <div className="mt-2">
                <Skeleton className="h-10 w-full rounded" />
              </div>
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-6">
              <Label className="text-foreground">Course Thumbnail</Label>
              {/* <div className="mt-2 flex items-center space-x-4 justify-center">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt="Course thumbnail"
                    className="w-32 h-20 object-cover rounded border"
                  />
                ) : (
                  <p className="text-muted-foreground">No thumbnail uploaded</p>
                )}

                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Thumbnail
                </Button>
                 <FileUploader
                  fieldChange={(file) => console.log("File uploaded:", file)}
                  mediaUrl={thumbnail}
                />
              </div> */}
            </div>
            <FileUpload thumbnail={thumbnail} file={file} setFile={setFile} />

            <div className="space-y-2 flex flex-col gap-6">
              <Label className="text-foreground">Default Video Quality</Label>
              <Select defaultValue="1080p">
                <SelectTrigger className="bg-background border-border mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="480p">480p (Standard)</SelectItem>
                  <SelectItem value="720p">720p (HD)</SelectItem>
                  <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                  <SelectItem value="1440p">1440p (2K)</SelectItem>
                  <SelectItem value="2160p">2160p (4K)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                This setting applies to new video uploads. Existing videos keep
                their current quality.
              </p>
            </div>
            {progress > 0 && (
              <div className="mt-2">
                <Progress value={progress} />
              </div>
            )}
            <Button
              className="w-full mt-4"
              onClick={handleSaveSettings}
              disabled={isLoadingResult}
            >
              {isLoadingResult ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
