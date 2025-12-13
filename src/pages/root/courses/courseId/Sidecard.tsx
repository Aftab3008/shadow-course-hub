import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SidecardSkeleton from "@/components/shared/skeletons/SidecardSkeleton";
import { formatDuration, formatString } from "@/utils/utils";
import { CheckCircle, Play, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidecard({
  id,
  level,
  duration,
  thumbnail,
  title,
  price,
  OriginalPrice,
  isEnrolled,
  courseInCart,
  isLoading,
  handleAddToCart,
}: {
  id: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: number;
  thumbnail: string;
  title: string;
  price: number;
  OriginalPrice: number;
  isEnrolled: boolean;
  courseInCart: boolean;
  isLoading: boolean;
  handleAddToCart: () => void;
}) {
  if (isLoading) {
    return <SidecardSkeleton />;
  }

  return (
    <div className="xl:col-span-1">
      <div className="sticky top-24 space-y-6">
        <Card className="border-border bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="aspect-video relative group bg-muted">
            <img
              src={thumbnail}
              alt={title}
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/50">
              <Button
                size="lg"
                className="rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Play className="h-6 w-6 mr-2" />
                Preview Course
              </Button>
            </div>
          </div>

          <CardContent className="p-6 lg:p-8">
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-4xl font-bold text-foreground">
                ${price}
              </span>
              {OriginalPrice && OriginalPrice > price && (
                <div className="flex flex-col">
                  <span className="text-lg text-muted-foreground line-through">
                    ${OriginalPrice}
                  </span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Save ${OriginalPrice - price}
                  </span>
                </div>
              )}
            </div>

            {isEnrolled ? (
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full shadow-md hover:shadow-lg"
                  size="lg"
                >
                  <Link to={`/learn/${id}/1`}>
                    <Play className="h-5 w-5 mr-2" />
                    Continue Learning
                  </Link>
                </Button>
                <Button variant="outline" className="w-full hover:bg-muted/50">
                  Download Resources
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                  size="lg"
                  variant={courseInCart ? "outline" : "default"}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {courseInCart ? "Remove from Cart" : "Add to Cart"}
                </Button>
                <Button variant="outline" className="w-full hover:bg-muted/50">
                  Add to Wishlist
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full hover:bg-muted/50"
                >
                  <Link to="/cart">View Cart</Link>
                </Button>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <h4 className="font-semibold text-foreground text-lg">
                This course includes:
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200">
                  <div className="p-1 bg-primary/10 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">
                    {formatString(level)} Level
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200">
                  <div className="p-1 bg-primary/10 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">
                    {formatDuration(duration)} of Content
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200">
                  <div className="p-1  rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">
                    Lifetime access
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200">
                  <div className="p-1  rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">
                    Certificate of completion
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200">
                  <div className="p-1  rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">
                    24/7 support
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
