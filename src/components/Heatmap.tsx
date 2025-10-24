import React, { useMemo } from 'react';
import { Card } from './ui/card';
import { PlayerData } from '../data/mockPlayerData';

interface HeatmapProps {
  data: PlayerData['heatmap'];
  colorBlindMode: boolean;
}

export function Heatmap({ data, colorBlindMode }: HeatmapProps) {
  // Bin the data into hexagonal grid
  const bins = useMemo(() => {
    const gridSize = 10;
    const binMap = new Map<string, number>();
    
    data.forEach(point => {
      const binX = Math.floor(point.x / gridSize);
      const binY = Math.floor(point.y / gridSize);
      const key = `${binX},${binY}`;
      binMap.set(key, (binMap.get(key) || 0) + point.intensity);
    });
    
    const maxIntensity = Math.max(...Array.from(binMap.values()));
    
    return Array.from(binMap.entries()).map(([key, intensity]) => {
      const [binX, binY] = key.split(',').map(Number);
      return {
        x: binX * gridSize,
        y: binY * gridSize,
        normalizedIntensity: intensity / maxIntensity,
      };
    });
  }, [data]);

  const getColor = (intensity: number) => {
    if (colorBlindMode) {
      // Color-blind friendly palette
      const colors = ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'];
      const index = Math.min(Math.floor(intensity * colors.length), colors.length - 1);
      return colors[index];
    } else {
      // Viridis-inspired palette
      const colors = ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'];
      const index = Math.min(Math.floor(intensity * colors.length), colors.length - 1);
      return colors[index];
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-[#253858]">Touch Heatmap</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Player activity zones across the pitch. Brighter areas indicate higher touch frequency.
          </p>
        </div>

        {/* Football Pitch */}
        <div 
          className="relative w-full bg-[#0E6B64] rounded-lg overflow-hidden"
          style={{ aspectRatio: '68/105' }}
          role="img"
          aria-label="Football pitch heatmap showing player activity zones. Highest activity in the attacking third and right wing areas."
        >
          {/* Pitch markings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 680 1050">
            {/* Outer lines */}
            <rect x="20" y="20" width="640" height="1010" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
            
            {/* Halfway line */}
            <line x1="20" y1="525" x2="660" y2="525" stroke="white" strokeWidth="2" opacity="0.4" />
            
            {/* Center circle */}
            <circle cx="340" cy="525" r="80" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
            
            {/* Penalty areas */}
            <rect x="160" y="20" width="360" height="140" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
            <rect x="160" y="890" width="360" height="140" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
            
            {/* Goal areas */}
            <rect x="250" y="20" width="180" height="50" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
            <rect x="250" y="980" width="180" height="50" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
          </svg>

          {/* Heatmap bins */}
          {bins.map((bin, i) => (
            <div
              key={i}
              className="absolute rounded-full transition-opacity"
              style={{
                left: `${(bin.x / 100) * 100}%`,
                top: `${(bin.y / 100) * 100}%`,
                width: '12%',
                height: '8%',
                backgroundColor: getColor(bin.normalizedIntensity),
                opacity: 0.6 + bin.normalizedIntensity * 0.4,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Low Activity</span>
          <div className="flex gap-1" aria-label="Heatmap intensity scale">
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((intensity, i) => (
              <div
                key={i}
                className="w-8 h-4 rounded"
                style={{ backgroundColor: getColor(intensity) }}
                aria-label={`Intensity level ${i + 1} of 5`}
              />
            ))}
          </div>
          <span className="text-muted-foreground">High Activity</span>
        </div>
      </div>
    </Card>
  );
}
