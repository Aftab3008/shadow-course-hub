import { Button } from "../ui/button";

interface ForgetPasswordProps {
  isLoading: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function ForgetPassword({
  isLoading,
  onClick,
}: ForgetPasswordProps) {
  return (
    <div className="flex justify-end items-center">
      <Button
        variant="link"
        onClick={onClick}
        className="text-sm text-primary hover:underline"
        disabled={isLoading}
      >
        Forgot password?
      </Button>
    </div>
  );
}
