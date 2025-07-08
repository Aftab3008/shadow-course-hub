import GoogleButton from "./GoogleButton";

export default function ContinueWith({
  isLoading,
  title,
}: {
  isLoading?: boolean;
  title?: string;
}) {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs items-center">
          <span className="bg-card px-2 text-muted-foreground flex items-center justify-center">
            Or continue with
          </span>
        </div>
      </div>

      <div className="w-full mt-4">
        <GoogleButton isLoading={isLoading} title={title} />
      </div>
    </div>
  );
}
