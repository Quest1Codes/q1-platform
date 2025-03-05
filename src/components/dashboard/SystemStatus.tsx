
import React from 'react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import { Server, Database, Check, AlertTriangle, Clock, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from "@/lib/utils";

interface StatusItemProps {
  name: string;
  status: 'operational' | 'degraded' | 'issue';
  latency?: string;
  uptime?: string;
  icon: React.ElementType;
}

const StatusItem: React.FC<StatusItemProps> = ({ 
  name, 
  status, 
  latency, 
  uptime, 
  icon: Icon 
}) => {
  const statusColors = {
    operational: "text-success",
    degraded: "text-orange-500",
    issue: "text-destructive"
  };
  
  const statusLabels = {
    operational: "Operational",
    degraded: "Performance Degraded",
    issue: "Service Disruption"
  };
  
  const statusIcons = {
    operational: Check,
    degraded: Clock,
    issue: AlertTriangle
  };
  
  const StatusIcon = statusIcons[status];

  return (
    <div className="flex items-center p-3 border-b border-border last:border-0">
      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center mr-4">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium">{name}</h4>
          <div className={cn("flex items-center text-xs", statusColors[status])}>
            <StatusIcon className="h-3 w-3 mr-1" />
            <span>{statusLabels[status]}</span>
          </div>
        </div>
        <div className="flex text-xs text-muted-foreground mt-1">
          {latency && <span className="mr-4">Latency: {latency}</span>}
          {uptime && <span>Uptime: {uptime}</span>}
        </div>
      </div>
    </div>
  );
};

const ResourceMetric: React.FC<{
  name: string;
  currentValue: number;
  maxValue: number;
  unit: string;
}> = ({ name, currentValue, maxValue, unit }) => {
  const percentage = (currentValue / maxValue) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">
          {currentValue} / {maxValue} {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

const SystemStatus: React.FC = () => {
  const services = [
    { 
      name: "Query Engine", 
      status: "operational",
      latency: "120ms",
      uptime: "99.99%",
      icon: Activity
    },
    { 
      name: "Data Ingestion", 
      status: "operational",
      latency: "240ms",
      uptime: "99.95%",
      icon: Database
    },
    { 
      name: "API Gateway", 
      status: "degraded",
      latency: "580ms",
      uptime: "98.2%",
      icon: Server
    },
  ] as const;
  
  const metrics = [
    { name: "CPU Usage", currentValue: 42, maxValue: 100, unit: "%" },
    { name: "Memory Usage", currentValue: 6.2, maxValue: 16, unit: "GB" },
    { name: "Storage", currentValue: 156, maxValue: 500, unit: "GB" },
  ];

  return (
    <div className="space-y-6 fade-in">
      <GlassmorphicCard>
        <h3 className="text-lg font-semibold mb-4">System Status</h3>
        <div className="divide-y divide-border">
          {services.map((service, index) => (
            <StatusItem 
              key={index}
              name={service.name}
              status={service.status}
              latency={service.latency}
              uptime={service.uptime}
              icon={service.icon}
            />
          ))}
        </div>
      </GlassmorphicCard>
      
      <GlassmorphicCard>
        <h3 className="text-lg font-semibold mb-4">Resource Utilization</h3>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <ResourceMetric
              key={index}
              name={metric.name}
              currentValue={metric.currentValue}
              maxValue={metric.maxValue}
              unit={metric.unit}
            />
          ))}
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default SystemStatus;
