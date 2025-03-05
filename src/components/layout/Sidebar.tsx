
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Home, Database, UploadCloud, Search, 
  BarChart, Code, Settings, HelpCircle 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

const mainMenuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Database, label: "Data Sources", path: "#data-sources" },
  { icon: UploadCloud, label: "Data Ingestion", path: "#data-ingestion" },
  { icon: Search, label: "Query Interface", path: "#query" },
  { icon: BarChart, label: "Analytics", path: "#analytics" },
  { icon: Code, label: "API Access", path: "#api" },
];

const secondaryMenuItems = [
  { icon: Settings, label: "Settings", path: "#settings" },
  { icon: HelpCircle, label: "Help & Support", path: "#help" },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="h-16 flex items-center px-4">
        {/* Empty header to match the main header height */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.path}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.path}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          Quest1 Platform v0.1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
