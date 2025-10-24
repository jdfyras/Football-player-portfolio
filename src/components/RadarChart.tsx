import React from 'react';
import { Card } from './ui/card';
import { PlayerData } from '../data/mockPlayerData';
import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

interface RadarChartProps {
  data: PlayerData['radar'];
  colorBlindMode: boolean;
}

export function RadarChartComponent({ data, colorBlindMode }: RadarChartProps) {
  const chartData = [
    {
      attribute: 'Attacking',
      player: data.attacking,
      posAvg: data.positionAverage.attacking,
    },
    {
      attribute: 'Technical',
      player: data.technical,
      posAvg: data.positionAverage.technical,
    },
    {
      attribute: 'Physical',
      player: data.physical,
      posAvg: data.positionAverage.physical,
    },
    {
      attribute: 'Defending',
      player: data.defending,
      posAvg: data.positionAverage.defending,
    },
    {
      attribute: 'Creativity',
      player: data.creativity,
      posAvg: data.positionAverage.creativity,
    },
    {
      attribute: 'Aerial',
      player: data.aerial,
      posAvg: data.positionAverage.aerial,
    },
  ];

  const playerColor = colorBlindMode ? '#0077BB' : '#0E6B64';
  const avgColor = colorBlindMode ? '#EE7733' : '#FFC857';

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-[#253858]">Performance Radar</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Player attributes (0-100) compared to position average. Higher values indicate stronger performance in each category.
          </p>
        </div>

        <div className="h-[400px]" role="img" aria-label={`Performance radar chart showing: Attacking ${data.attacking}, Technical ${data.technical}, Physical ${data.physical}, Defending ${data.defending}, Creativity ${data.creativity}, Aerial ${data.aerial}`}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadar data={chartData}>
              <PolarGrid stroke="#ddd" />
              <PolarAngleAxis 
                dataKey="attribute" 
                tick={{ fill: '#253858', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#999', fontSize: 10 }}
              />
              <Radar
                name="Position Average"
                dataKey="posAvg"
                stroke={avgColor}
                fill={avgColor}
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Player"
                dataKey="player"
                stroke={playerColor}
                fill={playerColor}
                fillOpacity={0.3}
                strokeWidth={3}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
            </RechartsRadar>
          </ResponsiveContainer>
        </div>

        {/* Text summary for accessibility */}
        <div className="text-sm space-y-1 pt-2 border-t">
          <p className="text-muted-foreground">Key Strengths:</p>
          <ul className="list-disc list-inside space-y-0.5 text-sm">
            {chartData
              .filter(item => item.player > item.posAvg + 10)
              .map(item => (
                <li key={item.attribute}>
                  <strong>{item.attribute}</strong>: {item.player} (Position avg: {item.posAvg})
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
