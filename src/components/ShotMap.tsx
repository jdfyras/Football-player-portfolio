import React from 'react';
import { Card } from './ui/card';
import { PlayerData } from '../data/mockPlayerData';
import { Target } from 'lucide-react';

interface ShotMapProps {
  data: PlayerData['shotMap'];
  colorBlindMode: boolean;
}

export function ShotMap({ data, colorBlindMode }: ShotMapProps) {
  const getOutcomeColor = (outcome: string) => {
    if (colorBlindMode) {
      switch (outcome) {
        case 'goal': return '#0077BB'; // Blue
        case 'saved': return '#EE7733'; // Orange
        case 'missed': return '#CC3311'; // Red
        case 'blocked': return '#999999'; // Gray
        default: return '#999999';
      }
    } else {
      switch (outcome) {
        case 'goal': return '#0E6B64'; // Primary
        case 'saved': return '#FFC857'; // Gold
        case 'missed': return '#FF6B6B'; // Accent
        case 'blocked': return '#999999'; // Gray
        default: return '#999999';
      }
    }
  };

  const totalGoals = data.filter(shot => shot.outcome === 'goal').length;
  const avgXG = (data.reduce((sum, shot) => sum + shot.xG, 0) / data.length).toFixed(2);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-[#253858]">
              <Target className="h-5 w-5" aria-hidden="true" />
              Shot Map
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Shot locations with xG sizing. {totalGoals} goals from {data.length} shots. Average xG: {avgXG}
            </p>
          </div>
        </div>

        {/* Pitch - Attacking Third Only */}
        <div 
          className="relative w-full bg-[#0E6B64] rounded-lg overflow-hidden"
          style={{ aspectRatio: '68/35' }}
          role="img"
          aria-label={`Shot map showing ${data.length} shots with ${totalGoals} goals. Higher expected goals shown with larger markers.`}
        >
          {/* Pitch markings - Attacking third */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 680 350">
            {/* Outer lines */}
            <rect x="20" y="20" width="640" height="310" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
            
            {/* Penalty area */}
            <rect x="160" y="20" width="360" height="140" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
            
            {/* Goal area */}
            <rect x="250" y="20" width="180" height="50" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
            
            {/* Penalty spot */}
            <circle cx="340" cy="130" r="3" fill="white" opacity="0.6" />
            
            {/* Goal */}
            <rect x="300" y="10" width="80" height="20" fill="none" stroke="white" strokeWidth="3" opacity="0.8" />
          </svg>

          {/* Shots */}
          {data.map((shot, i) => {
            // Map x and y to pitch coordinates (only attacking third)
            // x: 70-100 maps to full width, y: 0-100 maps to full height
            const mappedX = ((shot.x - 70) / 30) * 100;
            const mappedY = shot.y;
            const size = 8 + shot.xG * 24; // Size based on xG (8-32px)
            
            return (
              <div
                key={i}
                className="absolute rounded-full border-2 border-white/80 transition-transform hover:scale-125 cursor-pointer"
                style={{
                  left: `${mappedX}%`,
                  top: `${mappedY}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: getOutcomeColor(shot.outcome),
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.8,
                }}
                title={`${shot.outcome.toUpperCase()}: xG ${shot.xG.toFixed(2)}`}
                role="button"
                tabIndex={0}
                aria-label={`Shot ${i + 1}: ${shot.outcome}, expected goal value ${shot.xG.toFixed(2)}`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full border-2 border-white"
              style={{ backgroundColor: getOutcomeColor('goal') }}
            />
            <span>Goal ({data.filter(s => s.outcome === 'goal').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full border-2 border-white"
              style={{ backgroundColor: getOutcomeColor('saved') }}
            />
            <span>Saved ({data.filter(s => s.outcome === 'saved').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full border-2 border-white"
              style={{ backgroundColor: getOutcomeColor('missed') }}
            />
            <span>Missed ({data.filter(s => s.outcome === 'missed').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full border-2 border-white"
              style={{ backgroundColor: getOutcomeColor('blocked') }}
            />
            <span>Blocked ({data.filter(s => s.outcome === 'blocked').length})</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
