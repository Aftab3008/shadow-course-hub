
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  return (
    <Button variant="ghost" size="sm" asChild className="relative">
      <Link to="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
        <span className="sr-only">Cart</span>
      </Link>
    </Button>
  );
};

export default CartIcon;
