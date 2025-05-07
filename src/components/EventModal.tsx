import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Coffee, 
  CheckCircle2, 
  XCircle, 
  BatteryFull, 
  BrainCircuit, 
  Heart, 
  TrendingUp, 
  CreditCard 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'productivity' | 'social' | 'burnout' | 'random';
  imageSrc?: string;
}

interface EventEffects {
  energyEffect: number;
  mentalEffect: number;
  physicalEffect: number;
  influenceEffect: number;
  moneyEffect: number;
}

interface EventModalProps {
  event: GameEvent | null;
  open: boolean;
  onClose: () => void;
  effects: EventEffects;
}

const EventModal: React.FC<EventModalProps> = ({
  event,
  open,
  onClose,
  effects
}) => {
  if (!event) return null;
  
  // Determine event icon based on type
  const EventIcon = () => {
    switch(event.type) {
      case 'productivity':
        return <Coffee className="h-5 w-5 text-amber-500" />;
      case 'social':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'burnout':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <EventIcon />
            {event.title}
          </DialogTitle>
          <DialogDescription>
            {event.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Effetti dell'evento */}
          {(effects.energyEffect !== 0 || effects.mentalEffect !== 0 || 
            effects.physicalEffect !== 0 || effects.influenceEffect !== 0 || 
            effects.moneyEffect !== 0) && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Effetti:</p>
              
              <div className="grid grid-cols-2 gap-3">
                {effects.energyEffect !== 0 && (
                  <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                    <div className="flex items-center gap-2">
                      <BatteryFull className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">Energia:</span>
                    </div>
                    <span className={`text-sm font-medium ${effects.energyEffect > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {effects.energyEffect > 0 ? `+${effects.energyEffect}` : effects.energyEffect}
                    </span>
                  </div>
                )}
                
                {effects.mentalEffect !== 0 && (
                  <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm">Mentale:</span>
                    </div>
                    <span className={`text-sm font-medium ${effects.mentalEffect > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {effects.mentalEffect > 0 ? `+${effects.mentalEffect}` : effects.mentalEffect}
                    </span>
                  </div>
                )}
                
                {effects.physicalEffect !== 0 && (
                  <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Fisico:</span>
                    </div>
                    <span className={`text-sm font-medium ${effects.physicalEffect > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {effects.physicalEffect > 0 ? `+${effects.physicalEffect}` : effects.physicalEffect}
                    </span>
                  </div>
                )}
                
                {effects.influenceEffect !== 0 && (
                  <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Influenza:</span>
                    </div>
                    <span className={`text-sm font-medium ${effects.influenceEffect > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {effects.influenceEffect > 0 ? `+${effects.influenceEffect}` : effects.influenceEffect}
                    </span>
                  </div>
                )}
                
                {effects.moneyEffect !== 0 && (
                  <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Soldi:</span>
                    </div>
                    <span className={`text-sm font-medium ${effects.moneyEffect > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {effects.moneyEffect > 0 ? `+${effects.moneyEffect.toFixed(2)}` : effects.moneyEffect.toFixed(2)} €
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {event.type === 'burnout' && (
            <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
              <p className="text-sm font-medium text-red-800 mb-2">Attenzione Burnout!</p>
              <p className="text-sm text-red-700">
                Stai spingendoti troppo oltre. Forse dovresti considerare di riposare un po'.
              </p>
            </div>
          )}
          
          {event.type === 'social' && (
            <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
              <p className="text-sm font-medium text-green-800 mb-2">Impatto Social:</p>
              <p className="text-sm text-green-700">
                Questo evento ha influenzato la tua presenza sui social media.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">Continua</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;