import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  shipping_address: any;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch orders",
          variant: "destructive",
        });
      } else {
        setOrders(data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'placed':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'shipped':
        return 'default';
      case 'delivered':
        return 'default';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          
          {orders.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start shopping to see your orders here
                </p>
                <Button className="button-gradient">
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="card-product">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.order_number}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(order.status)} className="mb-2">
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                        <p className="text-lg font-semibold">
                          ${order.total_amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Shipping Address</h4>
                        <p className="text-sm text-muted-foreground">
                          {order.shipping_address?.full_address || 'No address provided'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.pincode}
                        </p>
                      </div>
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}