import { generateId } from './utils';

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'productivity' | 'social' | 'burnout' | 'random';
  energyEffect?: number;
  mentalEffect?: number;
  physicalEffect?: number;
  influenceEffect?: number;
  moneyEffect?: number;
}

export interface Profile {
  name: string;
  age: number;
  avatar: string;
  balance: number;
  energy: number;
  mental: number;
  physical: number;
  influence: number;
  routine: any[];
  products: any[];
}

// Lista di eventi casuali
const RANDOM_EVENTS: GameEvent[] = [
  {
    id: 'event-1',
    title: 'Trend virale sui social',
    description: 'Un tuo post sulla morning routine è diventato virale! Hai guadagnato nuovi follower e visibilità.',
    type: 'social',
    influenceEffect: 20,
    mentalEffect: 5
  },
  {
    id: 'event-2',
    title: 'Offerta di sponsorizzazione',
    description: 'Un brand di integratori ti ha contattato per una collaborazione!',
    type: 'social',
    moneyEffect: 150,
    influenceEffect: 10
  },
  {
    id: 'event-3',
    title: 'Sveglia non funzionante',
    description: 'La tua sveglia non ha suonato e ti sei svegliato in ritardo. Parte della tua routine è stata compromessa.',
    type: 'productivity',
    energyEffect: -10,
    mentalEffect: -15,
    influenceEffect: -5
  },
  {
    id: 'event-4',
    title: 'Esaurimento caffè',
    description: 'Il tuo caffè biologico super-premium è terminato! Dovrai arrangiarti con il caffè normale dei comuni mortali.',
    type: 'random',
    energyEffect: -5,
    mentalEffect: -10
  },
  {
    id: 'event-5',
    title: 'Problemi di connessione',
    description: 'Internet è lento e non riesci a postare la tua routine mattutina. Tragedia!',
    type: 'social',
    influenceEffect: -15,
    mentalEffect: -5
  },
  {
    id: 'event-6',
    title: 'Invito a podcast',
    description: 'Sei stato invitato a partecipare a un podcast sul tema della produttività!',
    type: 'social',
    influenceEffect: 30,
    moneyEffect: 50,
    mentalEffect: 10
  },
  {
    id: 'event-7',
    title: 'Distrazione da notifiche',
    description: 'Hai controllato il telefono "solo un attimo" e hai perso mezz\'ora scrollando.',
    type: 'productivity',
    energyEffect: -5,
    mentalEffect: -10
  },
  {
    id: 'event-8',
    title: 'Vicino rumoroso',
    description: 'Il tuo vicino ha deciso di ristrutturare casa alle 6 del mattino. Addio meditazione tranquilla!',
    type: 'random',
    mentalEffect: -15,
    energyEffect: -5
  },
  {
    id: 'event-9',
    title: 'Like da un influencer famoso',
    description: 'Un influencer con milioni di follower ha messo like al tuo ultimo post!',
    type: 'social',
    influenceEffect: 25,
    mentalEffect: 15
  },
  {
    id: 'event-10',
    title: 'Visita inaspettata',
    description: 'Un amico è passato a trovarti senza preavviso, interrompendo la tua sacred routine mattutina. Il caos!',
    type: 'random',
    mentalEffect: -10,
    energyEffect: -5,
    influenceEffect: -5
  },
  {
    id: 'event-11',
    title: 'Libro in arrivo',
    description: 'Una casa editrice ti ha proposto di scrivere un libro sulla tua routine mattutina. Sei sulla strada giusta!',
    type: 'social',
    influenceEffect: 50,
    moneyEffect: 200,
    mentalEffect: 20
  },
  {
    id: 'event-12',
    title: 'Burnout in arrivo',
    description: 'Stai spingendo troppo. Il tuo corpo ti sta mandando segnali di allarme. Forse è ora di rallentare?',
    type: 'burnout',
    energyEffect: -25,
    physicalEffect: -20,
    mentalEffect: -15
  },
  {
    id: 'event-13',
    title: 'Mancanza di likes',
    description: 'Il tuo ultimo post ha ricevuto molti meno likes del solito. Stai perdendo rilevanza?',
    type: 'social',
    influenceEffect: -10,
    mentalEffect: -15
  },
  {
    id: 'event-14',
    title: 'Maltempo inaspettato',
    description: 'Un temporale improvviso ha impedito la tua corsa mattutina. La natura è contro di te!',
    type: 'productivity',
    physicalEffect: -10,
    mentalEffect: -5
  },
  {
    id: 'event-15',
    title: 'Nuovo prodotto super efficace',
    description: 'Hai scoperto un nuovo superfood che promette di aumentare l\'energia del 500%. Sarà vero?',
    type: 'random',
    energyEffect: 15,
    moneyEffect: -80
  }
];

// Eventi specifici per burnout
const BURNOUT_EVENTS: GameEvent[] = [
  {
    id: 'burnout-1',
    title: 'Collasso totale',
    description: 'Il tuo corpo ha finalmente detto basta. Ti sei svegliato incapace di alzarti dal letto. Addio routine.',
    type: 'burnout',
    energyEffect: -50,
    mentalEffect: -30,
    physicalEffect: -40,
    influenceEffect: -20
  },
  {
    id: 'burnout-2',
    title: 'Esaurimento nervoso',
    description: 'Ti sei ritrovato a piangere mentre preparavi il tuo smoothie verde delle 5:30. Forse è troppo.',
    type: 'burnout',
    mentalEffect: -40,
    energyEffect: -30,
    influenceEffect: -10
  },
  {
    id: 'burnout-3',
    title: 'Segnali di allarme',
    description: 'Palpitazioni, ansia, insonnia... Il tuo corpo ti sta implorando di rallentare.',
    type: 'burnout',
    physicalEffect: -25,
    mentalEffect: -20,
    energyEffect: -15
  }
];

