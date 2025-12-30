import SignUpForm from "@/components/auth/SignUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { UserPlus, Sparkles, Award, TrendingUp, Users } from "lucide-react";

const SignUp = () => {
  return (
    <div className="w-full">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-shadow duration-300 overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <CardHeader className="space-y-4 relative pb-6">
          {/* Icon with gradient background */}
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-fit"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/10 shadow-lg">
              <UserPlus className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </m.div>

          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Join Free Today
              </span>
            </div>
          </m.div>

          <CardTitle className="text-3xl text-center text-foreground font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Create Your Account
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Start your learning journey today and unlock access to thousands of
            courses
          </p>

          {/* Benefits grid */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-3 pt-4"
          >
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs text-center text-muted-foreground font-medium">
                Certificates
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-center text-muted-foreground font-medium">
                Progress Track
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="text-xs text-center text-muted-foreground font-medium">
                Community
              </span>
            </div>
          </m.div>
        </CardHeader>

        <CardContent className="relative">
          <SignUpForm />

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            Already have an account?{" "}
            <Link
              to="/auth/signin"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold transition-colors"
            >
              Sign in
            </Link>
          </m.p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
