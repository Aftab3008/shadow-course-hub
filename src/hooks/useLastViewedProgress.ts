import { useMutation } from "@tanstack/react-query";
import {
  saveLastViewedLesson,
  SaveLastViewedPayload,
} from "@/services/progressService";

/**
 * Hook to save last viewed lesson position
 * Used for async saves (React Query mutation with retry logic)
 */
export const useLastViewedProgress = () => {
  return useMutation({
    mutationFn: saveLastViewedLesson,
    onError: (error) => {
      console.error("Failed to save last viewed lesson:", error);
    },
    onSuccess: () => {
      console.log("Last viewed lesson saved successfully");
    },
  });
};
