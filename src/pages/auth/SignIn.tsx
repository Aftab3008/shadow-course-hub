import SignInForm from "@/components/auth/SignInForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { LogIn, Sparkles, Shield, Zap } from "lucide-react";

const SignIn = () => {
  return (
    <div className="w-full">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-shadow duration-300 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

        <CardHeader className="space-y-4 relative pb-6">
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-fit"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 shadow-lg">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">
                Secure Login
              </span>
            </div>
          </m.div>

          <CardTitle className="text-3xl text-center text-foreground font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Welcome Back
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Sign in to continue your learning journey and access your
            personalized dashboard
          </p>
        </CardHeader>

        <CardContent className="relative">
          <SignInForm />

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 pt-6 border-t border-border/50"
          >
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span>Secure</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span>Fast</span>
              </div>
            </div>
          </m.div>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-primary hover:underline font-semibold transition-colors hover:text-primary/80"
            >
              Sign up for free
            </Link>
          </m.p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
