import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      title: 'Premium Headphones',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      inStock: true,
    },
    {
      id: 2,
      title: 'Smart Watch',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      inStock: true,
    },
    {
      id: 3,
      title: 'Laptop Stand',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      inStock: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                <CardDescription>
                  {item.inStock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1" disabled={!item.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Book Service
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wishlist;
