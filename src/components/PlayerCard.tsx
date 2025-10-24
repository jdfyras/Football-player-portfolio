import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PlayerData } from '../data/mockPlayerData';
import { TrendingUp, Activity, Zap } from 'lucide-react';

interface PlayerCardProps {
  player: PlayerData;
  variant: 'energetic' | 'elegant' | 'sporty';
}

export function PlayerCard({ player, variant }: PlayerCardProps) {
  const variantStyles = {
    energetic: 'border-l-4 border-l-[#FF6B6B]',
    elegant: 'border-l-4 border-l-[#FFC857]',
    sporty: 'border-l-4 border-l-[#0E6B64]',
  };

  return (
    <Card className={`p-6 ${variantStyles[variant]}`}>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-[#253858]">
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
            Season Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl text-[#0E6B64]" aria-label={`${player.kpis.goals} goals`}>
                {player.kpis.goals}
              </div>
              <div className="text-sm text-muted-foreground">Goals</div>
            </div>
            <div>
              <div className="text-3xl text-[#FF6B6B]" aria-label={`${player.kpis.assists} assists`}>
                {player.kpis.assists}
              </div>
              <div className="text-sm text-muted-foreground">Assists</div>
            </div>
            <div>
              <div className="text-2xl" aria-label={`${player.kpis.matches} matches played`}>
                {player.kpis.matches}
              </div>
              <div className="text-sm text-muted-foreground">Matches</div>
            </div>
            <div>
              <div className="text-2xl" aria-label={`${player.kpis.minutes} minutes played`}>
                {player.kpis.minutes}
              </div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
          </div>
        </div>

        {/* Per 90 Stats */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xl text-[#0E6B64]" aria-label={`${player.kpis.goalsP90.toFixed(2)} goals per 90 minutes`}>
                {player.kpis.goalsP90.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">Goals/90</div>
            </div>
            <div>
              <div className="text-xl text-[#FF6B6B]" aria-label={`${player.kpis.assistsP90.toFixed(2)} assists per 90 minutes`}>
                {player.kpis.assistsP90.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">Assists/90</div>
            </div>
            <div>
              <div className="text-xl" aria-label={`${player.kpis.xG.toFixed(1)} expected goals`}>
                {player.kpis.xG.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">xG</div>
            </div>
            <div>
              <div className="text-xl" aria-label={`${player.kpis.xA.toFixed(1)} expected assists`}>
                {player.kpis.xA.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">xA</div>
            </div>
          </div>
        </div>

        {/* Physical Stats */}
        <div className="pt-4 border-t">
          <h4 className="mb-3 flex items-center gap-2 text-[#253858]">
            <Activity className="h-4 w-4" aria-hidden="true" />
            Physical Attributes
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Height:</span>
              <span aria-label={`${player.physicals.height} centimeters`}>{player.physicals.height} cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weight:</span>
              <span aria-label={`${player.physicals.weight} kilograms`}>{player.physicals.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Top Speed:</span>
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-[#FFC857]" aria-hidden="true" />
                <span aria-label={`${player.physicals.topSpeed} kilometers per hour`}>
                  {player.physicals.topSpeed} km/h
                </span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance/Match:</span>
              <span aria-label={`${player.physicals.distance} kilometers per match`}>
                {player.physicals.distance} km
              </span>
            </div>
          </div>
        </div>

        {/* Position Chips */}
        <div className="pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="secondary" 
              className="bg-[#0E6B64] text-white"
              aria-label={`Primary position: ${player.position}`}
            >
              {player.position}
            </Badge>
            <Badge variant="outline" aria-label="Left Wing secondary position">
              Left Wing
            </Badge>
            <Badge variant="outline" aria-label="Striker secondary position">
              Striker
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
