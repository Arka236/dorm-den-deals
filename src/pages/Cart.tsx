import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Trash2, Tag } from "lucide-react";
import mattressProduct from "@/assets/mattress-product.jpg";
import pillowsProduct from "@/assets/pillows-product.jpg";

// Mock cart data
const mockCartItems = [
  {
    id: "1",
    name: "Memory Foam Mattress - Queen Size",
    price: 299.99,
    originalPrice: 399.99,
    image: mattressProduct,
    quantity: 1,
    category: "Mattresses",
  },
  {
    id: "2",
    name: "Premium Down Alternative Pillows (Set of 2)",
    price: 49.99,
    originalPrice: 69.99,
    image: pillowsProduct,
    quantity: 2,
    category: "Pillows",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'student10') {
      setDiscount(0.1);
    } else if (promoCode.toLowerCase() === 'welcome20') {
      setDiscount(0.2);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Add some items to get started
                </p>
                <Button className="button-gradient">
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="card-product">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Promo Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>
                    {discount > 0 && (
                      <Badge variant="default" className="mt-2">
                        <Tag className="h-3 w-3 mr-1" />
                        {(discount * 100).toFixed(0)}% off applied
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                <Button className="w-full button-gradient py-6 text-lg">
                  Proceed to Checkout
                </Button>

                {shipping > 0 && (
                  <p className="text-sm text-center text-muted-foreground">
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}