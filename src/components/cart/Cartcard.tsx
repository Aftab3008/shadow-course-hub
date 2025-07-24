import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cart.store";
import { formatDuration, formatPrice, formatString } from "@/utils/utils";
import { Clock, Star, Trash2 } from "lucide-react";

export default function Cartcard() {
  const { items, removeFromCart } = useCartStore();
  const { toast } = useToast();

  const handleRemoveItem = (courseId: string) => {
    removeFromCart(courseId);
    toast({
      title: "Item removed",
      description: "Course has been removed from your cart.",
    });
  };
  return (
    <main>
      {items.map((item, index) => (
        <Card
          className="border-border bg-gradient-to-br from-card to-card/80 shadow-sm hover:shadow-md transition-all duration-200 group"
          key={item.courseId}
        >
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-40 h-24 sm:w-48 sm:h-28 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* <div className="absolute top-2 left-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-black/70 text-white border-0"
                    >
                      Course {index + 1}
                    </Badge>
                  </div> */}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-foreground text-xl leading-tight mb-2 group-hover:text-primary transition-colors duration-200">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-muted-foreground text-sm">
                        By {item.instructor.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">4.8</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.courseId)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-foreground">
                        {formatPrice(item.price)}
                      </span>
                      {item.OriginalPrice &&
                        item.OriginalPrice > item.price && (
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.OriginalPrice)}
                            </span>
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Save{" "}
                              {formatPrice(item.OriginalPrice - item.price)}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className="text-xs border-primary/20 text-primary bg-primary/5"
                    >
                      {formatString(item.level)}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatDuration(item.duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
