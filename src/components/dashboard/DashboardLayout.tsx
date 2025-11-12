import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Heart, MessageSquare, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: ShoppingBag, label: "My Appointments", href: "/orders" },
  { icon: Heart, label: "Doctors", href: "/doctors" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopVisible, setDesktopVisible] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-card/80 backdrop-blur-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop toggle button - outside sidebar, only shows when sidebar is hidden */}
      {!desktopVisible && (
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex fixed top-4 left-4 z-50 bg-card/80 backdrop-blur-sm"
          onClick={() => setDesktopVisible(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen bg-card border-r border-border transition-transform duration-300 w-64 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:z-40 ${desktopVisible ? 'md:translate-x-0' : 'md:-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto">
          <div className="mb-8 mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-primary">Hosweb</h2>
            </div>
            {/* Desktop close button inside sidebar */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setDesktopVisible(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-colored' 
                      : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                  }`}
                  onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-border space-y-3">
            <div className="px-4 space-y-2">
              <p className="text-xs font-medium text-foreground/80">Contact Us</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ support@hosweb.com</p>
                <p>📍 123 Medical Center Dr.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground px-4">© 2025 Hosweb</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`transition-all duration-300 ${desktopVisible ? 'md:ml-64' : 'md:ml-0'}`}>
        {children}
      </main>
    </div>
  );
};