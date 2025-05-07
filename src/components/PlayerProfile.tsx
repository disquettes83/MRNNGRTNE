import React from 'react';
import { 
  Battery, 
  BrainCircuit, 
  Heart, 
  TrendingUp, 
  Wallet, 
  ShoppingBag 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePlayer } from '@/contexts/PlayerContext';

const PlayerProfile: React.FC = () => {
  const { profile } = usePlayer();
  
  if (!profile) return null;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{profile.name}</CardTitle>
              <p className="text-sm text-muted-foreground">Aspirante influencer, {profile.age} anni</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Battery className="h-4 w-4 text-amber-600 mr-2" />
                <span className="text-sm font-medium">Energia</span>
              </div>
              <span className="text-sm">{profile.energy}%</span>
            </div>
            <Progress value={profile.energy} className="h-2" />
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <BrainCircuit className="h-4 w-4 text-indigo-600 mr-2" />
                <span className="text-sm font-medium">Mentale</span>
              </div>
              <span className="text-sm">{profile.mental}%</span>
            </div>
            <Progress value={profile.mental} className="h-2" />
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-red-600 mr-2" />
                <span className="text-sm font-medium">Fisico</span>
              </div>
              <span className="text-sm">{profile.physical}%</span>
            </div>
            <Progress value={profile.physical} className="h-2" />
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-medium">Influenza</span>
              </div>
              <span className="text-sm">{profile.influence}</span>
            </div>
            <Progress value={Math.min(profile.influence, 100)} className="h-2" />
          </div>
          
          <div className="pt-2 border-t flex justify-between">
            <div className="flex items-center">
              <Wallet className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium">Saldo:</span>
            </div>
            <span className="text-sm">{profile.balance.toFixed(2)} €</span>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center">
              <ShoppingBag className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium">Prodotti:</span>
            </div>
            <span className="text-sm">{profile.products.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerProfile;