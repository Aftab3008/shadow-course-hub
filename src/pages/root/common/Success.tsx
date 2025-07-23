import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart.store";

export default function Success() {
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, []);

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/purchase-history");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto text-center shadow-lg">
        <CardHeader className="pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-white text-opacity-30">
            Payment Successful!
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order has been confirmed and is
            being processed.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-gray-600 rounded-lg p-4">
            <p className="text-sm text-white">
              <Mail className="w-4 h-4 inline mr-2" />A confirmation email has
              been sent to your registered email address.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleViewOrders}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              View My Orders
            </Button>

            <Button
              onClick={handleContinueShopping}
              variant="outline"
              className="w-full border-green-600 text-green-600"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="text-xs text-gray-500 pt-4 border-t">
            <p>Need help? Contact our support team</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
