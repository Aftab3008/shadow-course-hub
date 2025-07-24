import { getImageKitAuth } from "@/services/instructor.services";
import { uploadProps } from "@/types/imagekit";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
} from "@imagekit/react";

interface UploadOptions {
  courseId: string;
  sectionId: string;
  file: File;
  abortSignal?: AbortSignal;
  setProgress: (progress: number) => void;
}

export async function uploadVideo({
  courseId,
  sectionId,
  file,
  abortSignal,
  setProgress,
}: UploadOptions): Promise<uploadProps> {
  try {
    const { data } = await getImageKitAuth();

    if (!data) {
      throw new Error(
        "Something went wrong while uploading, please try again later."
      );
    }

    const { token, expire, signature, publicKey } = data;
    const filename = `${Date.now()}-${file.name}`;
    const response = await upload({
      token,
      expire,
      signature,
      publicKey,
      file: file,
      fileName: filename,
      folder: `/courses/${courseId}/sections/${sectionId}/lessons`,
      isPrivateFile: false,
      useUniqueFileName: true,
      abortSignal: abortSignal,
      onProgress(event) {
        setProgress((event.loaded / event.total) * 100);
      },
    });

    return {
      ...response,
    };
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      throw new Error("Upload was aborted.");
    } else if (error instanceof ImageKitInvalidRequestError) {
      throw new Error("Invalid request. Please check the file and try again.");
    } else if (error instanceof ImageKitServerError) {
      throw new Error("Server error occurred during upload.");
    } else if (error instanceof ImageKitUploadNetworkError) {
      throw new Error("Network error occurred during upload.");
    } else {
      throw new Error("An unexpected error occurred during upload.");
    }
  }
}

export async function uploadThumbnail({
  courseId,
  file,
  abortSignal,
  setProgress,
}: {
  courseId: string;
  file: File;
  abortSignal?: AbortSignal;
  setProgress: (progress: number) => void;
}): Promise<UploadResponse> {
  try {
    const { data } = await getImageKitAuth();

    if (!data) {
      throw new Error(
        "Something went wrong while uploading, please try again later."
      );
    }

    const { token, expire, signature, publicKey } = data;
    const filename = `${Date.now()}-${file.name}`;
    const response = await upload({
      token,
      expire,
      signature,
      publicKey,
      file: file,
      fileName: filename,
      folder: `/thumbnails/${courseId}`,
      isPrivateFile: false,
      useUniqueFileName: true,
      abortSignal: abortSignal,
      onProgress(event) {
        setProgress((event.loaded / event.total) * 100);
      },
    });

    return {
      ...response,
    };
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      throw new Error("Upload was aborted.");
    } else if (error instanceof ImageKitInvalidRequestError) {
      throw new Error("Invalid request. Please check the file and try again.");
    } else if (error instanceof ImageKitServerError) {
      throw new Error("Server error occurred during upload.");
    } else if (error instanceof ImageKitUploadNetworkError) {
      throw new Error("Network error occurred during upload.");
    } else {
      throw new Error("An unexpected error occurred during upload.");
    }
  }
}
