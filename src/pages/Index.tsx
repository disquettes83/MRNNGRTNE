import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import RoutinePanel from '../components/RoutinePanel';
import StatsDisplay from '../components/StatsDisplay';
import EventModal from '../components/EventModal';
import SocialFeedModal from '../components/SocialFeedModal';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { 
  Calendar, 
  Clock, 
  UserCircle, 
  Instagram, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  Battery,
  BrainCircuit,
  Heart
} from 'lucide-react';
import ProfileCreation from '../components/ProfileCreation';
import PlayerProfile from '../components/PlayerProfile';
import DailySchedule from '../components/DailySchedule';
import GuruTips from '../components/GuruTips';
import ProductShop from '../components/ProductShop';
import { usePlayer } from '../contexts/PlayerContext';
import { useTime } from '../contexts/TimeContext';
import { 
  getRandomEvent, 
  shouldEventOccur, 
  generateTargetedEvent,
  applyEventToProfile,
  GameEvent
} from '../lib/events';
import { getRandomTip } from '../lib/utils';

interface EventEffects {
  energyEffect: number;
  mentalEffect: number;
  physicalEffect: number;
  influenceEffect: number;
  moneyEffect: number;
}

const Index = () => {
  const { 
    profile, 
    modifyEnergy,
    modifyMental,
    modifyPhysical,
    modifyInfluence,
    modifyBalance,
    resetProfile,
    setProfile,
    checkBurnout,
    purchaseProduct,
    addRoutineTask,
    removeRoutineTask
  } = usePlayer();
  
  const { 
    currentDate, 
    currentTime,
    advanceTime, 
    advanceDay
  } = useTime();
  
  // Stati evento
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventEffects, setEventEffects] = useState<EventEffects>({
    energyEffect: 0,
    mentalEffect: 0,
    physicalEffect: 0,
    influenceEffect: 0,
    moneyEffect: 0
  });
  
  // Social feed
  const [showSocialFeed, setShowSocialFeed] = useState(false);
  
  // Statistiche
  const [stats, setStats] = useState({
    daysCompleted: 0,
    tasksCompleted: 0,
    productsOwned: 0,
    totalSpent: 0,
    burnoutCount: 0
  });
  const [showStats, setShowStats] = useState(false);
  
  // Tip casuale
  const [currentTip, setCurrentTip] = useState(getRandomTip());
  
  // Carica statistiche all'inizio
  useEffect(() => {
    try {
      const storedStats = localStorage.getItem('mrnngrtneStats');
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
    } catch (error) {
      console.error('Errore nel caricamento delle statistiche', error);
    }
  }, []);
  
  // Salva statistiche quando cambiano
  useEffect(() => {
    if (stats.daysCompleted > 0) {
      localStorage.setItem('mrnngrtneStats', JSON.stringify(stats));
    }
  }, [stats]);
  
  // Gestione modal eventi
  const handleEventModalClose = () => {
    if (!profile || !currentEvent) {
      setShowEventModal(false);
      return;
    }
    
    setShowEventModal(false);
    
    // Applica gli effetti
    const { energyEffect, mentalEffect, physicalEffect, influenceEffect, moneyEffect } = eventEffects;
    
    if (energyEffect !== undefined) {
      modifyEnergy(energyEffect);
    }
    
    if (mentalEffect !== undefined) {
      modifyMental(mentalEffect);
    }
    
    if (physicalEffect !== undefined) {
      modifyPhysical(physicalEffect);
    }
    
    if (influenceEffect !== undefined) {
      modifyInfluence(influenceEffect);
    }
    
    if (moneyEffect !== undefined) {
      modifyBalance(moneyEffect);
    }
    
    // Reset dell'evento e degli effetti
    setCurrentEvent(null);
    setEventEffects({
      energyEffect: 0,
      mentalEffect: 0,
      physicalEffect: 0,
      influenceEffect: 0,
      moneyEffect: 0
    });
  };
  
  // Gestione social feed
  const handleCloseSocialFeed = () => {
    setShowSocialFeed(false);
  };
  
  // Avanza il tempo (1 ora)
  const handleAdvanceHour = () => {
    // Avanza il tempo di un'ora
    advanceTime(1);
    
    // Controlla se si verificano eventi
    if (profile && shouldEventOccur()) {
      // Genera un evento mirato o casuale
      let event = generateTargetedEvent(profile) || getRandomEvent(profile);
      
      if (event) {
        // Applica l'evento al profilo e capture gli effetti
        const { updatedProfile, appliedEffects } = applyEventToProfile(profile, event);
        
        // Aggiorna il profilo
        setProfile(updatedProfile);
        
        // Memorizza evento ed effetti
        setCurrentEvent(event);
        setEventEffects({
          energyEffect: appliedEffects.energyEffect || 0,
          mentalEffect: appliedEffects.mentalEffect || 0,
          physicalEffect: appliedEffects.physicalEffect || 0,
          influenceEffect: appliedEffects.influenceEffect || 0,
          moneyEffect: appliedEffects.moneyEffect || 0
        });
        
        // Mostra il modale
        setShowEventModal(true);
      }
    }
    
    // Controlla burnout
    if (profile) {
      const { burnout, severity } = checkBurnout();
      
      if (burnout) {
        toast.error(`Burnout! ${severity === 'severe' ? 'Collasso totale!' : 'Hai esagerato.'}`);
        
        // Aggiorna statistiche
        setStats(prev => ({
          ...prev,
          burnoutCount: prev.burnoutCount + 1
        }));
      }
    }
  };
  
  // Avanza al giorno successivo
  const handleAdvanceToNextDay = () => {
    // Avanza al giorno successivo
    advanceDay();
    
    // Aggiorna statistiche
    setStats(prev => ({
      ...prev,
      daysCompleted: prev.daysCompleted + 1
    }));
    
    // Aggiorna il tip casuale
    setCurrentTip(getRandomTip());
    
    toast.success("È un nuovo giorno! Pronti a massimizzare la produttività?");
  };
  
  // Nuova partita
  const handleStartNewGame = () => {
    if (confirm('Sei sicuro di voler iniziare una nuova partita? Perderai tutti i progressi attuali.')) {
      resetProfile();
      toast.success('Nuova partita iniziata! Crea un nuovo profilo da influencer in erba.');
    }
  };
  
  // Azzera statistiche
  const handleResetStats = () => {
    if (confirm('Sei sicuro di voler azzerare tutte le statistiche?')) {
      setStats({
        daysCompleted: 0,
        tasksCompleted: 0,
        productsOwned: 0,
        totalSpent: 0,
        burnoutCount: 0
      });
      localStorage.removeItem('mrnngrtneStats');
      toast.success('Statistiche azzerate');
    }
  };
  
  // Se non c'è un profilo, mostra la schermata di creazione
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-grow">
          <ProfileCreation />
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 px-4">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">MRNNGRTNE</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ottimizza la tua routine mattutina, massimizza la produttività, diventa un influencer!
            Ricorda: il sonno è per i deboli.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-amber-500">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{currentTime}:00</span>
            </div>
            <div className="flex items-center gap-1 text-blue-500">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{currentDate.toLocaleDateString()}</span>
            </div>
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">La tua routine</h2>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 rounded-md">
                    <Battery className="h-4 w-4 text-amber-600" />
                    <span className="text-amber-800 font-medium">{profile.energy}%</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-indigo-100 rounded-md">
                    <BrainCircuit className="h-4 w-4 text-indigo-600" />
                    <span className="text-indigo-800 font-medium">{profile.mental}%</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-100 rounded-md">
                    <Heart className="h-4 w-4 text-red-600" />
                    <span className="text-red-800 font-medium">{profile.physical}%</span>
                  </div>
                </div>
              </div>
              
              <RoutinePanel 
                routine={profile.routine}
                onAddTask={addRoutineTask}
                onRemoveTask={removeRoutineTask}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <DailySchedule />
              <ProductShop onPurchase={purchaseProduct} />
            </div>
            
            {/* Buttons for time advancement */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleAdvanceHour}
              >
                <Clock className="h-4 w-4" />
                Avanza di un'ora
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleAdvanceToNextDay}
              >
                <Calendar className="h-4 w-4" />
                Vai al giorno dopo
              </Button>
            </div>
            
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleStartNewGame}
              >
                <RotateCcw className="h-4 w-4" />
                Nuova Partita
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <PlayerProfile />
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg flex items-center">
                  <Instagram className="h-5 w-5 mr-2 text-pink-500" />
                  Feed Social
                </h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowSocialFeed(true)}
                >
                  Visualizza
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Controlla cosa pubblicano gli altri influencer e aumenta la tua visibilità.
              </p>
              <div className="mt-2 flex items-center gap-1">
                <UserCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Influenza: {profile.influence}</span>
              </div>
            </div>
            
            <GuruTips currentTip={currentTip} />
            
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold mb-2">💡 Sapevi che...</p>
              <p className="text-sm text-muted-foreground">
                "Il 5% delle persone di successo si sveglia alle 5 del mattino!"
              </p>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                className="w-full mb-2"
                onClick={() => setShowStats(!showStats)}
              >
                {showStats ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" /> Nascondi statistiche
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" /> Mostra statistiche
                  </>
                )}
              </Button>
              
              {showStats && (
                <div className="space-y-4">
                  <StatsDisplay 
                    stats={stats}
                  />
                  
                  {stats.daysCompleted > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs text-red-500 hover:text-red-600"
                      onClick={handleResetStats}
                    >
                      Azzera statistiche
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-200 py-4 text-center text-sm text-muted-foreground">
        <p>MRNNGRTNE (Massimizza Routine Notturna G-R0wth T-Neura Exponential)</p>
        <p className="text-xs">Un gioco satirico sulla cultura tossica della produttività</p>
      </footer>
      
      {/* Modali */}
      <EventModal
        event={currentEvent}
        open={showEventModal}
        onClose={handleEventModalClose}
        effects={eventEffects}
      />
      
      <SocialFeedModal
        open={showSocialFeed}
        onClose={handleCloseSocialFeed}
        profile={profile}
      />
    </div>
  );
};

export default Index;