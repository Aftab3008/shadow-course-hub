import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cart.store";
import { formatDuration, formatPrice, formatString } from "@/utils/utils";
import { Clock, Star, Trash2, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function Cartcard() {
  const { items, removeFromCart } = useCartStore();
  const { toast } = useToast();

  const handleRemoveItem = async (courseId: string) => {
    const result = await removeFromCart(courseId);
    if (result.success) {
      toast({
        title: "Item removed",
        description: "Course has been removed from your cart.",
      });
    } else {
      toast({
        title: "Failed to remove item",
        description: result.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {items.map((item, index) => (
        <motion.div key={item.courseId} variants={itemVariants} layout>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Course Thumbnail */}
                <div className="flex-shrink-0">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full sm:w-56 h-36 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-black/70 text-white border-0 backdrop-blur-sm"
                      >
                        <BookOpen className="h-3 w-3 mr-1" />
                        Course {index + 1}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-xl leading-tight mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full flex items-center justify-center">
                            <Award className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">
                            {item.instructor.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-foreground">
                          4.8
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          (2.5k reviews)
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.courseId)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0 h-9 w-9 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Price and Meta Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/50">
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
        </motion.div>
      ))}
    </motion.div>
  );
}
