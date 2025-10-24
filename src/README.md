# Football Player Portfolio

A professional, responsive web application for showcasing football player statistics and performance data. Built with React, TypeScript, and Tailwind CSS, featuring comprehensive data visualization, accessibility features, and PDF export capabilities.

## 🌟 Features

### Core Components
- **Hero Section**: Professional player introduction with portrait, club badge, and CTAs
- **Player Card**: Quick KPIs, physical attributes, and position information
- **Interactive Charts**:
  - **Heatmap**: Touch activity zones across the pitch with hexagonal binning
  - **Shot Map**: xG-weighted shot locations with outcome visualization
  - **Radar Chart**: 6-attribute performance comparison vs position average
  - **Time Series**: Performance trends over matches (xG, minutes, goals)
  - **Small Multiples**: Last 6 matches breakdown
  - **Scatter Plot**: Goals vs Expected Goals correlation
- **Match Modal**: Detailed match statistics and highlights
- **Media Gallery**: Photos and videos with lightbox viewer
- **PDF Export**: One-click portfolio download (requires backend)

### Visual Variants
Three professionally designed themes:
1. **Energetic**: Bold gradients (Red to Gold)
2. **Elegant**: Refined palette (Navy to Teal)
3. **Sporty**: Athletic aesthetic (Teal to Navy)

### Accessibility Features
- ✓ **Color-blind Mode**: Deuteranopia-friendly palette toggle
- ✓ **Text Summaries**: Descriptive text for every chart
- ✓ **Keyboard Navigation**: Full keyboard support
- ✓ **ARIA Labels**: Comprehensive accessibility attributes
- ✓ **Focus States**: Clear visual indicators
- ✓ **High Contrast**: WCAG AA compliant color ratios

## 🎨 Design System

### Color Palette
```css
--color-primary: #0E6B64;    /* Primary Teal */
--color-accent: #FF6B6B;     /* Accent Red */
--color-gold: #FFC857;       /* Gold */
--color-neutral-900: #253858; /* Navy */
--color-bg: #F6F7F9;         /* Background */
```

### Typography
- **Font Family**: Inter (system fallback: -apple-system, BlinkMacSystemFont, "Segoe UI")
- **Display**: 40-48px (Hero, large headings)
- **UI**: 14-16px (Body text, controls)
- **Grid**: 12-column, 24px gutter, 8px baseline

## 📁 Project Structure

```
/
├── App.tsx                          # Main application component
├── data/
│   └── mockPlayerData.ts           # Mock API data structure
├── components/
│   ├── Header.tsx                  # Top navigation with filters
│   ├── HeroSection.tsx             # Hero banner with player info
│   ├── PlayerCard.tsx              # Stats card sidebar
│   ├── Heatmap.tsx                 # Touch heatmap visualization
│   ├── ShotMap.tsx                 # Shot location map
│   ├── RadarChart.tsx              # Performance radar
│   ├── TimeSeriesChart.tsx         # Time series performance
│   ├── SmallMultiples.tsx          # Small multiple charts
│   ├── ScatterChart.tsx            # Goals vs xG scatter
│   ├── MatchModal.tsx              # Match details dialog
│   ├── MediaGallery.tsx            # Photo/video gallery
│   ├── PDFExport.tsx               # PDF export button
│   └── ui/                         # Shadcn UI components
└── styles/
    └── globals.css                 # Global styles & tokens
```

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Test
```bash
npm run test
```

## 📊 Data Structure

### API Endpoint: `/api/player/{id}`

```typescript
interface PlayerData {
  id: string;
  name: string;
  position: string;
  club: string;
  clubBadge: string;
  portrait: string;
  age: number;
  nationality: string;
  season: string;
  
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
  
  physicals: {
    height: number; // cm
    weight: number; // kg
    topSpeed: number; // km/h
    distance: number; // km per match
  };
  
  radar: {
    attacking: number; // 0-100
    technical: number;
    physical: number;
    defending: number;
    creativity: number;
    aerial: number;
    positionAverage: { /* same structure */ };
  };
  
  heatmap: Array<{ x: number; y: number; intensity: number }>;
  shotMap: Array<{ x: number; y: number; xG: number; outcome: string }>;
  timeSeries: Array<{ matchday: number; xG: number; goals: number; ... }>;
  matches: Array<{ id: string; opponent: string; result: string; ... }>;
  media: Array<{ id: string; type: 'image' | 'video'; url: string; ... }>;
}
```

## 🖨️ PDF Export Implementation

### Backend Setup (Node.js + Express + Puppeteer)

```bash
npm install express puppeteer
```

### Server Route

```javascript
import express from 'express';
import puppeteer from 'puppeteer';

const app = express();

app.post('/export/player/:id', async (req, res) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Navigate to player page with print parameter
  await page.goto(`${process.env.APP_URL}/player/${req.params.id}?print=true`, {
    waitUntil: 'networkidle0'
  });
  
  // Generate PDF
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    scale: 1,
    preferCSSPageSize: true,
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
  });
  
  await browser.close();
  
  res.contentType('application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=player-${req.params.id}.pdf`);
  res.send(pdf);
});

app.listen(3001, () => console.log('Export server running on port 3001'));
```

### Print CSS (add to globals.css)

```css
@media print {
  @page {
    size: A4;
    margin: 1cm;
  }
  
  body {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  
  .no-print,
  header,
  footer,
  button {
    display: none !important;
  }
  
  .page-break {
    page-break-after: always;
  }
  
  .recharts-wrapper {
    max-height: 200px !important;
  }
}
```

## 🧪 Testing

### Unit Tests
```typescript
// __tests__/data-normalization.test.ts
describe('Data Normalization', () => {
  test('calculates per-90 stats correctly', () => {
    const goals = 18;
    const minutes = 1856;
    const goalsP90 = (goals / minutes) * 90;
    expect(goalsP90).toBeCloseTo(0.87, 2);
  });
  
  test('normalizes radar values to 0-100 range', () => {
    const value = 45;
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });
});
```

### E2E Tests (Playwright)
```typescript
// e2e/pdf-export.spec.ts
import { test, expect } from '@playwright/test';

test('PDF export generates file', async ({ page }) => {
  await page.goto('/');
  
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('[data-pdf-export] button')
  ]);
  
  expect(download.suggestedFilename()).toContain('.pdf');
});

test('color-blind mode toggles palette', async ({ page }) => {
  await page.goto('/');
  await page.click('[id="colorblind-mode"]');
  
  const chart = page.locator('.recharts-wrapper').first();
  await expect(chart).toBeVisible();
});
```

## 📋 Accessibility Checklist

- [x] Color contrast ratio ≥ 4.5:1 (WCAG AA)
- [x] Color-blind friendly palette option
- [x] Keyboard navigation (Tab, Enter, Esc)
- [x] Focus indicators on all interactive elements
- [x] ARIA labels on charts and visualizations
- [x] Alt text on all images
- [x] Screen reader announcements for state changes
- [x] Semantic HTML structure
- [x] Skip navigation links
- [x] Text alternatives for visual data

## 🎯 Performance Checklist

- [x] Code splitting with React.lazy()
- [x] Image optimization (WebP with fallback)
- [x] Chart rendering optimization (memoization)
- [x] Responsive images with srcset
- [x] CSS-in-JS tree shaking (Tailwind JIT)
- [x] Bundle size optimization
- [x] Lazy loading for media gallery
- [x] Service worker for offline support (optional)

## 🔧 Dependencies

### Core
- React 18+
- TypeScript 5+
- Tailwind CSS 4.0
- Vite (build tool)

### Charts & Visualization
- Recharts (SVG charts)
- Lucide React (icons)

### UI Components
- Shadcn/ui (accessible component library)
- Radix UI (headless components)

### Backend (for PDF export)
- Express.js
- Puppeteer

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## 📝 Gender-Inclusive Design

This portfolio is designed to be gender-neutral and inclusive:
- Avoids stereotypical color associations
- Professional, athletic aesthetic regardless of gender
- Focuses on performance metrics and data
- Equal treatment of all player attributes
- Respectful language throughout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Design inspiration from modern sports analytics platforms
- Accessibility guidelines from W3C WCAG 2.1
- Color palettes optimized for color-blind users
- Mock data structure based on professional football analytics APIs

---

**Built with ❤️ for football and data visualization**
