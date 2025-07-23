import { useNavigate } from "react-router-dom";
import { XCircle, ArrowRight, RotateCcw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Cancel() {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleRetryPayment = () => {
    navigate("/cart");
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto text-center shadow-lg">
        <CardHeader className="pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-white text-opacity-30">
            Payment Cancelled
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Your payment was cancelled. No charges have been made to your
            account. Your items are still in your cart.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-gray-600 rounded-lg p-4">
            <p className="text-sm text-white">
              <Mail className="w-4 h-4 inline mr-2" />
              Don't worry, your cart items are saved and ready when you're ready
              to purchase.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleRetryPayment}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry Payment
            </Button>

            <Button
              onClick={handleViewCart}
              variant="outline"
              className="w-full border-red-600 text-red-600"
            >
              View Cart
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              onClick={handleContinueShopping}
              variant="outline"
              className="w-full border-gray-400 text-white text-opacity-60"
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
