import ReviewsSkeleton from "@/components/shared/skeletons/ReviewsSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Review } from "@/types/course";
import { formatDate } from "@/utils/utils";
import { Star, Users } from "lucide-react";

export default function Reviews({
  reviews,
  isLoading,
}: {
  reviews: Partial<Review>[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <ReviewsSkeleton />;
  }

  const averageRating =
    reviews.reduce(
      (acc, review) =>
        acc + (typeof review.rating === "number" ? review.rating : 0),
      0
    ) / reviews.length;

  return (
    <main className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 bg-muted/50 rounded-lg">
        <h3 className="text-2xl font-bold text-foreground">Student Reviews</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            <span className="text-xl font-bold text-foreground">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span className="font-medium">({reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12 border-2 border-border">
                  <AvatarImage
                    src={review.user.profileUrl}
                    alt={review.user.name}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {review.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-semibold text-foreground text-lg">
                      {review.user.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-foreground">
                      {review.rating.rating}.0
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {review.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card className="border-border bg-card">
          <CardContent className="p-12 text-center">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">
              No Reviews Yet
            </h4>
            <p className="text-muted-foreground">
              Be the first to leave a review for this course!
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
