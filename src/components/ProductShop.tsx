import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Battery, BrainCircuit, Heart, TrendingUp } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product, AVAILABLE_PRODUCTS } from '@/contexts/PlayerContext';
import { toast } from 'sonner';

interface ProductShopProps {
  onPurchase: (product: Product) => boolean;
}

const ProductShop: React.FC<ProductShopProps> = ({ onPurchase }) => {
  const { profile } = usePlayer();
  
  if (!profile) return null;
  
  const handlePurchase = (product: Product) => {
    // Verifica se il giocatore ha già il prodotto
    if (profile.products.some(p => p.id === product.id)) {
      toast.error('Hai già acquistato questo prodotto!');
      return;
    }
    
    // Verifica se il giocatore ha abbastanza soldi
    if (profile.balance < product.price) {
      toast.error(`Non hai abbastanza soldi per acquistare ${product.name}!`);
      return;
    }
    
    // Prova ad acquistare il prodotto
    const success = onPurchase(product);
    
    if (success) {
      toast.success(`Hai acquistato ${product.name}!`);
    } else {
      toast.error('Si è verificato un errore durante l\'acquisto.');
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <ShoppingBag className="h-5 w-5 mr-2 text-purple-500" />
          Negozio Prodotti
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-52 pr-3">
          {AVAILABLE_PRODUCTS.map(product => {
            const isOwned = profile.products.some(p => p.id === product.id);
            
            return (
              <div 
                key={product.id} 
                className={`p-3 mb-3 rounded-md border ${isOwned ? 'bg-gray-50 border-gray-200' : 'border-gray-200 hover:border-purple-200'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.energyEffect !== 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <Battery className="h-3 w-3 text-amber-500" />
                          <span className={product.energyEffect > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.energyEffect > 0 ? `+${product.energyEffect}` : product.energyEffect}
                          </span>
                        </div>
                      )}
                      
                      {product.mentalEffect !== 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <BrainCircuit className="h-3 w-3 text-indigo-500" />
                          <span className={product.mentalEffect > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.mentalEffect > 0 ? `+${product.mentalEffect}` : product.mentalEffect}
                          </span>
                        </div>
                      )}
                      
                      {product.physicalEffect !== 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <Heart className="h-3 w-3 text-red-500" />
                          <span className={product.physicalEffect > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.physicalEffect > 0 ? `+${product.physicalEffect}` : product.physicalEffect}
                          </span>
                        </div>
                      )}
                      
                      {product.influenceEffect !== 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className={product.influenceEffect > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.influenceEffect > 0 ? `+${product.influenceEffect}` : product.influenceEffect}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="font-semibold text-sm mb-2">
                      {product.price.toFixed(2)} €
                    </span>
                    
                    <Button 
                      variant={isOwned ? "secondary" : "default"}
                      size="sm"
                      disabled={isOwned || profile.balance < product.price}
                      onClick={() => handlePurchase(product)}
                      className="text-xs h-7 px-2"
                    >
                      {isOwned ? 'Acquistato' : 'Acquista'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProductShop;