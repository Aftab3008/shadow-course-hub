import { cn } from "@/lib/utils";
import { m } from "framer-motion";
import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FileUpload = ({
  thumbnail,
  file,
  setFile,
}: {
  thumbnail?: string;
  file?: File | null;
  setFile?: (file: File) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(thumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    const img = newFiles[0];
    if (!img) return;
    setFile(img);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/svg+xml": [],
    },
    onDrop: handleFileChange,
    onDropRejected: (errors) => console.warn(errors),
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <m.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden border border-dashed border-primary"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.svg"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        {/* <div className="absolute inset-0 bg-background rounded-lg overflow-hidden">
          <GridPattern />
        </div> */}
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-white text-base">
            Upload image
          </p>
          <p className="relative z-20 font-sans font-normal text-white text-base mt-2 text-opacity-80">
            Drag or drop an image here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {preview ? (
              <m.div
                className="relative overflow-hidden z-40 flex items-center justify-center md:h-full h-48 w-full mx-auto rounded-md shadow-sm flex-col gap-6"
                layoutId="file-upload"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="object-contain w-full h-full"
                />
                {file && (
                  <m.div
                    className={cn(
                      "relative overflow-hidden z-40 bg-neutral-800 flex flex-col items-start justify-center md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                      "shadow-sm"
                    )}
                  >
                    <div className="flex justify-between w-full items-center gap-4">
                      <m.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-base text-white text-opacity-80 truncate max-w-xs"
                      >
                        {file.name}
                      </m.p>
                      <m.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-white text-opacity-80 shadow-input"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </m.p>
                    </div>
                  </m.div>
                )}
              </m.div>
            ) : (
              <>
                <m.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-gray-600 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <m.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-white flex flex-col items-center"
                    >
                      Drop it
                      <Upload className="h-4 w-4" />
                    </m.p>
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                </m.div>
                <m.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-primary inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                />
              </>
            )}
          </div>
        </div>
      </m.div>
    </div>
  );
};

// export function GridPattern() {
//   const columns = 41;
//   const rows = 11;
//   return (
//     <div className="flex shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105 border border-dashed border-primary">
//       {Array.from({ length: rows }).map((_, row) =>
//         Array.from({ length: columns }).map((_, col) => {
//           const index = row * columns + col;
//           return (
//             <div
//               key={`${col}-${row}`}
//               className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
//                 index % 2 === 0 ? "bg-background" : "bg-background"
//               }`}
//             />
//           );
//         })
//       )}
//     </div>
//   );
// }
