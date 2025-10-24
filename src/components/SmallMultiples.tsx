import React from 'react';
import { Card } from './ui/card';
import { PlayerData } from '../data/mockPlayerData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface SmallMultiplesProps {
  data: PlayerData['timeSeries'];
  colorBlindMode: boolean;
}

export function SmallMultiples({ data, colorBlindMode }: SmallMultiplesProps) {
  const metrics = [
    { key: 'goals', label: 'Goals', color: colorBlindMode ? '#0077BB' : '#0E6B64' },
    { key: 'assists', label: 'Assists', color: colorBlindMode ? '#EE7733' : '#FF6B6B' },
    { key: 'xG', label: 'xG', color: colorBlindMode ? '#009988' : '#FFC857' },
  ];

  const getChartData = (metric: string) => {
    return data.slice(-6).map(match => ({
      opponent: match.opponent.substring(0, 3).toUpperCase(),
      value: match[metric as keyof typeof match] as number,
    }));
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-[#253858]">Last 6 Matches</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Performance breakdown by metric across recent matches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map(metric => {
            const chartData = getChartData(metric.key);
            const total = chartData.reduce((sum, d) => sum + d.value, 0);
            const avg = (total / chartData.length).toFixed(2);
            
            return (
              <div key={metric.key} className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm text-muted-foreground">{metric.label}</h4>
                  <div className="text-xs text-muted-foreground">
                    Avg: {avg}
                  </div>
                </div>
                
                <div 
                  className="h-[120px]"
                  role="img"
                  aria-label={`Bar chart showing ${metric.label} for last 6 matches with average of ${avg}`}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis 
                        dataKey="opponent" 
                        tick={{ fill: '#666', fontSize: 10 }}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#666', fontSize: 10 }}
                        axisLine={false}
                        width={25}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={metric.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-xs text-muted-foreground">
                  Total: {total.toFixed(metric.key === 'xG' ? 1 : 0)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Goals:</span>
              <span className="ml-2">{data.slice(-6).reduce((sum, m) => sum + m.goals, 0)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Assists:</span>
              <span className="ml-2">{data.slice(-6).reduce((sum, m) => sum + m.assists, 0)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Matches:</span>
              <span className="ml-2">6</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
