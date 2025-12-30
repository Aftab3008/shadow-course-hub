import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { initiateCheckout, initiateStripe } from "@/lib/stripe";
import { userAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/utils/utils";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  Shield,
  Smartphone,
  Award,
  Infinity,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

export default function SideCartcard() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = userAuthStore();
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const { toast } = useToast();

  const calculateSavings = () => {
    return items.reduce((total, item) => {
      const originalPrice = item.OriginalPrice || item.price;
      return total + (originalPrice - item.price);
    }, 0);
  };

  const handleCheckout = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsProcessingCheckout(true);

    try {
      const { success, sessionId, url, publicKey } = await initiateCheckout();
      console.log("Checkout response:", { success, sessionId, url, publicKey });
      if (success && sessionId && url && publicKey) {
        const {
          stripe,
          success: stripeSuccess,
          message,
        } = await initiateStripe(publicKey);
        if (stripeSuccess && stripe) {
          await stripe.redirectToCheckout({ sessionId });
        } else {
          toast({
            title: "Stripe Initialization Failed",
            description: message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "An error occurred while processing your checkout.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  const savings = calculateSavings();

  return (
    <div className="sticky top-24">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border-b border-border/50">
            <CardHeader className="p-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground">
                    Order Summary
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Review your purchase
                  </p>
                </div>
              </div>
            </CardHeader>
          </div>

          <CardContent className="space-y-6 p-6">
            {/* Price Breakdown */}
            <div className="space-y-4 p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border/50">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">
                  Original Price:
                </span>
                <span className="text-foreground font-semibold text-lg">
                  {formatPrice(totalPrice + savings)}
                </span>
              </div>

              {savings > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-green-600 dark:text-green-400">
                        Discount:
                      </span>
                    </div>
                    <Badge
                      variant="default"
                      className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-base px-3 py-1"
                    >
                      -{formatPrice(savings)}
                    </Badge>
                  </div>
                  <Separator className="my-3" />
                </>
              )}

              <div className="flex justify-between items-center text-2xl font-bold pt-2">
                <span className="text-foreground">Total:</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              {isAuthenticated ? (
                <Button
                  onClick={handleCheckout}
                  className="w-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 h-12 text-base font-semibold group"
                  size="lg"
                  disabled={isProcessingCheckout}
                >
                  {isProcessingCheckout ? (
                    <>
                      <m.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mr-2"
                      >
                        <CreditCard className="h-5 w-5" />
                      </m.div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      Proceed to Checkout
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  asChild
                  className="w-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 h-12 text-base font-semibold"
                  size="lg"
                >
                  <Link to="/auth/signin">
                    <Shield className="h-5 w-5 mr-2" />
                    Sign In to Checkout
                  </Link>
                </Button>
              )}

              <Button
                variant="outline"
                asChild
                className="w-full hover:bg-muted/50 hover:border-primary/30 transition-all duration-200 h-11 group"
              >
                <Link to="/courses">
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            {/* Features List */}
            <div className="pt-6 border-t border-border/50">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-green-500/10 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span>What's included:</span>
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-1 bg-primary/10 rounded">
                    <Infinity className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <strong className="text-foreground">
                      Full lifetime access
                    </strong>{" "}
                    to all courses
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-1 bg-primary/10 rounded">
                    <Award className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <strong className="text-foreground">
                      Certificate of completion
                    </strong>{" "}
                    for each course
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-1 bg-primary/10 rounded">
                    <Smartphone className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <strong className="text-foreground">
                      Access on mobile, tablet & desktop
                    </strong>{" "}
                    devices
                  </span>
                </li>
              </ul>
            </div>

            {/* Trust Badge */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </div>
  );
}
