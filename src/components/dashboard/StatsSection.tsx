import { ShoppingCart, Package, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: ShoppingCart,
    label: "Medicines Purchased",
    value: "42",
    change: "+12%",
    positive: true,
  },
  {
    icon: Package,
    label: "Active Appointments",
    value: "3",
    change: "2 upcoming today",
    positive: true,
  },
  {
    icon: Star,
    label: "Preferred Doctors",
    value: "5",
    change: "Most visited",
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Insurance Balance",
    value: "$2,500",
    change: "Remaining",
    positive: true,
  },
];

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="border-none shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p
                    className={`text-sm font-medium ${
                      stat.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
