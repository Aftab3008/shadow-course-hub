import { useCategories } from "@/hooks/Category";
import CourseForm from "./CourseForm";
import { m } from "framer-motion";
import { Sparkles, Rocket, Users, Award } from "lucide-react";

export default function CreateCourse() {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    refetch,
  } = useCategories();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border/50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Create Your Course
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Share Your Expertise
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Create an engaging online course and help thousands of students
              learn new skills
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50"
              >
                <Rocket className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Launch Fast
                </span>
              </m.div>
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50"
              >
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Reach Globally
                </span>
              </m.div>
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50"
              >
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Build Authority
                </span>
              </m.div>
            </div>
          </m.div>
        </div>
      </m.section>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-5xl">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CourseForm
            categories={categories?.data}
            isLoadingCategories={isLoadingCategories}
            refetch={refetch}
          />
        </m.div>
      </div>
    </main>
  );
}
