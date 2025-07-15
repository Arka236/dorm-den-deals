import { useState } from "react";
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
const products = [
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
    id: "2",
    name: "Premium Down Alternative Pillows (Set of 2)",
    price: 49.99,
    originalPrice: 69.99,
    image: pillowsProduct,
    rating: 4.6,
    reviewCount: 156,
    category: "Pillows",
    isOnSale: true,
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
  {
    id: "4",
    name: "Twin XL Memory Foam Mattress",
    price: 199.99,
    originalPrice: 249.99,
    image: mattressProduct,
    rating: 4.5,
    reviewCount: 234,
    category: "Mattresses",
    isOnSale: true,
  },
  {
    id: "5",
    name: "Ergonomic Memory Foam Pillow",
    price: 39.99,
    image: pillowsProduct,
    rating: 4.4,
    reviewCount: 67,
    category: "Pillows",
  },
  {
    id: "6",
    name: "Organic Bath & Body Set",
    price: 59.99,
    originalPrice: 79.99,
    image: toiletriesProduct,
    rating: 4.6,
    reviewCount: 123,
    category: "Toiletries",
    isOnSale: true,
  },
];

const categories = ["All", "Mattresses", "Pillows", "Toiletries"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">All Products</h1>
          
          {/* Filters & Sorting */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-smooth ${
                    selectedCategory === category 
                      ? "bg-gradient-primary text-primary-foreground" 
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Sorting */}
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

          {/* Load More */}
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="transition-smooth hover:bg-accent">
              Load More Products
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}