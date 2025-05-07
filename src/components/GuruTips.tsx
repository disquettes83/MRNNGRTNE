import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface GuruTipsProps {
  currentTip: string;
}

const GuruTips: React.FC<GuruTipsProps> = ({ currentTip }) => {
  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <Lightbulb className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-800 text-lg mb-1">Consiglio del Guru</h3>
            <p className="text-sm text-indigo-700 italic">
              "{currentTip}"
            </p>
            <div className="mt-2 text-right">
              <span className="text-xs text-indigo-500 font-medium">
                - La Voce della Produttività™
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuruTips;