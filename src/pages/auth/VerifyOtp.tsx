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
import { TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

export function VerifyOtp() {
  const { verifyEmail } = userAuthStore();
  const { toast } = useToast();
  const { error } = userAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const redirectPath = state?.from?.pathname;
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

  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-2xl font-semibold text-center text-foreground">
          Verify Your Account
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          We've sent a verification code to your registered email address.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {!!error && (
              <div className="mb-4 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive justify-center">
                <TriangleAlert className="w-5 h-5" />
                <p className="flex items-center justify-center">{error}</p>
              </div>
            )}
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-center block text-muted-foreground">
                    Enter the 6-digit code sent to your device
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
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
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>Didn't receive the code?</p>
              <Button variant="link" className="p-0 h-auto text-sm">
                Resend Code
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
