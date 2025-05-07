import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateRandomName } from '@/lib/utils';

interface Profile {
  name: string;
  age: number;
  avatar: string;
  balance: number;
  energy: number;
  mental: number;
  physical: number;
  influence: number;
  routine: RoutineTask[];
  products: Product[];
}

export interface RoutineTask {
  id: string;
  name: string;
  timeRequired: number;
  energyCost: number;
  mentalEffect: number;
  physicalEffect: number;
  influenceGain: number;
  isCompleted: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  energyEffect: number;
  mentalEffect: number;
  physicalEffect: number;
  influenceEffect: number;
  image: string;
  isPurchased: boolean;
}

interface PlayerContextType {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  resetProfile: () => void;
  modifyBalance: (amount: number) => void;
  modifyEnergy: (amount: number) => void;
  modifyMental: (amount: number) => void;
  modifyPhysical: (amount: number) => void;
  modifyInfluence: (amount: number) => void;
  addRoutineTask: (task: Omit<RoutineTask, 'id' | 'isCompleted'>) => void;
  removeRoutineTask: (id: string) => void;
  completeRoutineTask: (id: string) => void;
  purchaseProduct: (product: Product) => boolean;
  checkBurnout: () => { burnout: boolean; severity: 'mild' | 'moderate' | 'severe' };
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Lista di prodotti disponibili nel gioco
export const AVAILABLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Matcha Premium',
    description: 'Il superalimento preferito dagli influencer!',
    price: 49.99,
    energyEffect: 5,
    mentalEffect: 2,
    physicalEffect: 0,
    influenceEffect: 10,
    image: '/images/matcha.jpg',
    isPurchased: false
  },
  {
    id: 'prod-2',
    name: 'Power Journal',
    description: 'Aumenta la tua produttività con questo journal strutturato',
    price: 39.99,
    energyEffect: 0,
    mentalEffect: 8,
    physicalEffect: 0,
    influenceEffect: 5,
    image: '/images/journal.jpg',
    isPurchased: false
  },
  {
    id: 'prod-3',
    name: 'Tappetino Yoga Esclusivo',
    description: 'In fibra di bambù e cristalli energizzanti',
    price: 129.99,
    energyEffect: 0,
    mentalEffect: 5,
    physicalEffect: 8,
    influenceEffect: 15,
    image: '/images/yoga-mat.jpg',
    isPurchased: false
  },
  {
    id: 'prod-4',
    name: 'Sveglia Intelligente',
    description: 'Si sincronizza con il tuo ciclo di sonno per un risveglio ottimale',
    price: 89.99,
    energyEffect: 10,
    mentalEffect: 5,
    physicalEffect: 2,
    influenceEffect: 5,
    image: '/images/alarm.jpg',
    isPurchased: false
  },
  {
    id: 'prod-5',
    name: 'Diffusore Aromaterapico',
    description: 'Con oli essenziali per aumentare la concentrazione',
    price: 79.99,
    energyEffect: 3,
    mentalEffect: 10,
    physicalEffect: 0,
    influenceEffect: 8,
    image: '/images/diffuser.jpg',
    isPurchased: false
  },
  {
    id: 'prod-6',
    name: 'Corso "Sveglia da vero leader"',
    description: 'Impara le tecniche dei CEO di successo',
    price: 299.99,
    energyEffect: 0,
    mentalEffect: 15,
    physicalEffect: 0,
    influenceEffect: 25,
    image: '/images/course.jpg',
    isPurchased: false
  }
];

