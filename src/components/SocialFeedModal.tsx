import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  Share2, 
  BookmarkPlus, 
  CheckCheck 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

// Tipi per il componente
interface Profile {
  name: string;
  avatar: string;
  influence: number;
}

interface SocialFeedPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  imageSrc: string;
  likes: number;
  comments: number;
  time: string;
  isInfluencer: boolean;
}

interface SocialFeedModalProps {
  open: boolean;
  onClose: () => void;
  profile: Profile;
}

// Post di esempio per il feed
const SAMPLE_POSTS: SocialFeedPost[] = [
  {
    id: 'post1',
    author: 'mindset_guru',
    authorAvatar: '/images/avatar-1.jpg',
    content: 'Sveglia alle 4:30 AM, 10 km di corsa, meditazione, acqua con limone, visualizzazione, giornaling, e BOOM! Sono solo le 6. Cosa hai fatto TU oggi? #riseandgrind #hustle',
    imageSrc: '/images/morning-routine-1.jpg',
    likes: 1243,
    comments: 87,
    time: '1h',
    isInfluencer: true
  },
  {
    id: 'post2',
    author: 'productivitymachine',
    authorAvatar: '/images/avatar-2.jpg',
    content: 'Ho ottimizzato la mia routine mattutina per massimizzare la produttività. Ora leggo 3 libri, scrivo un capitolo del mio romanzo e completo 20 task prima delle 7. La pigrizia è una scelta. #noexcuses',
    imageSrc: '/images/morning-routine-2.jpg',
    likes: 3452,
    comments: 210,
    time: '3h',
    isInfluencer: true
  },
  {
    id: 'post3',
    author: 'wellness_queen',
    authorAvatar: '/images/avatar-3.jpg',
    content: 'Il mio nuovo diffusore aromaterapico con cristalli d\'ametista ha cambiato la mia vita! Ora la mia visualizzazione mattutina è 300% più potente. Link in bio per acquistarlo con il 10% di sconto! #ad #selfcare',
    imageSrc: '/images/product-1.jpg',
    likes: 982,
    comments: 65,
    time: '5h',
    isInfluencer: true
  },
  {
    id: 'post4',
    author: 'lifecoach_official',
    authorAvatar: '/images/avatar-4.jpg',
    content: 'Oggi ho tenuto una conferenza in 4 continenti, registrato 3 podcast, scritto 2 capitoli del mio nuovo libro e fatto 2 ore di yoga. E sono solo a metà giornata! Ricorda: abbiamo tutti le stesse 24 ore. #TimeManagement',
    imageSrc: '/images/morning-routine-3.jpg',
    likes: 4589,
    comments: 342,
    time: '6h',
    isInfluencer: true
  },
  {
    id: 'post5',
    author: 'burnout_survivor',
    authorAvatar: '/images/avatar-5.jpg',
    content: 'Ricordatevi che è ok non essere sempre al 100%. A volte basta essere presenti. Oggi ho fatto solo una passeggiata e va bene così. #selfcompassion',
    imageSrc: '/images/relax.jpg',
    likes: 245,
    comments: 38,
    time: '2h',
    isInfluencer: false
  }
];

const SocialFeedModal: React.FC<SocialFeedModalProps> = ({
  open,
  onClose,
  profile
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Instagram className="h-5 w-5 text-pink-500" />
            Feed Social
          </DialogTitle>
          <DialogDescription>
            Scopri cosa pubblicano gli altri influencer e prendi ispirazione.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-3">
          <div className="space-y-6">
            {SAMPLE_POSTS.map(post => (
              <div key={post.id} className="border-b pb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{post.author}</span>
                        {post.isInfluencer && (
                          <CheckCheck className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                  </div>
                  
                  {post.isInfluencer && (
                    <Badge variant="outline" className="text-xs">Influencer</Badge>
                  )}
                </div>
                
                <p className="text-sm mb-3">{post.content}</p>
                
                <div className="bg-slate-100 h-40 rounded-md mb-3 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">[Immagine: {post.imageSrc}]</span>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{post.comments} commenti</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="bg-slate-50 p-3 rounded-md">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Il tuo profilo</span>
            <span className="text-sm font-medium">{profile.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Punteggio influenza:</span>
            <span className="text-sm font-medium">{profile.influence}</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">Chiudi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SocialFeedModal;