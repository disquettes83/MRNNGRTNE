import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlayer } from '@/contexts/PlayerContext';
import { toast } from 'sonner';

const avatars = [
  '/images/avatar-1.jpg',
  '/images/avatar-2.jpg',
  '/images/avatar-3.jpg',
  '/images/avatar-4.jpg',
  '/images/avatar-5.jpg',
  '/images/avatar-6.jpg'
];

const ProfileCreation: React.FC = () => {
  const { setProfile } = usePlayer();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('25');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  
  const handleCreateProfile = () => {
    if (!name.trim()) {
      toast.error('Inserisci un nome');
      return;
    }
    
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 60) {
      toast.error('L\'età deve essere compresa tra 18 e 60 anni');
      return;
    }
    
    // Crea il profilo
    const newProfile = {
      name,
      age: ageNum,
      avatar: selectedAvatar,
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
    
    setProfile(newProfile);
    toast.success('Profilo creato con successo! Benvenuto nel mondo di MRNNGRTNE!');
  };
  
  return (
    <div className="container max-w-lg mx-auto py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Crea il tuo profilo</CardTitle>
          <CardDescription>
            Inizia il tuo percorso verso la massima produttività e diventa un influencer di successo!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input 
              id="name" 
              placeholder="Come ti chiami?" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Età</Label>
            <Input 
              id="age" 
              type="number" 
              placeholder="Quanti anni hai?" 
              min={18}
              max={60}
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
            />
            <p className="text-xs text-muted-foreground">
              Devi avere almeno 18 anni per iniziare il tuo percorso da influencer.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Scegli un avatar</Label>
            <RadioGroup 
              className="grid grid-cols-3 gap-4"
              value={selectedAvatar}
              onValueChange={setSelectedAvatar}
            >
              {avatars.map((avatar, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <RadioGroupItem 
                    id={`avatar-${index}`} 
                    value={avatar} 
                    className="sr-only peer" 
                  />
                  <Label 
                    htmlFor={`avatar-${index}`}
                    className="cursor-pointer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full"
                  >
                    <Avatar className="h-16 w-16 peer-[.peer:checked]:ring-2 peer-[.peer:checked]:ring-primary">
                      <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
                    </Avatar>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button onClick={handleCreateProfile} className="w-full">
            Inizia il tuo percorso
          </Button>
        </CardFooter>
        
        <div className="p-4 bg-amber-50 text-amber-800 text-sm rounded-b-lg">
          <p>
            <strong>Nota satirica:</strong> Questo gioco è una satira sulla cultura tossica della produttività
            e delle morning routine estreme. Non è un incoraggiamento a seguire questi stili di vita!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCreation;