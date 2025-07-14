import { useState } from "react";
import { 
  Home, 
  Package, 
  User, 
  Heart, 
  Settings, 
  ChevronDown,
  Bed,
  Heart as PillowIcon,
  Droplets
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Home", href: "/", icon: Home, current: true },
  { name: "Orders", href: "/orders", icon: Package, current: false },
  { name: "Account", href: "/account", icon: User, current: false },
  { name: "Wishlist", href: "/wishlist", icon: Heart, current: false },
];

const categories = [
  {
    name: "Mattresses",
    icon: Bed,
    subcategories: ["Memory Foam", "Spring", "Hybrid", "Air Mattress"]
  },
  {
    name: "Pillows",
    icon: PillowIcon,
    subcategories: ["Memory Foam", "Down", "Synthetic", "Ergonomic"]
  },
  {
    name: "Toiletries",
    icon: Droplets,
    subcategories: ["Bathroom Essentials", "Oral Care", "Hair Care", "Skin Care"]
  }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-80 transform bg-background border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className="relative flex h-full w-80 flex-col bg-background">
        {/* Sidebar header */}
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              CollegeEssentials
            </span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          {/* Main Navigation */}
          <div className="space-y-2">
            <h2 className="mb-2 px-2 text-lg font-semibold text-foreground">
              Navigation
            </h2>
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.current ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start transition-smooth",
                  item.current && "bg-gradient-primary text-primary-foreground shadow-md"
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          {/* Categories */}
          <div className="mt-8 space-y-2">
            <h2 className="mb-2 px-2 text-lg font-semibold text-foreground">
              Categories
            </h2>
            {categories.map((category) => (
              <Collapsible
                key={category.name}
                open={openCategories.includes(category.name)}
                onOpenChange={() => toggleCategory(category.name)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between transition-smooth hover:bg-accent"
                  >
                    <div className="flex items-center">
                      <category.icon className="mr-3 h-5 w-5" />
                      {category.name}
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openCategories.includes(category.name) && "rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pl-8">
                  {category.subcategories.map((subcategory) => (
                    <Button
                      key={subcategory}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm transition-smooth hover:bg-accent"
                    >
                      {subcategory}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start transition-smooth">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}