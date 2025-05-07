import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { addDays, format } from 'date-fns';
import { usePlayer } from './PlayerContext';

interface TimeContextType {
  currentDate: Date;
  currentTime: number; // 0-23 (ore)
  advanceTime: (hours: number) => void;
  advanceDay: () => void;
  isWorkday: boolean;
  isWeekend: boolean;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { profile, modifyEnergy, modifyMental, modifyPhysical, checkBurnout } = usePlayer();
  
  // Stato per data e ora correnti
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const savedDate = localStorage.getItem('mrnngrtneDate');
    return savedDate ? new Date(savedDate) : new Date();
  });
  
  const [currentTime, setCurrentTime] = useState<number>(() => {
    const savedTime = localStorage.getItem('mrnngrtneTime');
    return savedTime ? parseInt(savedTime, 10) : 5; // Inizia alle 5 del mattino
  });
  
  // Verifica se è un giorno lavorativo (Lun-Ven)
  const isWorkday = currentDate.getDay() >= 1 && currentDate.getDay() <= 5;
  
  // Verifica se è weekend (Sab-Dom)
  const isWeekend = !isWorkday;
  
  // Salva data e ora nel localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('mrnngrtneDate', currentDate.toISOString());
    localStorage.setItem('mrnngrtneTime', currentTime.toString());
  }, [currentDate, currentTime]);
  
  // Avanza il tempo di un certo numero di ore
  const advanceTime = (hours: number) => {
    setCurrentTime(prevTime => {
      let newTime = prevTime + hours;
      
      // Se superiamo le 23, passa al giorno successivo
      if (newTime >= 24) {
        advanceDay();
        newTime = newTime % 24;
      }
      
      return newTime;
    });
    
    // Effetti naturali del passare del tempo (stanchezza)
    if (profile) {
      // Perdita di energia nel tempo
      modifyEnergy(-2 * hours);
      
      // Lieve decadimento nel tempo del benessere mentale e fisico
      modifyMental(-1 * hours);
      modifyPhysical(-1 * hours);
      
      // Verifica se si verifica un burnout
      checkBurnout();
    }
  };
  
  // Avanza al giorno successivo
  const advanceDay = () => {
    // Passa al giorno successivo
    setCurrentDate(prevDate => addDays(prevDate, 1));
    
    // Reimposta l'ora a 5 del mattino
    setCurrentTime(5);
    
    // Ripristina parzialmente energia, benessere mentale e fisico
    if (profile) {
      modifyEnergy(50);
      modifyMental(20);
      modifyPhysical(20);
    }
  };
  
  const contextValue: TimeContextType = {
    currentDate,
    currentTime,
    advanceTime,
    advanceDay,
    isWorkday,
    isWeekend
  };
  
  return (
    <TimeContext.Provider value={contextValue}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = (): TimeContextType => {
  const context = useContext(TimeContext);
  if (context === undefined) {
    throw new Error('useTime must be used within a TimeProvider');
  }
  return context;
};

export default TimeContext;