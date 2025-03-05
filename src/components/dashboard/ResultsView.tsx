
import React from 'react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import { BarChart as ChartIcon, PieChart, LineChart, ArrowDown, ArrowUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { cn } from "@/lib/utils";

const data = [
  { name: 'JSON/XML', value: 427, delta: 12 },
  { name: 'Relational DB', value: 356, delta: -8 },
  { name: 'Text Docs', value: 289, delta: 23 },
  { name: 'CSV/Tabular', value: 254, delta: 5 },
  { name: 'API Data', value: 189, delta: 18 },
  { name: 'Images', value: 143, delta: -3 },
];

const StatCard: React.FC<{
  title: string;
  value: string | number;
  delta?: number;
  icon: React.ElementType;
  className?: string;
}> = ({ title, value, delta, icon: Icon, className }) => {
  return (
    <GlassmorphicCard className={cn("flex flex-col h-full", className)}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">{value}</span>
        {delta !== undefined && (
          <span className={cn(
            "ml-2 text-xs font-medium flex items-center",
            delta > 0 ? "text-success" : delta < 0 ? "text-destructive" : "text-muted-foreground"
          )}>
            {delta > 0 ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : delta < 0 ? (
              <ArrowDown className="h-3 w-3 mr-1" />
            ) : null}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
    </GlassmorphicCard>
  );
};

const ResultsView: React.FC = () => {
  const statCards = [
    { title: "Total Data Sources", value: 1658, delta: 8, icon: PieChart },
    { title: "Active Queries", value: 284, delta: 12, icon: LineChart },
    { title: "Avg. Response Time", value: "1.2s", delta: -5, icon: ChartIcon },
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((card, index) => (
          <StatCard 
            key={index}
            title={card.title}
            value={card.value}
            delta={card.delta}
            icon={card.icon}
          />
        ))}
      </div>
      
      <GlassmorphicCard className="p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Data Source Distribution</h3>
              <p className="text-sm text-muted-foreground">
                Insights across different data types
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-3 w-3" />
              <span className="text-xs">Expand</span>
            </Button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsla(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: 'hsla(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: 'hsla(var(--border))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsla(var(--card))', 
                    borderColor: 'hsla(var(--border))',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Data Points" 
                  radius={[4, 4, 0, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsla(${265 + index * 10}, 70%, 70%, 0.9)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default ResultsView;
