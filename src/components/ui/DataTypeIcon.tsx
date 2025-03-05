
import React from 'react';
import { 
  Database, FileJson, FileSpreadsheet, FileText, 
  FileCode, Image, MessageSquare, LayoutGrid, 
  FileX, Layers, Network, BarChart 
} from 'lucide-react';
import { cn } from "@/lib/utils";

export type DataType = 
  | 'relational-db' 
  | 'json-xml' 
  | 'csv-tabular' 
  | 'semantic-web' 
  | 'knowledge-base'
  | 'metadata'
  | 'api-data'
  | 'text-docs'
  | 'natural-language'
  | 'images'
  | 'web-scraping'
  | 'sensor-data'
  | 'log-files'
  | 'social-network'
  | 'ml-outputs'
  | 'unknown';

interface DataTypeIconProps {
  type: DataType;
  className?: string;
  size?: number;
}

const DataTypeIcon: React.FC<DataTypeIconProps> = ({ 
  type, 
  className,
  size = 20
}) => {
  const getIcon = () => {
    switch (type) {
      case 'relational-db':
        return <Database size={size} />;
      case 'json-xml':
        return <FileJson size={size} />;
      case 'csv-tabular':
        return <FileSpreadsheet size={size} />;
      case 'semantic-web':
        return <Network size={size} />;
      case 'knowledge-base':
        return <Layers size={size} />;
      case 'metadata':
        return <LayoutGrid size={size} />;
      case 'api-data':
        return <FileCode size={size} />;
      case 'text-docs':
        return <FileText size={size} />;
      case 'natural-language':
        return <MessageSquare size={size} />;
      case 'images':
        return <Image size={size} />;
      case 'web-scraping':
        return <FileCode size={size} />;
      case 'sensor-data':
        return <BarChart size={size} />;
      case 'log-files':
        return <FileText size={size} />;
      case 'social-network':
        return <Network size={size} />;
      case 'ml-outputs':
        return <BarChart size={size} />;
      default:
        return <FileX size={size} />;
    }
  };

  return (
    <div className={cn("text-primary", className)}>
      {getIcon()}
    </div>
  );
};

export default DataTypeIcon;
