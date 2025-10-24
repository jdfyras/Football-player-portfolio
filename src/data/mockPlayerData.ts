// Mock API data structure for /api/player/{id}
export interface PlayerData {
  id: string;
  name: string;
  position: string;
  club: string;
  clubBadge: string;
  portrait: string;
  age: number;
  nationality: string;
  season: string;
  
  // Quick KPIs
  kpis: {
    goals: number;
    assists: number;
    matches: number;
    minutes: number;
    xG: number;
    xA: number;
    goalsP90: number;
    assistsP90: number;
  };
  
  // Physical stats
  physicals: {
    height: number; // cm
    weight: number; // kg
    topSpeed: number; // km/h
    distance: number; // km per match average
  };
  
  // Radar chart attributes (normalized 0-100)
  radar: {
    attacking: number;
    technical: number;
    physical: number;
    defending: number;
    creativity: number;
    aerial: number;
    positionAverage: {
      attacking: number;
      technical: number;
      physical: number;
      defending: number;
      creativity: number;
      aerial: number;
    };
  };
  
  // Heatmap data (pitch coordinates)
  heatmap: Array<{
    x: number; // 0-100 (left to right)
    y: number; // 0-100 (top to bottom)
    intensity: number; // 0-1
  }>;
  
  // Shot map data
  shotMap: Array<{
    x: number; // 0-100 (left to right)
    y: number; // 0-100 (top to bottom)
    xG: number; // 0-1
    outcome: 'goal' | 'saved' | 'missed' | 'blocked';
  }>;
  
  // Time series data
  timeSeries: Array<{
    matchday: number;
    date: string;
    opponent: string;
    xG: number;
    minutes: number;
    goals: number;
    assists: number;
  }>;
  
  // Matches for modal
  matches: Array<{
    id: string;
    date: string;
    opponent: string;
    result: string; // e.g., "W 3-1"
    minutes: number;
    goals: number;
    assists: number;
    rating: number;
    highlights?: string;
  }>;
  
  // Media gallery
  media: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    caption: string;
  }>;
}

export const mockPlayerData: PlayerData = {
  id: "player-001",
  name: "Sofia Martinez",
  position: "Forward",
  club: "FC Barcelona Femení",
  clubBadge: "https://images.unsplash.com/photo-1587987501183-33e43fdde781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  portrait: "https://images.unsplash.com/photo-1650501890232-886c08e79a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  age: 26,
  nationality: "Spain",
  season: "2024/25",
  
  kpis: {
    goals: 18,
    assists: 12,
    matches: 22,
    minutes: 1856,
    xG: 16.4,
    xA: 10.8,
    goalsP90: 0.87,
    assistsP90: 0.58,
  },
  
  physicals: {
    height: 168,
    weight: 62,
    topSpeed: 32.4,
    distance: 10.2,
  },
  
  radar: {
    attacking: 92,
    technical: 88,
    physical: 78,
    defending: 45,
    creativity: 85,
    aerial: 62,
    positionAverage: {
      attacking: 75,
      technical: 70,
      physical: 65,
      defending: 40,
      creativity: 72,
      aerial: 55,
    },
  },
  
  heatmap: Array.from({ length: 150 }, () => ({
    x: Math.random() * 60 + 40, // More activity in attacking half
    y: Math.random() * 100,
    intensity: Math.random() * 0.8 + 0.2,
  })),
  
  shotMap: [
    { x: 85, y: 35, xG: 0.45, outcome: 'goal' },
    { x: 88, y: 55, xG: 0.32, outcome: 'goal' },
    { x: 92, y: 48, xG: 0.68, outcome: 'goal' },
    { x: 78, y: 42, xG: 0.22, outcome: 'saved' },
    { x: 82, y: 60, xG: 0.15, outcome: 'missed' },
    { x: 90, y: 52, xG: 0.55, outcome: 'goal' },
    { x: 75, y: 38, xG: 0.18, outcome: 'blocked' },
    { x: 86, y: 44, xG: 0.41, outcome: 'saved' },
    { x: 94, y: 50, xG: 0.72, outcome: 'goal' },
    { x: 80, y: 35, xG: 0.28, outcome: 'saved' },
    { x: 89, y: 58, xG: 0.38, outcome: 'goal' },
    { x: 76, y: 45, xG: 0.12, outcome: 'blocked' },
    { x: 91, y: 40, xG: 0.51, outcome: 'goal' },
    { x: 83, y: 62, xG: 0.25, outcome: 'missed' },
    { x: 87, y: 36, xG: 0.48, outcome: 'goal' },
  ],
  
  timeSeries: [
    { matchday: 1, date: "2024-08-17", opponent: "Athletic Club", xG: 0.8, minutes: 90, goals: 1, assists: 0 },
    { matchday: 2, date: "2024-08-24", opponent: "Real Madrid", xG: 1.2, minutes: 90, goals: 2, assists: 1 },
    { matchday: 3, date: "2024-09-01", opponent: "Levante", xG: 0.6, minutes: 75, goals: 0, assists: 1 },
    { matchday: 4, date: "2024-09-15", opponent: "Valencia", xG: 1.5, minutes: 90, goals: 1, assists: 2 },
    { matchday: 5, date: "2024-09-22", opponent: "Sevilla", xG: 0.9, minutes: 82, goals: 1, assists: 0 },
    { matchday: 6, date: "2024-09-29", opponent: "Real Sociedad", xG: 1.1, minutes: 90, goals: 2, assists: 1 },
    { matchday: 7, date: "2024-10-06", opponent: "Atlético Madrid", xG: 0.4, minutes: 68, goals: 0, assists: 0 },
    { matchday: 8, date: "2024-10-20", opponent: "Villarreal", xG: 1.3, minutes: 90, goals: 1, assists: 1 },
    { matchday: 9, date: "2024-10-27", opponent: "Granada", xG: 1.7, minutes: 90, goals: 3, assists: 2 },
    { matchday: 10, date: "2024-11-03", opponent: "Betis", xG: 0.7, minutes: 85, goals: 1, assists: 0 },
    { matchday: 11, date: "2024-11-10", opponent: "Espanyol", xG: 1.0, minutes: 90, goals: 1, assists: 1 },
    { matchday: 12, date: "2024-11-24", opponent: "Getafe", xG: 0.8, minutes: 78, goals: 0, assists: 1 },
  ],
  
  matches: [
    {
      id: "match-001",
      date: "2024-11-24",
      opponent: "Getafe",
      result: "W 4-0",
      minutes: 78,
      goals: 0,
      assists: 1,
      rating: 7.8,
      highlights: "https://youtube.com/watch?v=example1"
    },
    {
      id: "match-002",
      date: "2024-11-10",
      opponent: "Espanyol",
      result: "W 3-1",
      minutes: 90,
      goals: 1,
      assists: 1,
      rating: 8.5,
      highlights: "https://youtube.com/watch?v=example2"
    },
    {
      id: "match-003",
      date: "2024-11-03",
      opponent: "Betis",
      result: "W 2-0",
      minutes: 85,
      goals: 1,
      assists: 0,
      rating: 8.2,
    },
  ],
  
  media: [
    {
      id: "media-001",
      type: "image",
      url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800",
      caption: "Match day at Camp Nou"
    },
    {
      id: "media-002",
      type: "image",
      url: "https://images.unsplash.com/photo-1650501890232-886c08e79a27?w=800",
      caption: "Training session"
    },
  ],
};
