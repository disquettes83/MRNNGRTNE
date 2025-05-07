import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, CheckSquare, ShoppingBag, AlertCircle, Wallet } from 'lucide-react';

interface StatsDisplayProps {
  stats: {
    daysCompleted: number;
    tasksCompleted: number;
    productsOwned: number;
    totalSpent: number;
    burnoutCount: number;
  };
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="pt-6">
        <h3 className="text-lg font-bold mb-4">Statistiche</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm">Giorni completati:</span>
            </div>
            <span className="text-sm font-medium">{stats.daysCompleted}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">Task completati:</span>
            </div>
            <span className="text-sm font-medium">{stats.tasksCompleted}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm">Prodotti acquistati:</span>
            </div>
            <span className="text-sm font-medium">{stats.productsOwned}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm">Soldi spesi:</span>
            </div>
            <span className="text-sm font-medium">{stats.totalSpent.toFixed(2)} €</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm">Episodi di burnout:</span>
            </div>
            <span className="text-sm font-medium">{stats.burnoutCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsDisplay;