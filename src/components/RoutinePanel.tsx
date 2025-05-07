import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Trash2, 
  Plus, 
  MoreVertical, 
  Clock, 
  Battery, 
  Brain, 
  Heart, 
  TrendingUp 
} from 'lucide-react';
import { RoutineTask, ROUTINE_TASKS_TEMPLATES } from '@/contexts/PlayerContext';
import { useTime } from '@/contexts/TimeContext';
import { toast } from 'sonner';

interface RoutinePanelProps {
  routine: RoutineTask[];
  onAddTask: (task: Omit<RoutineTask, 'id' | 'isCompleted'>) => void;
  onRemoveTask: (id: string) => void;
}

const RoutinePanel: React.FC<RoutinePanelProps> = ({ routine, onAddTask, onRemoveTask }) => {
  const { currentTime } = useTime();
  
  const handleAddTask = (task: Omit<RoutineTask, 'id' | 'isCompleted'>) => {
    if (routine.length >= 6) {
      toast.error('La tua routine è già piena! Rimuovi un\'attività prima di aggiungerne una nuova.');
      return;
    }
    
    // Verifica se un'attività con lo stesso nome è già presente nella routine
    if (routine.some(t => t.name === task.name)) {
      toast.error(`${task.name} è già nella tua routine!`);
      return;
    }
    
    onAddTask(task);
    toast.success(`${task.name} aggiunto alla tua routine!`);
  };
  
  const handleRemoveTask = (id: string, name: string) => {
    onRemoveTask(id);
    toast.success(`${name} rimosso dalla tua routine.`);
  };
  
  return (
    <div className="space-y-4">
      {routine.length === 0 ? (
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-500 mb-2">Nessuna attività nella tua routine</p>
          <p className="text-sm text-gray-400">Aggiungi attività per iniziare la tua giornata produttiva!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {routine.map(task => (
            <Card key={task.id} className={`p-4 ${task.isCompleted ? 'bg-gray-100 opacity-70' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium flex items-center">
                    {task.name}
                    {task.isCompleted && (
                      <Badge variant="outline" className="ml-2 text-green-600">
                        Completato
                      </Badge>
                    )}
                  </h3>
                  
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{task.timeRequired} ora</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center gap-1 text-amber-600">
                        <Battery className="h-3 w-3" />
                        <span>-{task.energyCost}</span>
                      </div>
                      
                      {task.mentalEffect !== 0 && (
                        <div className="flex items-center gap-1 text-indigo-600">
                          <Brain className="h-3 w-3" />
                          <span>{task.mentalEffect > 0 ? '+' : ''}{task.mentalEffect}</span>
                        </div>
                      )}
                      
                      {task.physicalEffect !== 0 && (
                        <div className="flex items-center gap-1 text-red-600">
                          <Heart className="h-3 w-3" />
                          <span>{task.physicalEffect > 0 ? '+' : ''}{task.physicalEffect}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span>+{task.influenceGain}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleRemoveTask(task.id, task.name)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Rimuovi
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi attività
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {ROUTINE_TASKS_TEMPLATES.map((task, index) => (
              <DropdownMenuItem 
                key={index} 
                onClick={() => handleAddTask(task)}
                disabled={routine.some(t => t.name === task.name)}
              >
                {task.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default RoutinePanel;