import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import mattressProduct from "@/assets/mattress-product.jpg";
import pillowsProduct from "@/assets/pillows-product.jpg";
import toiletriesProduct from "@/assets/toiletries-product.jpg";

// Mock product data
const allProducts = [
  {
    id: "1",
    name: "Memory Foam Mattress - Queen Size",
    price: 299.99,
    originalPrice: 399.99,
    image: mattressProduct,
    rating: 4.8,
    reviewCount: 324,
    category: "mattresses",
    isOnSale: true,
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Twin XL Memory Foam Mattress",
    price: 199.99,
    originalPrice: 249.99,
    image: mattressProduct,
    rating: 4.5,
    reviewCount: 234,
    category: "mattresses",
    isOnSale: true,
  },
  {
    id: "7",
    name: "Firm Support Mattress - Full Size",
    price: 249.99,
    originalPrice: 329.99,
    image: mattressProduct,
    rating: 4.7,
    reviewCount: 189,
    category: "mattresses",
    isOnSale: true,
  },
  {
    id: "2",
    name: "Premium Down Alternative Pillows (Set of 2)",
    price: 49.99,
    originalPrice: 69.99,
    image: pillowsProduct,
    rating: 4.6,
    reviewCount: 156,
    category: "pillows",
    isOnSale: true,
  },
  {
    id: "5",
    name: "Ergonomic Memory Foam Pillow",
    price: 39.99,
    image: pillowsProduct,
    rating: 4.4,
    reviewCount: 67,
    category: "pillows",
  },
  {
    id: "8",
    name: "Cooling Gel Pillow",
    price: 59.99,
    originalPrice: 79.99,
    image: pillowsProduct,
    rating: 4.8,
    reviewCount: 145,
    category: "pillows",
    isOnSale: true,
  },
  {
    id: "3",
    name: "Complete Toiletry Essentials Kit",
    price: 89.99,
    image: toiletriesProduct,
    rating: 4.7,
    reviewCount: 89,
    category: "toiletries",
    isBestSeller: true,
  },
  {
    id: "6",
    name: "Organic Bath & Body Set",
    price: 59.99,
    originalPrice: 79.99,
    image: toiletriesProduct,
    rating: 4.6,
    reviewCount: 123,
    category: "toiletries",
    isOnSale: true,
  },
  {
    id: "9",
    name: "Personal Care Starter Pack",
    price: 34.99,
    image: toiletriesProduct,
    rating: 4.3,
    reviewCount: 78,
    category: "toiletries",
  },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

const categoryTitles = {
  mattresses: "Mattresses",
  pillows: "Pillows",
  toiletries: "Toiletries",
};

const categoryDescriptions = {
  mattresses: "Premium mattresses designed for comfort and support in your dorm room",
  pillows: "Comfortable pillows for a good night's sleep during your college years",
  toiletries: "Essential toiletries and personal care items for student life",
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const categoryKey = category?.toLowerCase() as keyof typeof categoryTitles;
  const products = allProducts.filter(product => product.category === categoryKey);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: any) => {
    setCart(prev => [...prev, product.id]);
  };

  const handleToggleWishlist = (product: any) => {
    setWishlist(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  if (!categoryKey || !categoryTitles[categoryKey]) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground">The requested category does not exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{categoryTitles[categoryKey]}</h1>
            <p className="text-muted-foreground text-lg">{categoryDescriptions[categoryKey]}</p>
            <Badge variant="outline" className="mt-2">
              {products.length} products available
            </Badge>
          </div>
          
          {/* Sorting */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Showing {products.length} products
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isInWishlist={wishlist.includes(product.id)}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                We're currently restocking this category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}