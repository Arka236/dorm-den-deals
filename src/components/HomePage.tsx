import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "./ProductCard";
import heroBanner from "@/assets/hero-banner.jpg";
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

export function HomePage() {
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={heroBanner}
          alt="College Essentials Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Your College
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Comfort Zone
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in">
              Premium mattresses, pillows, and toiletries designed for student life
            </p>
            <Button size="lg" className="button-gradient text-lg px-8 py-6 animate-fade-in">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Filters & Sorting */}
      <section className="container py-8">
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
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $75 directly to your dorm
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">
                30-day return policy on all products, no questions asked
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Student Discounts</h3>
              <p className="text-muted-foreground">
                Special pricing for verified college students
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}