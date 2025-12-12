import { iconsArray } from "@/components/shared/orbit-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Ripple,
  TechOrbitDisplay,
} from "@/components/ui/modern-animated-sign-in";
import {
  buttonVariants,
  cardVariants,
  containerVariants,
  iconVariants,
  leftPanelVariants,
  rightPanelVariants,
} from "@/constants/animations";
import { motion } from "framer-motion";
import { ArrowLeft, Home, LogIn, Shield, UserX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AuthNotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      <motion.div
        className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:py-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1">
            <motion.span
              className="flex flex-col justify-center w-full max-lg:hidden"
              variants={leftPanelVariants}
            >
              <Ripple mainCircleSize={100} className="bg-zinc-900 border" />
              <TechOrbitDisplay
                iconsArray={iconsArray}
                text="LearnHub"
                textClassName="bg-gradient-to-b from-primary to-secondary text-transparent bg-clip-text text-7xl font-semibold leading-none"
              />
            </motion.span>

            <motion.div
              className="flex flex-col items-center justify-center p-6"
              variants={rightPanelVariants}
            >
              <div className="max-w-md w-full">
                <motion.div variants={cardVariants}>
                  <Card className="border-2 border-dashed border-muted-foreground/25">
                    <CardHeader className="text-center pb-6">
                      <motion.div
                        className="flex justify-center mb-4"
                        variants={iconVariants}
                      >
                        <div className="relative">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 border-2 border-destructive/20">
                            <UserX className="h-8 w-8 text-destructive" />
                          </div>
                          <motion.div
                            className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.8,
                              type: "spring" as const,
                              stiffness: 300,
                            }}
                          >
                            <Shield className="h-3 w-3 text-primary" />
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div className="space-y-2" variants={cardVariants}>
                        <motion.div
                          className="flex items-center justify-center gap-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.5,
                            type: "spring" as const,
                            stiffness: 200,
                          }}
                        >
                          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                            404
                          </h1>
                          <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            <Badge variant="outline" className="text-xs">
                              AUTH AREA
                            </Badge>
                          </motion.div>
                        </motion.div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <CardTitle className="text-2xl">
                            Page Not Found
                          </CardTitle>
                        </motion.div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          <CardDescription className="text-base">
                            The authentication page you're looking for doesn't
                            exist or has been moved.
                          </CardDescription>
                        </motion.div>
                      </motion.div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <motion.div
                        className="bg-muted/50 rounded-lg p-4 border"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Authentication Required
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          This area is part of the authentication system. You
                          can sign in to access your account or sign up to
                          create a new one and start your learning journey.
                        </p>
                      </motion.div>

                      <motion.div
                        className="grid gap-3 sm:grid-cols-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.0 }}
                      >
                        <motion.div
                          variants={buttonVariants}
                          whileHover="hover"
                        >
                          <Button asChild variant="default" className="w-full">
                            <Link
                              to="/auth/signin"
                              className="flex items-center gap-2"
                            >
                              <LogIn className="h-4 w-4" />
                              Sign In
                            </Link>
                          </Button>
                        </motion.div>

                        <motion.div
                          variants={buttonVariants}
                          whileHover="hover"
                        >
                          <Button asChild variant="outline" className="w-full">
                            <Link to="/" className="flex items-center gap-2">
                              <Home className="h-4 w-4" />
                              Home
                            </Link>
                          </Button>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="flex justify-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.1 }}
                      >
                        <motion.div
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
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <p className="text-xs text-muted-foreground">
                    Shadow Course Hub Authentication • Error Code: AUTH-404
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default AuthNotFound;
