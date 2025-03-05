
import React, { useState } from 'react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, Check, FileText, Database, Code, Image } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import DataTypeIcon, { DataType } from '@/components/ui/DataTypeIcon';

interface DataSourceCardProps {
  title: string;
  description: string;
  type: DataType;
  onClick: () => void;
}

const DataSourceCard: React.FC<DataSourceCardProps> = ({ title, description, type, onClick }) => {
  return (
    <GlassmorphicCard 
      className="cursor-pointer h-full transition-all hover:translate-y-[-5px]"
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-2">
          <DataTypeIcon type={type} />
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <p className="text-xs text-muted-foreground flex-grow">{description}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 text-xs"
        >
          <UploadCloud className="w-3 h-3 mr-1" />
          Select Files
        </Button>
      </div>
    </GlassmorphicCard>
  );
};

interface UploadAreaProps {
  activeTab: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({ activeTab }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle the dropped files here
  };

  return (
    <div 
      className={cn(
        "border-2 border-dashed rounded-lg p-8 transition-all duration-300 text-center",
        isDragging 
          ? "border-primary bg-primary/5" 
          : "border-border"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {activeTab === "structured" && (
        <div className="flex flex-col items-center">
          <Database className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Structured Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop CSV, JSON, XML, or database exports
          </p>
        </div>
      )}
      
      {activeTab === "unstructured" && (
        <div className="flex flex-col items-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Unstructured Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop text documents, PDFs, or images
          </p>
        </div>
      )}
      
      {activeTab === "api" && (
        <div className="flex flex-col items-center">
          <Code className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Connect API Source</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter API endpoint details or upload API specifications
          </p>
        </div>
      )}
      
      <Button variant="outline">
        <UploadCloud className="mr-2 h-4 w-4" />
        Select Files
      </Button>
    </div>
  );
};

const RecentUploads = () => {
  const uploads = [
    { name: "customer_data.csv", type: "csv-tabular", progress: 100, size: "2.4 MB" },
    { name: "product_catalog.json", type: "json-xml", progress: 100, size: "8.1 MB" },
    { name: "user_feedback.txt", type: "text-docs", progress: 70, size: "1.2 MB" },
    { name: "system_logs.log", type: "log-files", progress: 30, size: "4.7 MB" },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-4">Recent Uploads</h3>
      <div className="space-y-3">
        {uploads.map((upload, index) => (
          <div key={index} className="flex items-center gap-4 bg-background/50 p-3 rounded-md">
            <DataTypeIcon type={upload.type as DataType} size={16} />
            <div className="flex-grow">
              <div className="flex justify-between mb-1">
                <span className="text-sm">{upload.name}</span>
                <span className="text-xs text-muted-foreground">{upload.size}</span>
              </div>
              <Progress value={upload.progress} className="h-1" />
            </div>
            {upload.progress === 100 ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <span className="text-xs text-muted-foreground">{upload.progress}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const DataIngestion: React.FC = () => {
  const structuredSources = [
    { 
      title: "Relational Database", 
      description: "Connect to SQL databases like PostgreSQL, MySQL, SQL Server", 
      type: "relational-db" 
    },
    { 
      title: "JSON & XML Data", 
      description: "Ingest structured data in JSON or XML format", 
      type: "json-xml"
    },
    { 
      title: "CSV & Tabular", 
      description: "Import data from spreadsheets and CSV files", 
      type: "csv-tabular"
    },
    { 
      title: "API Data", 
      description: "Connect to REST or GraphQL APIs", 
      type: "api-data"
    },
  ];

  const unstructuredSources = [
    { 
      title: "Text Documents", 
      description: "Import PDFs, Word docs, and plain text files", 
      type: "text-docs"
    },
    { 
      title: "Images & Media", 
      description: "Process images and extract data from visual content", 
      type: "images"
    },
    { 
      title: "Log Files", 
      description: "Analyze application, server, and system log files", 
      type: "log-files"
    },
    { 
      title: "Web Content", 
      description: "Scrape and extract data from websites", 
      type: "web-scraping"
    },
  ];

  const [selectedTab, setSelectedTab] = useState("structured");

  return (
    <div className="space-y-6 fade-in">
      <GlassmorphicCard>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Data Ingestion</h2>
          <p className="text-sm text-muted-foreground">
            Import structured and unstructured data into the Quest1 platform
          </p>
          
          <Tabs 
            defaultValue="structured" 
            className="mt-6"
            onValueChange={setSelectedTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="structured">Structured Data</TabsTrigger>
              <TabsTrigger value="unstructured">Unstructured Data</TabsTrigger>
              <TabsTrigger value="api">API Connections</TabsTrigger>
            </TabsList>
            
            <TabsContent value="structured" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {structuredSources.map((source, index) => (
                  <DataSourceCard
                    key={index}
                    title={source.title}
                    description={source.description}
                    type={source.type as DataType}
                    onClick={() => {}}
                  />
                ))}
              </div>
              
              <UploadArea activeTab="structured" />
            </TabsContent>
            
            <TabsContent value="unstructured" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {unstructuredSources.map((source, index) => (
                  <DataSourceCard
                    key={index}
                    title={source.title}
                    description={source.description}
                    type={source.type as DataType}
                    onClick={() => {}}
                  />
                ))}
              </div>
              
              <UploadArea activeTab="unstructured" />
            </TabsContent>
            
            <TabsContent value="api" className="mt-4">
              <UploadArea activeTab="api" />
            </TabsContent>
          </Tabs>
          
          <RecentUploads />
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default DataIngestion;

// Add the import for cn
import { cn } from "@/lib/utils";
