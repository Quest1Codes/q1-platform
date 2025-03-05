
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, Settings, Menu } from 'lucide-react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "w-full px-4 h-16 flex items-center justify-between glass-effect sticky top-0 z-50",
      className
    )}>
      <div className="flex items-center">
        <SidebarTrigger className="mr-2 lg:hidden">
          <Menu className="w-5 h-5" />
        </SidebarTrigger>
        <AnimatedLogo />
        <div className="hidden md:flex ml-4 text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
          Developer Preview
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <HelpCircle className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="outline" className="ml-2 hidden md:flex">
          API Docs
        </Button>
      </div>
    </header>
  );
};

export default Header;
