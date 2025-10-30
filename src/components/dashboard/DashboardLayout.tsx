import { useState } from "react";
import { Home, ShoppingBag, Heart, MessageSquare, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: ShoppingBag, label: "My Orders", href: "/orders" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarOpen ? "w-64" : "w-0"} md:translate-x-0 md:w-64`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-8 mt-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BuyerHub
            </h2>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground px-4">© 2025 BuyerHub</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};
