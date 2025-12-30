import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { OtpSchema } from "@/schemas/zodSchema";
import { userAuthStore } from "@/store/auth.store";
import { LocationState } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TriangleAlert,
  Mail,
  Shield,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { m } from "framer-motion";
import { useState } from "react";

export function VerifyOtp() {
  const { verifyEmail } = userAuthStore();
  const { toast } = useToast();
  const { error } = userAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const redirectPath = state?.from?.pathname;
  const [isResending, setIsResending] = useState(false);

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof OtpSchema>) {
    const response = await verifyEmail({ otp: data.otp });
    if (response.success) {
      toast({
        title: "Success",
        description: "OTP verified successfully",
        variant: "success",
      });
      navigate(redirectPath || "/", { replace: true });
    }
  }

  const handleResendCode = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email",
        variant: "success",
      });
    }, 2000);
  };

  return (
    <div className="w-full">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-shadow duration-300 overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        <CardHeader className="space-y-4 relative pb-6">
          {/* Icon with gradient background and pulse animation */}
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-fit relative"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 shadow-lg relative">
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400 relative z-10" />
              <div className="absolute inset-0 bg-blue-500/20 rounded-2xl animate-ping" />
            </div>
          </m.div>

          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                Verification Required
              </span>
            </div>
          </m.div>

          <CardTitle className="text-3xl text-center text-foreground font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Verify Your Email
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            We've sent a 6-digit verification code to your email address. Please
            enter it below to continue.
          </p>
        </CardHeader>

        <CardContent className="p-6 relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {!!error && (
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-x-2 rounded-lg bg-destructive/15 p-3 text-sm text-destructive justify-center border border-destructive/20"
                >
                  <TriangleAlert className="w-5 h-5" />
                  <p>{error}</p>
                </m.div>
              )}

              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-center block text-muted-foreground font-medium">
                      Enter Verification Code
                    </FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} {...field} className="gap-3">
                          <InputOTPGroup className="gap-3">
                            <InputOTPSlot
                              index={0}
                              className="w-12 h-14 text-lg font-bold border-border/50 focus:border-primary transition-colors"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-12 h-14 text-lg font-bold border-border/50 focus:border-primary transition-colors"
                            />
                            <InputOTPSlot
                              index={2}
                              className="w-12 h-14 text-lg font-bold border-border/50 focus:border-primary transition-colors"
                            />
                            <InputOTPSlot
                              index={3}
                              className="w-12 h-14 text-lg font-bold border-border/50 focus:border-primary transition-colors"
                            />
                            <InputOTPSlot
                              index={4}
                              className="w-12 h-14 text-lg font-bold border-border/50 focus:border-primary transition-colors"
                            />
                            <InputOTPSlot
                              index={5}
                              className="w-12 h-14 text-lg font-bold border-border/50 focus:border-primary transition-colors"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:scale-[1.02] transition-transform shadow-lg hover:shadow-xl"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Verify Email
                  </>
                )}
              </Button>

              <div className="text-center space-y-3 pt-2">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors"
                  onClick={handleResendCode}
                  disabled={isResending}
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend Code
                    </>
                  )}
                </Button>
              </div>

              {/* Security message */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-6 border-t border-border/50"
              >
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span>Your information is secure and encrypted</span>
                </div>
              </m.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
