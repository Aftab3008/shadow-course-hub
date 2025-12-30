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
  cardVariants,
  containerVariants,
  iconVariants,
  itemVariants,
} from "@/constants/animations";
import { popularPages } from "@/constants/NavbarLinks";
import { m } from "framer-motion";
import { AlertTriangle, ArrowLeft, BookOpen, Home, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <m.div
        className="relative z-10 flex items-center justify-center px-4 py-16 min-h-[calc(100vh-8rem)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-4xl mx-auto">
          <m.div className="text-center mb-12" variants={itemVariants}>
            <m.div
              className="flex justify-center mb-6"
              variants={itemVariants}
            >
              <div className="relative">
                <m.div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 shadow-lg"
                  variants={iconVariants}
                  animate={["visible", "pulse"]}
                >
                  <AlertTriangle className="h-10 w-10 text-primary" />
                </m.div>
                <m.div
                  className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                >
                  <span className="text-destructive font-bold text-sm">!</span>
                </m.div>
              </div>
            </m.div>

            <m.div className="space-y-4" variants={itemVariants}>
              <m.div
                className="flex items-center justify-center gap-3"
                variants={itemVariants}
              >
                <m.h1
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.4,
                  }}
                >
                  404
                </m.h1>
                <m.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Badge variant="outline" className="text-sm">
                    PAGE NOT FOUND
                  </Badge>
                </m.div>
              </m.div>
              <m.h2
                className="text-3xl md:text-4xl font-bold text-foreground"
                variants={itemVariants}
              >
                Lost in the shadows?
              </m.h2>
              <m.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Sorry, the page you're looking for doesn't exist or has been
                moved. But don't worry – let's get you back to learning
                something awesome!
              </m.p>
            </m.div>
          </m.div>

          <m.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12"
            variants={containerVariants}
          >
            <m.div variants={cardVariants} whileHover="hover">
              <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors h-full">
                <CardHeader className="text-center">
                  <m.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Home className="h-8 w-8 text-primary mx-auto mb-2" />
                  </m.div>
                  <CardTitle className="text-lg">Go Home</CardTitle>
                  <CardDescription>
                    Return to our homepage and start exploring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/">Back to Home</Link>
                  </Button>
                </CardContent>
              </Card>
            </m.div>

            <m.div variants={cardVariants} whileHover="hover">
              <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors h-full">
                <CardHeader className="text-center">
                  <m.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  </m.div>
                  <CardTitle className="text-lg">Browse Courses</CardTitle>
                  <CardDescription>
                    Discover thousands of courses waiting for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/courses">View Courses</Link>
                  </Button>
                </CardContent>
              </Card>
            </m.div>

            <m.div variants={cardVariants} whileHover="hover">
              <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors md:col-span-2 lg:col-span-1 h-full">
                <CardHeader className="text-center">
                  <m.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    <Search className="h-8 w-8 text-primary mx-auto mb-2" />
                  </m.div>
                  <CardTitle className="text-lg">Search</CardTitle>
                  <CardDescription>
                    Find exactly what you're looking for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="secondary" className="w-full">
                    <Link to="/courses">Start Searching</Link>
                  </Button>
                </CardContent>
              </Card>
            </m.div>
          </m.div>

          <m.div
            className="bg-muted/50 rounded-lg p-6 border"
            variants={itemVariants}
          >
            <h3 className="font-semibold text-lg mb-4 text-center">
              Popular Pages
            </h3>
            <div className="grid gap-2 sm:grid-cols-3">
              {popularPages.map((page, index) => {
                const Icon = page.icon;
                return (
                  <m.div
                    key={page.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={page.href}
                      className="flex items-center space-x-2 rounded-md p-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{page.name}</span>
                    </Link>
                  </m.div>
                );
              })}
            </div>
          </m.div>

          <m.div
            className="flex justify-center mt-8"
            variants={itemVariants}
          >
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
        </div>
      </m.div>
    </main>
  );
};

export default NotFound;
