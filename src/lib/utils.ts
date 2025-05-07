import { v4 as uuidv4 } from 'uuid';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Funzione cn per combinare classi CSS condizionalmente
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Genera un nome casuale
export const generateRandomName = (): string => {
  const firstNames = [
    'Alex', 'Jordan', 'Casey', 'Taylor', 'Morgan', 'Riley', 'Jamie', 
    'Blake', 'Avery', 'Quinn', 'Dakota', 'Cameron', 'Skyler', 'Reese'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller',
    'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

// Genera un ID univoco
export const generateId = (): string => {
  return uuidv4();
};

// Formatta il denaro in Euro
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'EUR'
  });
};

// Consigli casuali da guru della produttività (sarcastici)
const GURU_TIPS = [
  "Svegliati alle 4 del mattino e scrivi 3 pagine di gratitudine mentre fai 100 flessioni.",
  "Se dormi più di 4 ore, stai buttando via il tuo potenziale!",
  "I veri leader mandano email alle 3 del mattino.",
  "Non dimenticare di utilizzare almeno 15 prodotti diversi durante la tua skin care routine. Gli influencer di successo lo fanno!",
  "Se non hai postato la tua routine mattutina, l'hai davvero fatta?",
  "Chi ha bisogno di amici quando puoi avere follower?",
  "Ricorda: l'ansia è solo adrenalina che non ti sei impegnato abbastanza a sfruttare.",
  "La colazione è per i deboli. I veri produttivi fanno digiuno intermittente di 23 ore.",
  "Se non stai piangendo almeno una volta alla settimana per lo stress, non ti stai impegnando abbastanza.",
  "Non è una dipendenza da caffè, è 'ottimizzazione biochimica'.",
  "Sorridi sempre! Anche quando sei sull'orlo di un breakdown nervoso.",
  "Se il tuo rituale mattutino dura meno di 3 ore, stai facendo qualcosa di sbagliato.",
  "Ricorda, la tua autostima dovrebbe essere direttamente proporzionale ai tuoi followers.",
  "Hai davvero bisogno di bere 8 litri di acqua alcalina con infusione di cristalli ogni giorno.",
  "Ogni minuto di riposo è un minuto in cui qualcun altro ti sta superando. Pensa a questo la prossima volta che 'ti rilassi'.",
  "Un influencer di successo non mostra mai la sua vera vita. Filtra tutto, letteralmente e metaforicamente.",
  "La routine è tutto. Se salti anche solo un giorno, è come ricominciare da zero.",
  "Se non stai facendo almeno 7 cose contemporaneamente, stai sprecando tempo prezioso.",
  "Una vera morning routine richiede almeno 5 prodotti sponsorizzati.",
  "Brucia le candele da entrambi i lati, poi acquista candele più costose."
];

// Ottieni un consiglio casuale
export const getRandomTip = (): string => {
  return GURU_TIPS[Math.floor(Math.random() * GURU_TIPS.length)];
};

// Fun fact sul sonno e la produttività (satirici)
const FUN_FACTS = [
  "Lo sapevi che: Il 78% delle statistiche sulle morning routine è completamente inventato, proprio come questa!",
  "Lo sapevi che: Alcuni CEO famosi sostengono di dormire solo 4 ore a notte, ma dimenticano di menzionare i loro sonnellini pomeridiani di 3 ore.",
  "Lo sapevi che: La correlazione tra sveglia all'alba e successo è così forte come quella tra possedere yacht e saper nuotare - praticamente inesistente!",
  "Lo sapevi che: Gli esseri umani hanno bisogno di 7-9 ore di sonno, ma gli influencer sono una specie diversa che si nutre di like e commenti.",
  "Lo sapevi che: Il rituale dell'acqua con limone al mattino è scientificamente provato essere... acqua con limone. Nient'altro.",
  "Lo sapevi che: Per ogni ora che ti svegli prima dell'alba, guadagni esattamente zero minuti di vita extra. Incredibile, vero?",
  "Lo sapevi che: La doccia fredda non 'rinforza il sistema immunitario', ti fa solo urlare più forte al mattino.",
  "Lo sapevi che: Il multitasking è inefficiente quanto cercare di leggere questo mentre fai yoga e prepari un smoothie.",
  "Lo sapevi che: Ci sono studi che dimostrano che il 100% delle persone che respirano ossigeno eventualmente muoiono. Forse è ora di ottimizzare anche quello?",
  "Lo sapevi che: Il 99% dei libri sulla produttività sono scritti da persone la cui principale fonte di reddito è... scrivere libri sulla produttività!"
];

// Ottieni un fun fact casuale
export const getRandomFunFact = (): string => {
  return FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
};

export default {
  generateRandomName,
  generateId,
  formatCurrency,
  getRandomTip,
  getRandomFunFact
};