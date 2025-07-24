import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/utils/utils";
import { ArrowLeft, CreditCard, ListCheck, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideCartcard() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const { toast } = useToast();

  const calculateSavings = () => {
    return items.reduce((total, item) => {
      const originalPrice = item.OriginalPrice || item.price;
      return total + (originalPrice - item.price);
    }, 0);
  };
  const handleCheckout = async () => {
    setIsProcessingCheckout(true);

    setTimeout(() => {
      setIsProcessingCheckout(false);
      toast({
        title: "Checkout successful!",
        description: "You have been enrolled in all courses.",
      });
      clearCart();
    }, 2000);
  };

  const savings = calculateSavings();
  return (
    <div className="xl:col-span-1">
      <div className="sticky top-24">
        <Card className="border-border bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">
                Order Summary
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">
                  Original Price:
                </span>
                <span className="text-foreground font-semibold">
                  {formatPrice(totalPrice + savings)}
                </span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span className="font-medium">Discount:</span>
                  <span className="font-semibold">-{formatPrice(savings)}</span>
                </div>
              )}

              <Separator className="my-3" />

              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-foreground">Total:</span>
                <span className="text-foreground">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleCheckout}
                className="w-full shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                size="lg"
                disabled={isProcessingCheckout}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {isProcessingCheckout ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full hover:bg-muted/50"
              >
                <Link to="/courses">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
                <div className="p-1 bg-green-100 rounded">
                  <ListCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span>Order includes:</span>
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Full lifetime access to all courses</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Access on mobile, tablet & desktop</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
