import Cartcard from "@/components/cart/Cartcard";
import EmptyCart from "@/components/cart/EmptyCart";
import SideCartcard from "@/components/cart/SideCartcard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cart.store";
import {
  ShoppingCart,
  Trash2,
  Package,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, clearCart } = useCartStore();
  const { toast } = useToast();

  const handleClearCart = async () => {
    const result = await clearCart();
    if (result.success) {
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } else {
      toast({
        title: "Failed to clear cart",
        description: result.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="container mx-auto px-4 py-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-4xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Ready to Learn
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Your Shopping Cart
                    </h1>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        <span className="text-lg font-medium">
                          {items.length} course{items.length !== 1 ? "s" : ""}{" "}
                          selected
                        </span>
                      </div>
                      <div className="hidden sm:block w-1 h-1 bg-muted-foreground/50 rounded-full" />
                      <div className="hidden sm:flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span className="text-lg font-medium">
                          Invest in your future
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      onClick={handleClearCart}
                      className="group hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 h-11"
                    >
                      <Trash2 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                      Clear Cart
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-8"
            >
              {/* Cart Items */}
              <div className="xl:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                    Course Selection
                  </h2>
                  <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                    {items.length} item{items.length !== 1 ? "s" : ""}
                  </Badge>
                </div>

                <AnimatePresence mode="popLayout">
                  <Cartcard />
                </AnimatePresence>
              </div>

              {/* Order Summary Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="xl:col-span-1"
              >
                <SideCartcard />
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
