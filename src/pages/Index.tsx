
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DataIngestion from "@/components/dashboard/DataIngestion";
import QueryInterface from "@/components/dashboard/QueryInterface";
import ResultsView from "@/components/dashboard/ResultsView";
import SystemStatus from "@/components/dashboard/SystemStatus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Info } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <div className="flex-1 overflow-auto p-4 md:p-6 pb-16">
            <div className="max-w-[1400px] mx-auto space-y-6">
              <GlassmorphicCard variant="purple" className="mb-6 p-5">
                <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
                  <div className="flex-grow">
                    <h1 className="text-2xl font-bold mb-2">Quest1 Platform</h1>
                    <p className="text-sm text-muted-foreground">
                      A GenAI based RAG platform that ingests structured and unstructured data for natural language querying
                    </p>
                  </div>
                  
                  <div className="flex items-center bg-primary/10 text-xs text-primary px-3 py-1.5 rounded-full gap-1.5">
                    <Info className="h-3.5 w-3.5" />
                    <span>System is learning from your data</span>
                  </div>
                </div>
              </GlassmorphicCard>
              
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <TabsList className="bg-background/60 p-1 w-full justify-start border-b border-border rounded-none overflow-x-auto flex-nowrap">
                  <TabsTrigger value="overview" className="rounded-md">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="data" className="rounded-md">
                    Data Ingestion
                  </TabsTrigger>
                  <TabsTrigger value="query" className="rounded-md">
                    Query Interface
                  </TabsTrigger>
                  <TabsTrigger value="system" className="rounded-md">
                    System Status
                  </TabsTrigger>
                  <TabsTrigger value="api" className="rounded-md">
                    API Access
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <ResultsView />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <QueryInterface />
                    </div>
                    <div className="space-y-6">
                      <SystemStatus />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="data" className="space-y-6">
                  <DataIngestion />
                </TabsContent>
                
                <TabsContent value="query" className="space-y-6">
                  <QueryInterface />
                </TabsContent>
                
                <TabsContent value="system" className="space-y-6">
                  <SystemStatus />
                </TabsContent>
                
                <TabsContent value="api" className="space-y-6">
                  <GlassmorphicCard>
                    <h2 className="text-xl font-semibold mb-4">API Documentation</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Integrate with Quest1 platform using our REST APIs
                    </p>
                    
                    <div className="prose prose-sm max-w-none">
                      <p>API endpoint base URL: <code>https://api.quest1.io/v1</code></p>
                      
                      <h3 className="mt-6 mb-3 text-lg font-medium">Authentication</h3>
                      <p>All API requests require an API key that should be included in the header:</p>
                      <pre className="bg-secondary/5 p-3 rounded-md text-xs overflow-x-auto">
                        Authorization: Bearer YOUR_API_KEY
                      </pre>
                      
                      <h3 className="mt-6 mb-3 text-lg font-medium">Available Endpoints</h3>
                      
                      <ul className="mt-4 space-y-4">
                        <li>
                          <strong>GET /data-sources</strong>
                          <p className="mt-1">List all available data sources</p>
                        </li>
                        <li>
                          <strong>POST /query</strong>
                          <p className="mt-1">Send a natural language query and receive structured results</p>
                        </li>
                        <li>
                          <strong>POST /ingest</strong>
                          <p className="mt-1">Ingest new data into the platform</p>
                        </li>
                        <li>
                          <strong>GET /system/status</strong>
                          <p className="mt-1">Get the current system status</p>
                        </li>
                      </ul>
                    </div>
                  </GlassmorphicCard>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
