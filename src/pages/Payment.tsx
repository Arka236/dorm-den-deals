import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, QrCode, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Payment() {
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "completed" | "failed">("pending");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus("failed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate payment completion after 5 seconds for demo
    const paymentTimer = setTimeout(() => {
      setPaymentStatus("completed");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(paymentTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (paymentStatus === "completed") {
    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span>Order Number:</span>
                    <span className="font-semibold">#CE20241215001</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Paid:</span>
                    <span className="font-semibold">$398.97</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold">QR Code Payment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <span className="font-semibold">2-3 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link to="/orders">View Order</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">❌</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Payment Expired</h1>
            <p className="text-lg text-muted-foreground mb-8">
              The payment session has expired. Please try again.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link to="/checkout">Try Again</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/cart">Back to Cart</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Complete Your Payment</h1>
            <Badge variant="outline" className="mb-4">
              <Clock className="h-3 w-3 mr-1" />
              Time remaining: {formatTime(timeLeft)}
            </Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <QrCode className="h-6 w-6 mr-2" />
                Scan QR Code to Pay
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white p-8 rounded-lg inline-block mb-6">
                <div className="w-48 h-48 bg-black/10 rounded-lg flex items-center justify-center mx-auto">
                  <QrCode className="h-24 w-24 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Payment Instructions:</h3>
                  <ol className="text-sm text-muted-foreground text-left space-y-1">
                    <li>1. Open your UPI app (GPay, PhonePe, Paytm, etc.)</li>
                    <li>2. Scan the QR code above</li>
                    <li>3. Enter amount: ₹33,000 (approx $398.97)</li>
                    <li>4. Complete the payment</li>
                    <li>5. Your order will be confirmed automatically</li>
                  </ol>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold">Total Amount: $398.97</p>
                  <p className="text-sm text-muted-foreground">
                    Order #CE20241215001
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Alternative Payment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/checkout">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay with Credit/Debit Card
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Button variant="ghost" asChild>
              <Link to="/cart">← Back to Cart</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}