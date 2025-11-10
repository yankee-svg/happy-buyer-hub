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
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/useAuth";

export const DashboardHeader = () => {
  const { user } = useAuth();
  const userEmail = user?.email || '';
  const buyerName = userEmail.split('@')[0] || "Guest";

  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-primary/20 flex-shrink-0">
              <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${buyerName}`} />
              <AvatarFallback className="bg-primary/10 text-primary">{buyerName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-xl font-semibold truncate">
                {user ? `Welcome back, ${buyerName}!` : 'Welcome to Hosweb!'}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                {user ? 'Ready to manage patients and appointments?' : 'Register patients and manage clinic tasks'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-secondary rounded-full animate-pulse" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 sm:w-80">
                <DropdownMenuItem className="py-3">
                  <div>
                    <p className="font-medium text-sm">New patient registered</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3">
                  <div>
                    <p className="font-medium text-sm">Appointment scheduled</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3">
                  <div>
                    <p className="font-medium text-sm">Reminder: upcoming appointment</p>
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
