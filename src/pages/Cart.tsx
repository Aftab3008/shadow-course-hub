
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Trash2,
  Star,
  Clock,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, totalPrice, removeFromCart, clearCart } = useCartStore();
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const { toast } = useToast();

  const handleRemoveItem = (courseId: string) => {
    removeFromCart(courseId);
    toast({
      title: "Item removed",
      description: "Course has been removed from your cart.",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = async () => {
    setIsProcessingCheckout(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsProcessingCheckout(false);
      toast({
        title: "Checkout successful!",
        description: "You have been enrolled in all courses.",
      });
      clearCart();
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculateSavings = () => {
    return items.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      return total + (originalPrice - item.price);
    }, 0);
  };

  const savings = calculateSavings();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any courses to your cart yet. 
              Start exploring our amazing courses!
            </p>
            <Button asChild size="lg">
              <Link to="/courses">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Browse Courses
              </Link>
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {items.length} Course{items.length !== 1 ? 's' : ''} in Cart
            </h2>

            {items.map((item) => (
              <Card key={item.id} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground text-lg leading-tight">
                          {item.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.courseId)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-2">
                        By {item.instructor}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{item.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-foreground">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Course
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Original Price:
                      </span>
                      <span className="text-foreground">
                        {formatPrice(totalPrice + savings)}
                      </span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-{formatPrice(savings)}</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Total:</span>
                      <span className="text-foreground">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={handleCheckout}
                      className="w-full"
                      size="lg"
                      disabled={isProcessingCheckout}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      {isProcessingCheckout ? "Processing..." : "Checkout"}
                    </Button>
                    
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/courses">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-foreground mb-2">
                      Order includes:
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Full lifetime access</li>
                      <li>• 30-day money-back guarantee</li>
                      <li>• Certificate of completion</li>
                      <li>• Access on all devices</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
