import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-8 p-8 bg-card border border-border rounded-2xl shadow-sm">
          <div className="p-6 bg-muted/50 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Looks like you haven't added any courses to your cart yet. Start
            exploring our amazing courses and build your skills!
          </p>
          <Button
            asChild
            size="lg"
            className="shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Link to="/courses">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Browse Courses
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
