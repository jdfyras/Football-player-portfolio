import React from 'react';
import { Card } from './ui/card';
import { PlayerData } from '../data/mockPlayerData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, ComposedChart } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface TimeSeriesChartProps {
  data: PlayerData['timeSeries'];
  colorBlindMode: boolean;
}

export function TimeSeriesChart({ data, colorBlindMode }: TimeSeriesChartProps) {
  const xgColor = colorBlindMode ? '#0077BB' : '#0E6B64';
  const minutesColor = colorBlindMode ? '#EE7733' : '#FF6B6B';

  const totalGoals = data.reduce((sum, match) => sum + match.goals, 0);
  const totalXG = data.reduce((sum, match) => sum + match.xG, 0);
  const avgMinutes = Math.round(data.reduce((sum, match) => sum + match.minutes, 0) / data.length);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-[#253858]">
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
              Performance Over Time
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              xG and minutes played per match. Total: {totalGoals} goals, {totalXG.toFixed(1)} xG, avg {avgMinutes} minutes
            </p>
          </div>
        </div>

        <div className="h-[300px]" role="img" aria-label={`Time series chart showing performance across ${data.length} matches with total expected goals of ${totalXG.toFixed(1)} and average ${avgMinutes} minutes played`}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="matchday" 
                label={{ value: 'Matchday', position: 'insideBottom', offset: -5, fill: '#666' }}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                label={{ value: 'xG', angle: -90, position: 'insideLeft', fill: '#666' }}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                label={{ value: 'Minutes', angle: 90, position: 'insideRight', fill: '#666' }}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px' }}
                labelFormatter={(value) => `Matchday ${value}`}
                formatter={(value: number, name: string) => {
                  if (name === 'xG') return [value.toFixed(2), 'Expected Goals'];
                  if (name === 'Minutes') return [value, 'Minutes Played'];
                  return [value, name];
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                iconType="line"
              />
              <Bar
                yAxisId="right"
                dataKey="minutes"
                fill={minutesColor}
                opacity={0.3}
                name="Minutes"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="xG"
                stroke={xgColor}
                strokeWidth={3}
                dot={{ fill: xgColor, r: 4 }}
                activeDot={{ r: 6 }}
                name="xG"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Text summary */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t text-sm">
          <div>
            <div className="text-muted-foreground">Best xG Match</div>
            <div className="mt-1">
              {data.reduce((max, match) => match.xG > max.xG ? match : max).opponent}
              <span className="ml-1 text-[#0E6B64]">
                ({data.reduce((max, match) => match.xG > max.xG ? match : max).xG.toFixed(2)})
              </span>
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Total G+A</div>
            <div className="mt-1">
              {totalGoals + data.reduce((sum, match) => sum + match.assists, 0)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Avg Minutes</div>
            <div className="mt-1">{avgMinutes}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
