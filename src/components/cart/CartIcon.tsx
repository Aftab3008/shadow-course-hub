import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

const CartIcon = ({ className }: { className?: string }) => {
  const { totalItems } = useCartStore();

  return (
    <Button
      variant="ghost"
      asChild
      className={`relative rounded-2xl bg-opacity-10 ${className}`}
    >
      <Link to="/cart" className="relative">
        <span className="relative inline-block">
          <ShoppingCart className="h-8 w-8" />
          {totalItems > 0 && (
            <Badge
              variant="default"
              className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
            >
              <span className="text-xs">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            </Badge>
          )}
        </span>
        <span className="sr-only">Cart</span>
      </Link>
    </Button>
  );
};

export default CartIcon;
