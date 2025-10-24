import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { PlayerData } from '../data/mockPlayerData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock, Award, ExternalLink } from 'lucide-react';

interface MatchModalProps {
  match: PlayerData['matches'][0] | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MatchModal({ match, isOpen, onClose }: MatchModalProps) {
  if (!match) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            <span>vs {match.opponent}</span>
            <Badge 
              variant={match.result.startsWith('W') ? 'default' : 'secondary'}
              className={match.result.startsWith('W') ? 'bg-[#0E6B64]' : ''}
            >
              {match.result}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Match Details and Performance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Match Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-muted-foreground">Date:</span>
              <span>{new Date(match.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-muted-foreground">Minutes:</span>
              <span>{match.minutes}'</span>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-3xl text-[#0E6B64]" aria-label={`${match.goals} goals scored`}>
                {match.goals}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Goals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-[#FF6B6B]" aria-label={`${match.assists} assists`}>
                {match.assists}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Assists</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Award className="h-6 w-6 text-[#FFC857]" aria-hidden="true" />
                <span className="text-3xl" aria-label={`Match rating ${match.rating}`}>
                  {match.rating}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">Rating</div>
            </div>
          </div>

          {/* Highlights */}
          {match.highlights && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2">
                Match Highlights
              </h4>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open(match.highlights, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                Watch Highlights
              </Button>
            </div>
          )}

          {/* Additional Context */}
          <div className="pt-4 border-t text-sm text-muted-foreground">
            <p>
              {match.goals + match.assists > 0 
                ? `Outstanding performance with ${match.goals + match.assists} goal contribution${match.goals + match.assists > 1 ? 's' : ''}.`
                : 'Solid team contribution throughout the match.'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
