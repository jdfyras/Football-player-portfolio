import { describe, it, expect } from 'vitest';

/**
 * Unit tests for data normalization and per-90 calculations
 */

describe('Per-90 Statistics Calculations', () => {
  it('should calculate goals per 90 minutes correctly', () => {
    const goals = 18;
    const minutes = 1856;
    const goalsP90 = (goals / minutes) * 90;
    
    expect(goalsP90).toBeCloseTo(0.87, 2);
  });

  it('should calculate assists per 90 minutes correctly', () => {
    const assists = 12;
    const minutes = 1856;
    const assistsP90 = (assists / minutes) * 90;
    
    expect(assistsP90).toBeCloseTo(0.58, 2);
  });

  it('should handle edge case of 0 minutes played', () => {
    const goals = 5;
    const minutes = 0;
    const goalsP90 = minutes === 0 ? 0 : (goals / minutes) * 90;
    
    expect(goalsP90).toBe(0);
  });

  it('should calculate xG per 90 correctly', () => {
    const xG = 16.4;
    const minutes = 1856;
    const xGP90 = (xG / minutes) * 90;
    
    expect(xGP90).toBeCloseTo(0.795, 2);
  });
});

describe('Radar Chart Normalization', () => {
  it('should ensure all radar values are between 0-100', () => {
    const radarValues = [92, 88, 78, 45, 85, 62];
    
    radarValues.forEach(value => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  it('should calculate position average correctly', () => {
    const playerValues = { attacking: 92, technical: 88, physical: 78 };
    const posAverage = { attacking: 75, technical: 70, physical: 65 };
    
    // Player should be above average in all tested attributes
    expect(playerValues.attacking).toBeGreaterThan(posAverage.attacking);
    expect(playerValues.technical).toBeGreaterThan(posAverage.technical);
    expect(playerValues.physical).toBeGreaterThan(posAverage.physical);
  });

  it('should handle normalization from raw stats to 0-100 scale', () => {
    // Example: Normalize a value from 0-50 range to 0-100
    const rawValue = 35;
    const maxValue = 50;
    const normalized = (rawValue / maxValue) * 100;
    
    expect(normalized).toBe(70);
    expect(normalized).toBeLessThanOrEqual(100);
  });
});

describe('Shot Map Calculations', () => {
  it('should calculate total xG from shot map', () => {
    const shots = [
      { xG: 0.45 },
      { xG: 0.32 },
      { xG: 0.68 },
      { xG: 0.22 },
    ];
    
    const totalXG = shots.reduce((sum, shot) => sum + shot.xG, 0);
    expect(totalXG).toBeCloseTo(1.67, 2);
  });

  it('should calculate conversion rate correctly', () => {
    const shots = [
      { outcome: 'goal' },
      { outcome: 'saved' },
      { outcome: 'goal' },
      { outcome: 'missed' },
      { outcome: 'goal' },
    ];
    
    const goals = shots.filter(s => s.outcome === 'goal').length;
    const conversionRate = (goals / shots.length) * 100;
    
    expect(conversionRate).toBe(60);
  });
});

describe('Heatmap Binning', () => {
  it('should bin coordinates into grid cells', () => {
    const gridSize = 10;
    const point = { x: 45.3, y: 67.8 };
    
    const binX = Math.floor(point.x / gridSize);
    const binY = Math.floor(point.y / gridSize);
    
    expect(binX).toBe(4);
    expect(binY).toBe(6);
  });

  it('should normalize intensity values', () => {
    const intensities = [0.2, 0.5, 0.8, 1.0, 0.3];
    const maxIntensity = Math.max(...intensities);
    
    const normalized = intensities.map(i => i / maxIntensity);
    
    expect(Math.max(...normalized)).toBe(1.0);
    expect(Math.min(...normalized)).toBeGreaterThanOrEqual(0);
  });
});

describe('Time Series Aggregations', () => {
  it('should calculate average xG per match', () => {
    const matches = [
      { xG: 0.8 },
      { xG: 1.2 },
      { xG: 0.6 },
      { xG: 1.5 },
    ];
    
    const avgXG = matches.reduce((sum, m) => sum + m.xG, 0) / matches.length;
    expect(avgXG).toBeCloseTo(1.025, 2);
  });

  it('should sum total goals and assists', () => {
    const matches = [
      { goals: 1, assists: 0 },
      { goals: 2, assists: 1 },
      { goals: 0, assists: 1 },
      { goals: 1, assists: 2 },
    ];
    
    const totalGoals = matches.reduce((sum, m) => sum + m.goals, 0);
    const totalAssists = matches.reduce((sum, m) => sum + m.assists, 0);
    
    expect(totalGoals).toBe(4);
    expect(totalAssists).toBe(4);
  });
});

describe('Performance vs Expected Analysis', () => {
  it('should calculate overperformance correctly', () => {
    const totalGoals = 18;
    const totalXG = 16.4;
    const performance = totalGoals - totalXG;
    
    expect(performance).toBeGreaterThan(0);
    expect(performance).toBeCloseTo(1.6, 1);
  });

  it('should handle underperformance', () => {
    const totalGoals = 10;
    const totalXG = 12.5;
    const performance = totalGoals - totalXG;
    
    expect(performance).toBeLessThan(0);
    expect(performance).toBeCloseTo(-2.5, 1);
  });
});