// Lista di attività disponibili per la routine
export const ROUTINE_TASKS_TEMPLATES: Omit<RoutineTask, 'id' | 'isCompleted'>[] = [
  {
    name: 'Meditazione matutina',
    timeRequired: 1,
    energyCost: 5,
    mentalEffect: 15,
    physicalEffect: 0,
    influenceGain: 5
  },
  {
    name: 'Allenamento HIIT',
    timeRequired: 1,
    energyCost: 20,
    mentalEffect: 5,
    physicalEffect: 20,
    influenceGain: 10
  },
  {
    name: 'Giornaling',
    timeRequired: 1,
    energyCost: 10,
    mentalEffect: 10,
    physicalEffect: 0,
    influenceGain: 5
  },
  {
    name: 'Visualizzazione obiettivi',
    timeRequired: 1,
    energyCost: 5,
    mentalEffect: 10,
    physicalEffect: 0,
    influenceGain: 2
  },
  {
    name: 'Doccia fredda',
    timeRequired: 1,
    energyCost: 15,
    mentalEffect: 15,
    physicalEffect: 10,
    influenceGain: 15
  },
  {
    name: 'Lettura libro sviluppo personale',
    timeRequired: 1,
    energyCost: 15,
    mentalEffect: 20,
    physicalEffect: 0,
    influenceGain: 8
  },
  {
    name: 'Preparazione smoothie proteico',
    timeRequired: 1,
    energyCost: 8,
    mentalEffect: 0,
    physicalEffect: 12,
    influenceGain: 8
  },
  {
    name: 'Skin care routine',
    timeRequired: 1,
    energyCost: 5,
    mentalEffect: 5,
    physicalEffect: 5,
    influenceGain: 12
  },
  {
    name: 'Post motivazionale',
    timeRequired: 1,
    energyCost: 10,
    mentalEffect: 0,
    physicalEffect: 0,
    influenceGain: 25
  },
  {
    name: 'Yoga all\'alba',
    timeRequired: 1,
    energyCost: 15,
    mentalEffect: 15,
    physicalEffect: 15,
    influenceGain: 20
  }
];

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<Profile | null>(null);

  // Carica il profilo dal localStorage all'avvio
  useEffect(() => {
    const savedProfile = localStorage.getItem('mrnngrtneProfile');
    if (savedProfile) {
      setProfileState(JSON.parse(savedProfile));
    }
  }, []);

  // Salva il profilo nel localStorage quando cambia
  useEffect(() => {
    if (profile) {
      localStorage.setItem('mrnngrtneProfile', JSON.stringify(profile));
    }
  }, [profile]);

  // Imposta il profilo
  const setProfile = (newProfile: Profile) => {
    setProfileState(newProfile);
  };

  // Resetta il profilo
  const resetProfile = () => {
    localStorage.removeItem('mrnngrtneProfile');
    setProfileState(null);
  };

  // Modifica il saldo
  const modifyBalance = (amount: number) => {
    if (!profile) return;
    
    setProfileState(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        balance: Math.max(0, prev.balance + amount)
      };
    });
  };

  // Modifica l'energia
  const modifyEnergy = (amount: number) => {
    if (!profile) return;
    
    setProfileState(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        energy: Math.min(100, Math.max(0, prev.energy + amount))
      };
    });
  };

  // Modifica il benessere mentale
  const modifyMental = (amount: number) => {
    if (!profile) return;
    
    setProfileState(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        mental: Math.min(100, Math.max(0, prev.mental + amount))
      };
    });
  };

  // Modifica il benessere fisico
  const modifyPhysical = (amount: number) => {
    if (!profile) return;
    
    setProfileState(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        physical: Math.min(100, Math.max(0, prev.physical + amount))
      };
    });
  };

  // Modifica l'influenza
  const modifyInfluence = (amount: number) => {
    if (!profile) return;
    
    setProfileState(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        influence: Math.max(0, prev.influence + amount)
      };
    });
  };

  // Aggiunge un'attività alla routine
  const addRoutineTask = (task: Omit<RoutineTask, 'id' | 'isCompleted'>) => {
    if (!profile) return;
    
    // Massimo 6 attività nella routine
    if (profile.routine.length >= 6) {
      return;
    }
    
    const newTask: RoutineTask = {
      ...task,
      id: `task-${Date.now()}`,
      isCompleted: false
    };
    
    setProfileState(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        routine: [...prev.routine, newTask]
      };
    });
  };

  // Rimuove un'attività dalla routine
  const removeRoutineTask = (id: string) => {
    if (!profile) return;
    
    setProfileState(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        routine: prev.routine.filter(task => task.id !== id)
      };
    });
  };

  // Completa un'attività della routine
  const completeRoutineTask = (id: string) => {
    if (!profile) return;
    
    const taskToComplete = profile.routine.find(task => task.id === id);
    if (!taskToComplete || taskToComplete.isCompleted) return;
    
    // Applica gli effetti dell'attività
    modifyEnergy(-taskToComplete.energyCost);
    modifyMental(taskToComplete.mentalEffect);
    modifyPhysical(taskToComplete.physicalEffect);
    modifyInfluence(taskToComplete.influenceGain);
    
    // Contrassegna l'attività come completata
    setProfileState(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        routine: prev.routine.map(task => 
          task.id === id ? { ...task, isCompleted: true } : task
        )
      };
    });
  };

  // Acquista un prodotto
  const purchaseProduct = (product: Product): boolean => {
    if (!profile) return false;
    
    // Verifica se il giocatore ha già acquistato questo prodotto
    if (profile.products.some(p => p.id === product.id)) {
      return false;
    }
    
    // Verifica se il giocatore ha abbastanza soldi
    if (profile.balance < product.price) {
      return false;
    }
    
    // Applica gli effetti dell'acquisto
    modifyBalance(-product.price);
    modifyEnergy(product.energyEffect);
    modifyMental(product.mentalEffect);
    modifyPhysical(product.physicalEffect);
    modifyInfluence(product.influenceEffect);
    
    // Aggiungi il prodotto all'inventario
    const updatedProduct = { ...product, isPurchased: true };
    
    setProfileState(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        products: [...prev.products, updatedProduct]
      };
    });
    
    return true;
  };

  // Verifica se il giocatore è in burnout
  const checkBurnout = () => {
    if (!profile) return { burnout: false, severity: 'mild' as const };
    
    // Se energia, benessere mentale o fisico scendono sotto una certa soglia,
    // si verifica un burnout
    const isLowEnergy = profile.energy < 10;
    const isLowMental = profile.mental < 15;
    const isLowPhysical = profile.physical < 15;
    
    // Calcola la gravità del burnout
    let severity: 'mild' | 'moderate' | 'severe' = 'mild';
    let burnoutScore = 0;
    
    if (isLowEnergy) burnoutScore += 1;
    if (isLowMental) burnoutScore += 1;
    if (isLowPhysical) burnoutScore += 1;
    
    if (burnoutScore === 2) severity = 'moderate';
    if (burnoutScore === 3) severity = 'severe';
    
    // Determina se c'è un burnout
    const burnout = burnoutScore > 0;
    
    // Applica penalità per burnout
    if (burnout) {
      if (severity === 'mild') {
        modifyMental(-5);
        modifyInfluence(-5);
      } else if (severity === 'moderate') {
        modifyMental(-10);
        modifyPhysical(-5);
        modifyInfluence(-15);
      } else {
        modifyMental(-20);
        modifyPhysical(-15);
        modifyInfluence(-30);
      }
    }
    
    return { burnout, severity };
  };

  // Crea un nuovo profilo con valori predefiniti
  const createDefaultProfile = (name: string, age: number, avatar: string): Profile => {
    return {
      name,
      age,
      avatar,
      balance: 500,
      energy: 100,
      mental: 70,
      physical: 70,
      influence: 10,
      routine: [
        {
          id: 'default-task-1',
          name: 'Bevi acqua con limone',
          timeRequired: 1,
          energyCost: 5,
          mentalEffect: 5,
          physicalEffect: 5,
          influenceGain: 3,
          isCompleted: false
        }
      ],
      products: []
    };
  };

  const contextValue: PlayerContextType = {
    profile,
    setProfile,
    resetProfile,
    modifyBalance,
    modifyEnergy,
    modifyMental,
    modifyPhysical,
    modifyInfluence,
    addRoutineTask,
    removeRoutineTask,
    completeRoutineTask,
    purchaseProduct,
    checkBurnout
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export default PlayerContext;