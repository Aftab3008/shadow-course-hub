import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { GoogleSignInError } from "./GoogleSignInError";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function GoogleButton({
  isLoading,
  title,
}: {
  isLoading?: boolean;
  title?: string;
}) {
  try {
    if (!backendUrl) {
      throw new Error("VITE_BACKEND_URL is not defined");
    }
  } catch (err) {
    console.error(err);
    return <GoogleSignInError />;
  }

  const handleGoogleSignIn = () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <Button
      variant="outline"
      className="border-border bg-background w-full text-sm flex items-center justify-center gap-2 hover:bg-background hover:text-foreground"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
    >
      <FcGoogle className="mr-2" size={32} />
      {title || "Sign in with Google"}
    </Button>
  );
}
