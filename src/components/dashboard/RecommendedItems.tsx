import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const items = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    badge: "Trending",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: "$299.99",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    badge: "Popular",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    badge: "New",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Designer Backpack",
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    badge: "Sale",
    rating: 4.6,
  },
];

export const RecommendedItems = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <Card
            key={item.id}
            className="group border-none shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                  {item.badge}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-1">{item.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-muted-foreground">{item.rating}</span>
                  </div>
                </div>
                <Button className="w-full group/btn" size="sm">
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
