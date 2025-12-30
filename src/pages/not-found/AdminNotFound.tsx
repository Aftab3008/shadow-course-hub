import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import {
  cardVariants,
  containerVariants,
  iconVariants,
  itemVariants,
  buttonVariants,
} from "@/constants/animations";

const AdminNotFound = () => {
  const navigate = useNavigate();

  return (
    <m.div
      className="min-h-screen bg-background flex items-center justify-center px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-2xl mx-auto">
        <m.div variants={cardVariants}>
          <Card className="border-2 border-dashed border-muted-foreground/25">
            <CardHeader className="text-center pb-6">
              <m.div
                className="flex justify-center mb-4"
                variants={itemVariants}
              >
                <div className="relative">
                  <m.div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 border-2 border-destructive/20"
                    variants={iconVariants}
                    animate={["visible", "pulse"]}
                  >
                    <Shield className="h-8 w-8 text-destructive" />
                  </m.div>
                  <m.div
                    className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.8,
                      type: "spring" as const,
                      stiffness: 300,
                    }}
                  >
                    <AlertTriangle className="h-3 w-3 text-destructive" />
                  </m.div>
                </div>
              </m.div>

              <m.div className="space-y-2" variants={itemVariants}>
                <m.div
                  className="flex items-center justify-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5,
                    type: "spring" as const,
                    stiffness: 200,
                  }}
                >
                  <h1 className="text-4xl font-bold text-destructive">404</h1>
                  <m.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Badge variant="destructive" className="text-xs">
                      ADMIN ACCESS
                    </Badge>
                  </m.div>
                </m.div>
                <m.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <CardTitle className="text-2xl">Page Not Found</CardTitle>
                </m.div>
                <m.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <CardDescription className="text-base">
                    The admin page you're looking for doesn't exist or you don't
                    have permission to access it.
                  </CardDescription>
                </m.div>
              </m.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <m.div
                className="bg-muted/50 rounded-lg p-4 border"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Area Restricted
                </h3>
                <p className="text-sm text-muted-foreground">
                  This section requires administrator privileges. If you believe
                  you should have access to this page, please contact your
                  system administrator or check if you're logged in with the
                  correct admin account.
                </p>
              </m.div>

              <m.div
                className="grid gap-3 sm:grid-cols-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <m.div variants={buttonVariants} whileHover="hover">
                  <Button asChild variant="default" className="w-full">
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  </Button>
                </m.div>

                <m.div variants={buttonVariants} whileHover="hover">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Main Site
                    </Link>
                  </Button>
                </m.div>
              </m.div>

              <m.div
                className="flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <m.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                  </Button>
                </m.div>
              </m.div>
            </CardContent>
          </Card>
        </m.div>

        <m.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <p className="text-xs text-muted-foreground">
            Shadow Course Hub Admin Panel • Error Code: ADM-404
          </p>
        </m.div>
      </div>
    </m.div>
  );
};

export default AdminNotFound;
