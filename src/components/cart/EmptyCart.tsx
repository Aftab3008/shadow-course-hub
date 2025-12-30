import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ShoppingCart,
  Sparkles,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

export default function EmptyCart() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex items-center justify-center px-4 py-16">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container max-w-2xl"
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-12 text-center shadow-2xl">
          {/* Icon with Glow Effect */}
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse" />
              <div className="relative w-32 h-32 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full flex items-center justify-center border border-primary/20">
                <ShoppingCart className="h-16 w-16 text-primary" />
              </div>
            </div>
          </m.div>

          {/* Content */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
              Looks like you haven't added any courses yet. Start exploring our
              amazing courses and build your skills!
            </p>
          </m.div>

          {/* CTA Button */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <Button
              asChild
              size="lg"
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 h-12 px-8 group"
            >
              <Link to="/courses">
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Browse Courses
              </Link>
            </Button>

            {/* Quick Links */}
            <div className="pt-8 border-t border-border/50 mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Popular categories
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:border-primary/50 hover:text-primary"
                >
                  <Link to="/courses?category=Programming">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Programming
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:border-primary/50 hover:text-primary"
                >
                  <Link to="/courses?category=Design">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Design
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:border-primary/50 hover:text-primary"
                >
                  <Link to="/courses?category=Business">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Business
                  </Link>
                </Button>
              </div>
            </div>
          </m.div>
        </Card>
      </m.div>
    </div>
  );
}
