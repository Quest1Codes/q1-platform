
import React, { useState } from 'react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Search, Sparkles, AlertCircle, Code, Copy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const QueryInterface: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const handleSearch = () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };
  
  const exampleQueries = [
    "How many customers purchased product X in the last quarter?",
    "Summarize the sentiment from customer feedback in March",
    "Which data sources contain information about product returns?",
    "What are the common issues reported in system logs?",
  ];

  return (
    <div className="space-y-6 fade-in">
      <GlassmorphicCard>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Query Interface</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Ask questions in plain English to extract insights from your data
          </p>
          
          <div className="flex flex-col space-y-2">
            <Textarea
              placeholder="Enter your query in plain English... (e.g., 'Show me sales trends for the past 6 months')"
              className="min-h-[120px] resize-none bg-background/60 text-base"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Press Shift + Enter to run query
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={!query.trim() || isProcessing}
                className="gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Run Query
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {!query && !showResult && (
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                Example Queries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exampleQueries.map((example, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4 text-left"
                    onClick={() => setQuery(example)}
                  >
                    <span className="text-sm">{example}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {showResult && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-medium">Results</h3>
                <Tabs defaultValue="natural">
                  <TabsList className="h-8">
                    <TabsTrigger value="natural" className="text-xs px-3">Natural</TabsTrigger>
                    <TabsTrigger value="structured" className="text-xs px-3">Structured</TabsTrigger>
                    <TabsTrigger value="raw" className="text-xs px-3">Raw Data</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <TabsContent value="natural" className="mt-2 space-y-3">
                <GlassmorphicCard variant="purple" className="p-6">
                  <div className="prose prose-sm max-w-none">
                    <p>Based on the customer purchase data across the last quarter, Product X has seen a <strong>15% increase in sales</strong> compared to the previous quarter. Total of <strong>1,248 units</strong> were sold to <strong>872 unique customers</strong>.</p>
                    
                    <p className="mt-4">Key insights:</p>
                    <ul className="mt-2">
                      <li>65% of purchases were made by returning customers</li>
                      <li>The highest sales volume occurred in March (462 units)</li>
                      <li>Customer satisfaction rating for this product is 4.2/5</li>
                    </ul>
                    
                    <p className="mt-4 text-sm text-muted-foreground">Data sources: CRM database, sales transactions, customer feedback</p>
                  </div>
                </GlassmorphicCard>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Copy className="h-3 w-3" />
                    <span className="text-xs">Copy</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Code className="h-3 w-3" />
                    <span className="text-xs">API Call</span>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="structured" className="mt-2">
                <GlassmorphicCard className="overflow-hidden p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium">Month</th>
                          <th className="px-4 py-3 text-left font-medium">Units Sold</th>
                          <th className="px-4 py-3 text-left font-medium">Unique Customers</th>
                          <th className="px-4 py-3 text-left font-medium">Revenue</th>
                          <th className="px-4 py-3 text-left font-medium">Satisfaction</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-border">
                          <td className="px-4 py-3">January</td>
                          <td className="px-4 py-3">386</td>
                          <td className="px-4 py-3">275</td>
                          <td className="px-4 py-3">$19,300</td>
                          <td className="px-4 py-3">4.1</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="px-4 py-3">February</td>
                          <td className="px-4 py-3">400</td>
                          <td className="px-4 py-3">312</td>
                          <td className="px-4 py-3">$20,000</td>
                          <td className="px-4 py-3">4.0</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="px-4 py-3">March</td>
                          <td className="px-4 py-3">462</td>
                          <td className="px-4 py-3">285</td>
                          <td className="px-4 py-3">$23,100</td>
                          <td className="px-4 py-3">4.5</td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-muted/30">
                        <tr className="border-t border-border">
                          <td className="px-4 py-3 font-medium">Total</td>
                          <td className="px-4 py-3 font-medium">1,248</td>
                          <td className="px-4 py-3 font-medium">872</td>
                          <td className="px-4 py-3 font-medium">$62,400</td>
                          <td className="px-4 py-3 font-medium">4.2</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </GlassmorphicCard>
              </TabsContent>
              
              <TabsContent value="raw" className="mt-2">
                <GlassmorphicCard className="bg-secondary/5 p-4">
                  <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`{
  "query_results": {
    "product_x_sales": {
      "total_units": 1248,
      "unique_customers": 872,
      "quarterly_growth": 0.15,
      "monthly_breakdown": [
        { "month": "January", "units": 386, "customers": 275, "revenue": 19300, "satisfaction": 4.1 },
        { "month": "February", "units": 400, "customers": 312, "revenue": 20000, "satisfaction": 4.0 },
        { "month": "March", "units": 462, "customers": 285, "revenue": 23100, "satisfaction": 4.5 }
      ],
      "customer_segments": {
        "returning": 0.65,
        "new": 0.35
      },
      "data_sources": ["crm_database", "sales_transactions", "customer_feedback"]
    }
  },
  "metadata": {
    "execution_time": "1.24s",
    "confidence_score": 0.92,
    "generated_timestamp": "2023-07-15T14:22:31Z"
  }
}`}
                  </pre>
                </GlassmorphicCard>
              </TabsContent>
            </div>
          )}
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default QueryInterface;
