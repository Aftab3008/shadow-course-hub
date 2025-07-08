import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ForgetPassword from "./ForgetPassword";
import ContinueWith from "./ContinueWith";
import { userAuthStore } from "@/store/auth.store";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "@/types";

export default function SignInForm() {
  const { login, error } = userAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const redirectPath = state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    setError,
    clearErrors,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    clearErrors();
    const { email, password } = values;
    const response = await login({ email, password });
    if (response.success) {
      form.reset();
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        variant: "success",
      });
      navigate(redirectPath, { replace: true });
    } else if (!response.success && response.redirectURL) {
      form.reset();
      navigate(response.redirectURL, { replace: true });
    }
  }

  function handleForgotPassword(e: React.MouseEvent) {
    e.preventDefault();
    setIsLoading(true);
    console.log("Forgot password");
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!!error && (
            <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive justify-center">
              <TriangleAlert className="w-5 h-5" />
              <p className="flex items-center justify-center">{error}</p>
            </div>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-background border-border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-foreground">Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="bg-background border-border pr-10"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <ForgetPassword
            onClick={handleForgotPassword}
            isLoading={isLoading}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>
      <ContinueWith
        isLoading={isLoading || isSubmitting}
        title="Sign in with Google"
      />
    </>
  );
}