// Probabilità che si verifichi un evento casuale (in percentuale)
const EVENT_PROBABILITY = 30;

// Verifica se si verifica un evento
export const shouldEventOccur = (): boolean => {
  return Math.random() * 100 < EVENT_PROBABILITY;
};

// Ottieni un evento casuale
export const getRandomEvent = (profile: Profile): GameEvent => {
  // Se l'energia o il benessere mentale sono molto bassi, maggiore probabilità di burnout
  if ((profile.energy < 20 || profile.mental < 20 || profile.physical < 20) && Math.random() < 0.5) {
    return {
      ...BURNOUT_EVENTS[Math.floor(Math.random() * BURNOUT_EVENTS.length)],
      id: generateId()
    };
  }
  
  return {
    ...RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)],
    id: generateId()
  };
};

// Genera un evento mirato in base al profilo del giocatore
export const generateTargetedEvent = (profile: Profile): GameEvent | null => {
  // Se l'influenza è alta, maggiore probabilità di eventi social positivi
  if (profile.influence > 100 && Math.random() < 0.3) {
    return {
      id: generateId(),
      title: 'Offerta di collaborazione',
      description: 'Un brand importante vuole collaborare con te per una campagna sulla produttività!',
      type: 'social',
      influenceEffect: 30,
      moneyEffect: 300
    };
  }
  
  // Se l'energia è molto bassa, evento di burnout
  if (profile.energy < 15 && Math.random() < 0.7) {
    return {
      id: generateId(),
      title: 'Crollo di energia',
      description: 'Ti sei addormentato durante la meditazione mattutina. Il tuo corpo chiede riposo.',
      type: 'burnout',
      energyEffect: -10,
      mentalEffect: -10,
      physicalEffect: -5,
      influenceEffect: -5
    };
  }
  
  // Se il benessere mentale è molto basso, evento di burnout
  if (profile.mental < 15 && Math.random() < 0.7) {
    return {
      id: generateId(),
      title: 'Ansia opprimente',
      description: 'L\'ansia da prestazione ti sta divorando. È difficile concentrarsi sulla tua routine.',
      type: 'burnout',
      mentalEffect: -15,
      energyEffect: -10,
      influenceEffect: -5
    };
  }
  
  // Se ha molti prodotti, evento positivo relativo ai prodotti
  if (profile.products.length > 3 && Math.random() < 0.3) {
    return {
      id: generateId(),
      title: 'Sinergia di prodotti',
      description: 'I tuoi prodotti premium stanno funzionando davvero bene insieme!',
      type: 'productivity',
      energyEffect: 15,
      mentalEffect: 15,
      physicalEffect: 10,
      influenceEffect: 10
    };
  }
  
  // Se la routine è molto piena, evento di sovraccarico
  if (profile.routine.length > 4 && Math.random() < 0.4) {
    return {
      id: generateId(),
      title: 'Sovraccarico di attività',
      description: 'La tua routine è diventata così piena che non riesci a completarla in tempo.',
      type: 'productivity',
      mentalEffect: -15,
      energyEffect: -10,
      influenceEffect: -5
    };
  }
  
  return null;
};

// Applica gli effetti di un evento al profilo e restituisce l'elenco di effetti applicati
export const applyEventToProfile = (profile: Profile, event: GameEvent) => {
  // Crea una copia del profilo
  const updatedProfile = { ...profile };
  
  // Oggetto per tenere traccia degli effetti applicati
  const appliedEffects: {
    energyEffect?: number;
    mentalEffect?: number;
    physicalEffect?: number;
    influenceEffect?: number;
    moneyEffect?: number;
  } = {};
  
  // Applica gli effetti se presenti
  if (event.energyEffect) {
    updatedProfile.energy = Math.min(100, Math.max(0, updatedProfile.energy + event.energyEffect));
    appliedEffects.energyEffect = event.energyEffect;
  }
  
  if (event.mentalEffect) {
    updatedProfile.mental = Math.min(100, Math.max(0, updatedProfile.mental + event.mentalEffect));
    appliedEffects.mentalEffect = event.mentalEffect;
  }
  
  if (event.physicalEffect) {
    updatedProfile.physical = Math.min(100, Math.max(0, updatedProfile.physical + event.physicalEffect));
    appliedEffects.physicalEffect = event.physicalEffect;
  }
  
  if (event.influenceEffect) {
    updatedProfile.influence = Math.max(0, updatedProfile.influence + event.influenceEffect);
    appliedEffects.influenceEffect = event.influenceEffect;
  }
  
  if (event.moneyEffect) {
    updatedProfile.balance = Math.max(0, updatedProfile.balance + event.moneyEffect);
    appliedEffects.moneyEffect = event.moneyEffect;
  }
  
  return { updatedProfile, appliedEffects };
};

export default {
  getRandomEvent,
  shouldEventOccur,
  generateTargetedEvent,
  applyEventToProfile
};