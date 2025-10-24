import React from 'react';
import { Card } from './ui/card';
import { PlayerData } from '../data/mockPlayerData';
import { ScatterChart as RechartsScatter, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Label } from 'recharts';
import { Activity } from 'lucide-react';

interface ScatterChartProps {
  data: PlayerData['timeSeries'];
  colorBlindMode: boolean;
}

export function ScatterChart({ data, colorBlindMode }: ScatterChartProps) {
  const scatterData = data.map(match => ({
    xG: match.xG,
    goals: match.goals,
    assists: match.assists,
    opponent: match.opponent,
    matchday: match.matchday,
  }));

  const dotColor = colorBlindMode ? '#0077BB' : '#0E6B64';

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="flex items-center gap-2 text-[#253858]">
            <Activity className="h-5 w-5" aria-hidden="true" />
            Goals vs Expected Goals
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Relationship between xG and actual goals scored. Points above the diagonal line indicate overperformance.
          </p>
        </div>

        <div 
          className="h-[350px]"
          role="img"
          aria-label={`Scatter plot comparing expected goals to actual goals across ${data.length} matches`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatter>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                type="number" 
                dataKey="xG" 
                name="Expected Goals"
                domain={[0, 'auto']}
                tick={{ fill: '#666', fontSize: 12 }}
              >
                <Label value="Expected Goals (xG)" position="insideBottom" offset={-5} fill="#666" />
              </XAxis>
              <YAxis 
                type="number" 
                dataKey="goals" 
                name="Goals"
                domain={[0, 'auto']}
                tick={{ fill: '#666', fontSize: 12 }}
              >
                <Label value="Actual Goals" angle={-90} position="insideLeft" fill="#666" />
              </YAxis>
              <ZAxis type="number" dataKey="assists" range={[50, 400]} name="Assists" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px' }}
                formatter={(value: number, name: string) => {
                  if (name === 'Expected Goals') return [value.toFixed(2), 'xG'];
                  if (name === 'Goals') return [value, 'Goals'];
                  if (name === 'Assists') return [value, 'Assists'];
                  return [value, name];
                }}
                labelFormatter={(_, payload) => {
                  if (payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return `${data.opponent} (MD ${data.matchday})`;
                  }
                  return '';
                }}
              />
              <Scatter 
                data={scatterData} 
                fill={dotColor}
                fillOpacity={0.7}
              />
              
              {/* Reference line y = x */}
              <Scatter
                data={[
                  { xG: 0, goals: 0 },
                  { xG: Math.max(...scatterData.map(d => d.xG)), goals: Math.max(...scatterData.map(d => d.xG)) }
                ]}
                line={{ stroke: '#999', strokeWidth: 2, strokeDasharray: '5 5' }}
                fill="none"
                shape={() => null}
                legendType="none"
              />
            </RechartsScatter>
          </ResponsiveContainer>
        </div>

        {/* Analysis */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t text-sm">
          <div>
            <div className="text-muted-foreground">Total Goals</div>
            <div className="mt-1 text-lg">
              {data.reduce((sum, m) => sum + m.goals, 0)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Total xG</div>
            <div className="mt-1 text-lg">
              {data.reduce((sum, m) => sum + m.xG, 0).toFixed(1)}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-muted-foreground">Performance vs Expected</div>
            <div className="mt-1">
              {(() => {
                const totalGoals = data.reduce((sum, m) => sum + m.goals, 0);
                const totalXG = data.reduce((sum, m) => sum + m.xG, 0);
                const diff = totalGoals - totalXG;
                return (
                  <span className={diff > 0 ? 'text-[#0E6B64]' : 'text-[#FF6B6B]'}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(1)} goals {diff > 0 ? 'over' : 'under'} expected
                  </span>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
