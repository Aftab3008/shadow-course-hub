import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex flex-col text-foreground">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="flex flex-col items-center mb-8">
            <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6 shadow-lg">
              <Ghost className="h-12 w-12 text-primary animate-bounce" />
            </span>
            <h1 className="text-6xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent drop-shadow-lg leading-[1.1] pt-1">
              404
            </h1>
            <p className="text-2xl font-semibold text-primary mb-2 animate-fade-in">
              Lost in the shadows?
            </p>
            <p className="text-lg text-muted-foreground mb-6 max-w-xs mx-auto">
              Sorry, the page you’re looking for doesn’t exist or has been
              moved.
              <br />
              Let’s get you back to learning something awesome!
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="w-full md:w-auto font-bold shadow-md hover:scale-105 transition-transform"
          >
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    </main>
  );
};

export default NotFound;
