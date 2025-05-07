import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Check } from 'lucide-react';
import { useTime } from '@/contexts/TimeContext';
import { usePlayer } from '@/contexts/PlayerContext';

const timeSlots = [
  { hour: 5, label: '5:00 AM' },
  { hour: 6, label: '6:00 AM' },
  { hour: 7, label: '7:00 AM' },
  { hour: 8, label: '8:00 AM' },
  { hour: 9, label: '9:00 AM' },
  { hour: 10, label: '10:00 AM' },
  { hour: 11, label: '11:00 AM' },
  { hour: 12, label: '12:00 PM' }
];

const DailySchedule: React.FC = () => {
  const { currentTime } = useTime();
  const { profile, completeRoutineTask } = usePlayer();
  
  if (!profile) return null;
  
  const handleCompleteTask = (taskId: string) => {
    completeRoutineTask(taskId);
  };
  
  // Identifica quali attività sono programmate per quale ora
  const scheduleMap: Record<number, typeof profile.routine[0][]> = {};
  
  // Inizializza la mappa con array vuoti
  timeSlots.forEach(slot => {
    scheduleMap[slot.hour] = [];
  });
  
  // Distribuisci le attività nelle fasce orarie
  profile.routine.forEach((task, index) => {
    const hourSlot = 5 + index; // Distribuzione semplificata: una attività per ora partendo dalle 5
    if (hourSlot <= 12) { // Non andiamo oltre mezzogiorno
      scheduleMap[hourSlot].push(task);
    }
  });
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Programma Giornaliero</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {timeSlots.map(slot => {
            const isPast = slot.hour < currentTime;
            const isCurrent = slot.hour === currentTime;
            const tasks = scheduleMap[slot.hour];
            
            return (
              <div 
                key={slot.hour} 
                className={`p-2 rounded-md ${isCurrent ? 'bg-amber-50 border border-amber-200' : 
                  isPast ? 'bg-gray-100 opacity-70' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <Clock className={`h-4 w-4 mr-2 ${isCurrent ? 'text-amber-500' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${isCurrent ? 'text-amber-800' : ''}`}>
                      {slot.label}
                    </span>
                  </div>
                  {isCurrent && (
                    <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                      Ora attuale
                    </span>
                  )}
                </div>
                
                <div className="pl-6">
                  {tasks.length > 0 ? (
                    tasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between mt-1">
                        <span className={`text-sm ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                          {task.name}
                        </span>
                        
                        {!task.isCompleted && isCurrent && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-7 px-2 text-xs"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Completa
                          </Button>
                        )}
                        
                        {task.isCompleted && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">Nessuna attività</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySchedule;