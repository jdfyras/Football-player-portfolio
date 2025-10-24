# Implementation Notes

## 🏗️ Architecture Overview

This Football Player Portfolio is built as a single-page React application with the following architecture:

### Frontend Stack
- **React 18**: Component-based UI with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling with custom design tokens
- **Recharts**: SVG-based chart library for data visualization
- **Shadcn/ui**: Accessible component library based on Radix UI

### Data Flow
```
Mock Data (mockPlayerData.ts)
    ↓
App Component (State Management)
    ↓
Child Components (Props)
    ↓
Charts & Visualizations
```

### Component Hierarchy
```
App.tsx
├── Header
│   ├── Season Filter
│   ├── Visual Variant Selector
│   └── Color-Blind Toggle
├── HeroSection
│   ├── Player Info
│   ├── Club Badge
│   └── CTA Buttons
├── PlayerCard (Sidebar)
│   ├── KPIs
│   ├── Physical Stats
│   └── Position Chips
├── Charts
│   ├── Heatmap
│   ├── ShotMap
│   ├── RadarChart
│   ├── TimeSeriesChart
│   ├── SmallMultiples
│   └── ScatterChart
├── MediaGallery
├── PDFExport
├── MatchModal (Conditional)
└── Footer
```

---

## 📊 Data Visualization Techniques

### Heatmap Implementation
**Algorithm**: Hexagonal Binning
- Grid size: 10x10 units
- Bins aggregate touch points within grid cells
- Intensity normalized to max value in dataset
- Color palette: Viridis (or color-blind friendly alternative)

```typescript
const bins = useMemo(() => {
  const gridSize = 10;
  const binMap = new Map<string, number>();
  
  data.forEach(point => {
    const binX = Math.floor(point.x / gridSize);
    const binY = Math.floor(point.y / gridSize);
    const key = `${binX},${binY}`;
    binMap.set(key, (binMap.get(key) || 0) + point.intensity);
  });
  
  return Array.from(binMap.entries());
}, [data]);
```

### Shot Map
**Features**:
- xG-weighted marker sizing (8-32px)
- Color coding by outcome (goal, saved, missed, blocked)
- Interactive tooltips on hover
- Positioned on attacking third of pitch only

### Radar Chart
**Normalization**:
- All values scaled 0-100
- Position average overlay for context
- 6 attributes: Attacking, Technical, Physical, Defending, Creativity, Aerial

### Time Series
**Chart Type**: Composed Chart (Bar + Line)
- Bars: Minutes played (right axis)
- Line: xG (left axis)
- X-axis: Matchday number
- Tooltip shows opponent and detailed stats

---

## 🎨 Design System Implementation

### Color Tokens
Defined in `styles/globals.css`:
```css
--color-primary: #0E6B64;    /* Teal */
--color-accent: #FF6B6B;     /* Red */
--color-gold: #FFC857;       /* Gold */
--color-neutral-900: #253858; /* Navy */
--color-bg: #F6F7F9;         /* Light Gray */
```

### Visual Variants
Three distinct themes controlled by state:

1. **Energetic**
   - Gradient: Red (#FF6B6B) → Gold (#FFC857)
   - Accent: Red
   - Use case: Bold, dynamic presentation

2. **Elegant** (Default)
   - Gradient: Navy (#253858) → Teal (#0E6B64)
   - Accent: Gold
   - Use case: Professional, refined

3. **Sporty**
   - Gradient: Teal (#0E6B64) → Navy (#253858)
   - Accent: Teal
   - Use case: Athletic, clean

### Typography
Using Tailwind's default typography with custom overrides:
- No custom font-size or font-weight classes (per guidelines)
- Relies on semantic HTML (h1, h2, h3, p) for styling
- Inter font family (system fallback available)

---

## ♿ Accessibility Implementation

### Color-Blind Mode
Palette changes when enabled:
```typescript
const colorBlindPalette = {
  primary: '#0077BB',   // Blue
  accent: '#EE7733',    // Orange
  tertiary: '#009988',  // Teal
  neutral: '#999999',   // Gray
};
```

### ARIA Labels
Every chart includes:
- `role="img"` on chart containers
- Descriptive `aria-label` with data summary
- Text summaries below each chart
- Keyboard-accessible interactive elements

### Focus Management
- Custom focus rings: `focus:ring-2 focus:ring-[#0E6B64]`
- Focus trap in modals
- Logical tab order
- Skip links (optional enhancement)

---

## 🖨️ PDF Export Architecture

### Frontend Component
`PDFExport.tsx` provides:
- UI button to trigger export
- Error handling
- Loading states
- Download file naming

### Backend Implementation
`server/export.js` provides:
- Express.js server on port 3001
- Puppeteer for headless Chrome
- PDF generation with custom settings
- CORS support for frontend calls

### PDF Generation Flow
```
1. User clicks "Download PDF"
2. Frontend calls POST /export/player/{id}
3. Backend launches Puppeteer
4. Navigates to player page with ?print=true
5. Waits for charts to render
6. Generates PDF (A4, 300dpi equivalent)
7. Returns PDF buffer to frontend
8. Frontend triggers download
```

### Print Optimization
Add to `globals.css`:
```css
@media print {
  @page { size: A4; margin: 1cm; }
  body { print-color-adjust: exact; }
  .no-print { display: none !important; }
  .recharts-wrapper { max-height: 200px !important; }
}
```

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)
Location: `/tests/data-normalization.test.ts`

**Coverage**:
- Per-90 calculations
- Radar normalization (0-100)
- Heatmap binning
- Shot map aggregations
- Time series calculations

### E2E Tests (Playwright)
Location: `/tests/e2e/portfolio.spec.ts`

**Scenarios**:
- Page load and render
- Color-blind mode toggle
- Visual variant switching
- Chart interactions
- Modal open/close
- Keyboard navigation
- Responsive breakpoints

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

---

## 📦 Build & Deployment

### Development
```bash
npm install
npm run dev
# Opens on http://localhost:5173
```

### Production Build
```bash
npm run build
# Output: /dist directory
```

### PDF Export Server
```bash
npm run export-server
# Opens on http://localhost:3001
```

### Deployment Options

**Frontend**:
- Vercel (recommended)
- Netlify
- AWS Amplify
- GitHub Pages

**Backend (PDF Export)**:
- Railway.app
- Render.com
- Heroku
- AWS Lambda + API Gateway

### Environment Variables
```env
# Frontend
VITE_API_URL=https://api.example.com
VITE_EXPORT_URL=https://export.example.com

# Backend
PORT=3001
APP_URL=https://your-app.com
NODE_ENV=production
```

---

## 🔧 Customization Guide

### Adding New Chart Types

1. Create component in `/components/`
```typescript
import { Card } from './ui/card';
import { ResponsiveContainer, /* chart type */ } from 'recharts';

export function NewChart({ data, colorBlindMode }) {
  return (
    <Card className="p-6">
      <ResponsiveContainer width="100%" height={300}>
        {/* Chart implementation */}
      </ResponsiveContainer>
    </Card>
  );
}
```

2. Add to App.tsx
```typescript
import { NewChart } from './components/NewChart';
// ...
<NewChart data={mockPlayerData.newData} colorBlindMode={colorBlindMode} />
```

### Extending Data Structure

1. Update `mockPlayerData.ts` interface
```typescript
export interface PlayerData {
  // ... existing fields
  newMetric: {
    value: number;
    rank: number;
  };
}
```

2. Add mock data
```typescript
export const mockPlayerData: PlayerData = {
  // ... existing data
  newMetric: {
    value: 85,
    rank: 12,
  },
};
```

### Adding New Visual Variant

1. Update variant type in App.tsx
```typescript
type VisualVariant = 'energetic' | 'elegant' | 'sporty' | 'newVariant';
```

2. Add variant styles in HeroSection.tsx
```typescript
const variantStyles = {
  // ... existing variants
  newVariant: {
    gradient: 'from-[#COLOR1] to-[#COLOR2]',
    accentColor: '#COLOR',
    textColor: 'text-white',
  },
};
```

---

## 🚀 Performance Optimizations

### Implemented
- ✅ React.memo on expensive components
- ✅ useMemo for chart data transformations
- ✅ Code splitting (potential with React.lazy)
- ✅ Optimized Recharts rendering
- ✅ Tailwind JIT compilation

### Potential Enhancements
- [ ] Virtual scrolling for match list
- [ ] Service Worker for offline support
- [ ] Dynamic imports for chart libraries
- [ ] Image lazy loading with Intersection Observer
- [ ] Debounced filter inputs

---

## 🐛 Known Limitations & Future Enhancements

### Current Limitations
1. **Mock Data Only**: No real API integration
2. **Single Player**: No player comparison view
3. **No Authentication**: Public portfolio only
4. **Static Season**: No historical season switching
5. **PDF Backend Required**: Needs separate server

### Planned Enhancements
1. **API Integration**
   - Connect to real football analytics API
   - Dynamic data fetching
   - Real-time updates

2. **Player Comparison**
   - Side-by-side radar charts
   - Stat comparisons
   - Position-based filtering

3. **Advanced Filters**
   - Date range selection
   - Competition filtering
   - Home/Away splits

4. **Social Features**
   - Share portfolio link
   - Embed charts on external sites
   - Social media cards

5. **Admin Panel**
   - Upload player data
   - Manage media gallery
   - Customize themes

---

## 📖 API Integration Guide

### Expected API Structure

**Endpoint**: `GET /api/player/{id}`

**Response**:
```json
{
  "id": "player-001",
  "name": "Player Name",
  "position": "Forward",
  "club": "Club Name",
  "season": "2024/25",
  "kpis": { /* stats */ },
  "physicals": { /* attributes */ },
  "radar": { /* performance metrics */ },
  "heatmap": [ /* touch points */ ],
  "shotMap": [ /* shot data */ ],
  "timeSeries": [ /* match history */ ],
  "matches": [ /* recent matches */ ],
  "media": [ /* gallery items */ ]
}
```

### Integration Steps

1. Create API client
```typescript
// api/client.ts
export async function fetchPlayerData(id: string): Promise<PlayerData> {
  const response = await fetch(`${API_URL}/player/${id}`);
  return response.json();
}
```

2. Use in App component
```typescript
const [playerData, setPlayerData] = useState<PlayerData | null>(null);

useEffect(() => {
  fetchPlayerData('player-001').then(setPlayerData);
}, []);
```

3. Add loading and error states
```typescript
if (!playerData) return <Loading />;
if (error) return <Error message={error.message} />;
```

---

## 🤝 Contributing Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write descriptive commit messages

### Pull Request Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Run tests: `npm test`
5. Run linter: `npm run lint`
6. Commit: `git commit -m 'Add new feature'`
7. Push: `git push origin feature/new-feature`
8. Create Pull Request with description

### Component Guidelines
- One component per file
- Export as named export
- Include TypeScript interfaces for props
- Add ARIA labels for accessibility
- Include JSDoc comments for complex logic

---

## 📞 Support & Resources

### Documentation
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Docs](https://recharts.org)
- [Shadcn/ui Docs](https://ui.shadcn.com)

### Community
- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: Questions and community support

### License
MIT License - Free for personal and commercial use

---

**Last Updated**: October 24, 2025  
**Version**: 1.0.0  
**Maintainer**: Football Analytics Team
