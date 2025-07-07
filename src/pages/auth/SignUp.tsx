import SignUpForm from "@/components/auth/SignUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-foreground">
          Create Account
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          Join us today! Fill in your details to get started.
        </p>
      </CardHeader>
      <CardContent>
        <SignUpForm />
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/auth/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUp;
