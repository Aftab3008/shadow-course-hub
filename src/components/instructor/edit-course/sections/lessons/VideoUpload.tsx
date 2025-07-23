import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VideoIcon, X, Upload, Trash2, PlayCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useVideoUpload } from "@/hooks/useVideoUpload";

interface VideoUploadProps {
  onVideoSelect?: (file: File) => void;
  onRemove?: () => void;
  isSubmitting?: boolean;
}

export function VideoUpload({
  onVideoSelect,
  onRemove,
  isSubmitting,
}: VideoUploadProps) {
  const {
    previewUrl,
    fileName,
    file,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useVideoUpload({
    onUpload: (file) => onVideoSelect?.(file),
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type === "video/mp4") {
        // Pass the file directly to a method that handles the file instead of creating a fake event
        if (fileInputRef.current) {
          fileInputRef.current.files = e.dataTransfer.files;
          handleFileChange({
            target: fileInputRef.current,
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }
    },
    [handleFileChange, fileInputRef]
  );

  const onRemoveVideo = () => {
    handleRemove();
    onRemove?.();
  };

  return (
    <div className="w-full space-y-2">
      <Input
        type="file"
        accept="video/mp4"
        className="hidden"
        max={1}
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isSubmitting}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
            isDragging && "border-primary/50 bg-primary/5"
          )}
        >
          <div className="rounded-full bg-background p-2 shadow-sm">
            <VideoIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Click to select MP4 video</p>
            <p className="text-xs text-muted-foreground">
              or drag and drop here (max 100MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="group relative h-32 overflow-hidden rounded-lg border bg-black">
            <video
              src={previewUrl}
              className="h-full w-full object-cover"
              muted
              preload="metadata"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleThumbnailClick}
                className="h-8 w-8 p-0"
                disabled={isSubmitting}
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={onRemoveVideo}
                className="h-8 w-8 p-0"
                disabled={isSubmitting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {fileName && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{fileName}</span>
              <button
                onClick={onRemoveVideo}
                disabled={isSubmitting}
                className="ml-auto rounded-full p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
