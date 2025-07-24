import Cartcard from "@/components/cart/Cartcard";
import EmptyCart from "@/components/cart/EmptyCart";
import SideCartcard from "@/components/cart/SideCartcard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cart.store";
import { ShoppingBag, Trash2 } from "lucide-react";

const Cart = () => {
  const { items, clearCart } = useCartStore();
  const { toast } = useToast();

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-6 bg-card border border-border rounded-xl shadow-sm">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {items.length} course{items.length !== 1 ? "s" : ""} selected
                for learning
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 self-start sm:self-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  Course Selection
                </h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <ShoppingBag className="h-4 w-4" />
                  <span>
                    {items.length} item{items.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <Cartcard />
            </div>

            <SideCartcard />
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
