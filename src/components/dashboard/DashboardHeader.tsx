import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/hooks/useAuth";

export const DashboardHeader = () => {
  const { user } = useAuth();
  const buyerName = user?.email?.split('@')[0] || "Guest";

  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${buyerName}`} />
              <AvatarFallback>{buyerName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">
                {user ? `Welcome back, ${buyerName}!` : 'Welcome to Hosweb!'} 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                {user ? 'Ready to manage patients and appointments?' : 'Register patients and manage clinic tasks'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-secondary rounded-full animate-pulse" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuItem className="py-3">
                  <div>
                    <p className="font-medium">New patient registered</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3">
                  <div>
                    <p className="font-medium">Appointment scheduled</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3">
                  <div>
                    <p className="font-medium">Reminder: upcoming appointment</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
