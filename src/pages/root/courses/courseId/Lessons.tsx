import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils/utils";
import { Clock, Lock, Play } from "lucide-react";

export default function Lessons({
  title,
  duration,
  isPreview = false,
}: {
  title: string;
  duration: number;
  isPreview?: boolean;
}) {
  return (
    <div className="group flex items-center justify-between p-4 hover:bg-muted/70 rounded-lg transition-all duration-200 border border-transparent hover:border-border cursor-pointer">
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-shrink-0">
          {isPreview ? (
            <div className="p-2 bg-green-100 rounded-full">
              <Play className="h-4 w-4 text-green-600" />
            </div>
          ) : (
            <div className="p-2 bg-muted rounded-full">
              <Lock className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-foreground font-medium truncate group-hover:text-primary transition-colors duration-200">
              {title}
            </span>
            <Badge
              variant="outline"
              className="text-xs flex-shrink-0 bg-blue-50 text-blue-600 border-blue-200"
            >
              Video
            </Badge>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatTime(duration)}</span>
            {isPreview && (
              <span className="text-green-600 font-medium">• Free Preview</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        {isPreview ? (
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            Preview
          </Button>
        ) : (
          <div className="w-6 h-6 flex items-center justify-center">
            <Lock className="h-3 w-3 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
