import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import mattressProduct from "@/assets/mattress-product.jpg";
import pillowsProduct from "@/assets/pillows-product.jpg";
import toiletriesProduct from "@/assets/toiletries-product.jpg";

// Mock wishlist data
const mockWishlistItems = [
  {
    id: "1",
    name: "Memory Foam Mattress - Queen Size",
    price: 299.99,
    originalPrice: 399.99,
    image: mattressProduct,
    rating: 4.8,
    reviewCount: 324,
    category: "Mattresses",
    isOnSale: true,
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Complete Toiletry Essentials Kit",
    price: 89.99,
    image: toiletriesProduct,
    rating: 4.7,
    reviewCount: 89,
    category: "Toiletries",
    isBestSeller: true,
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<typeof mockWishlistItems>([]);
  const [cart, setCart] = useState<string[]>([]);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistIds = JSON.parse(savedWishlist);
        const filteredItems = mockWishlistItems.filter(item => 
          wishlistIds.includes(item.id)
        );
        setWishlistItems(filteredItems);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setWishlistItems([]);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    const wishlistIds = wishlistItems.map(item => item.id);
    localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
  }, [wishlistItems]);

  const handleAddToCart = (product: any) => {
    setCart(prev => [...prev, product.id]);
  };

  const handleRemoveFromWishlist = (product: any) => {
    setWishlistItems(prev => prev.filter(item => item.id !== product.id));
  };

  const handleAddAllToCart = () => {
    const itemIds = wishlistItems.map(item => item.id);
    setCart(prev => [...prev, ...itemIds]);
  };

  const handleClearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleClearWishlist}
                  className="transition-smooth"
                >
                  Clear All
                </Button>
                <Button
                  onClick={handleAddAllToCart}
                  className="button-gradient"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add All to Cart
                </Button>
              </div>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Start browsing and add items you love to your wishlist
                </p>
                <Button className="button-gradient" asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleRemoveFromWishlist}
                  isInWishlist={true}
                />
              ))}
            </div>
          )}

          {/* Recommendations */}
          {wishlistItems.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ProductCard
                  product={{
                    id: "rec1",
                    name: "Premium Down Alternative Pillows (Set of 2)",
                    price: 49.99,
                    originalPrice: 69.99,
                    image: pillowsProduct,
                    rating: 4.6,
                    reviewCount: 156,
                    category: "Pillows",
                    isOnSale: true,
                  }}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={() => {}}
                  isInWishlist={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}