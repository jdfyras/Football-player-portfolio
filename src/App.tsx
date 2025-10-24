import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PlayerCard } from './components/PlayerCard';
import { Heatmap } from './components/Heatmap';
import { ShotMap } from './components/ShotMap';
import { RadarChartComponent } from './components/RadarChart';
import { TimeSeriesChart } from './components/TimeSeriesChart';
import { SmallMultiples } from './components/SmallMultiples';
import { ScatterChart } from './components/ScatterChart';
import { MatchModal } from './components/MatchModal';
import { MediaGallery } from './components/MediaGallery';
import { PDFExport } from './components/PDFExport';
import { mockPlayerData, PlayerData } from './data/mockPlayerData';
import { Button } from './components/ui/button';
import { Award, Calendar } from 'lucide-react';
import { Card } from './components/ui/card';

export default function App() {
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [visualVariant, setVisualVariant] = useState<'energetic' | 'elegant' | 'sporty'>('elegant');
  const [season, setSeason] = useState('2024/25');
  const [selectedMatch, setSelectedMatch] = useState<PlayerData['matches'][0] | null>(null);

  const handleDownloadPDF = () => {
    // This would trigger the PDF export
    const exportComponent = document.querySelector('[data-pdf-export]');
    if (exportComponent) {
      (exportComponent as HTMLButtonElement).click();
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* Header */}
      <Header
        colorBlindMode={colorBlindMode}
        onColorBlindToggle={setColorBlindMode}
        visualVariant={visualVariant}
        onVariantChange={setVisualVariant}
        season={season}
        onSeasonChange={setSeason}
      />

      {/* Hero Section */}
      <HeroSection
        player={mockPlayerData}
        variant={visualVariant}
        onDownloadPDF={handleDownloadPDF}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Player Card */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <PlayerCard player={mockPlayerData} variant={visualVariant} />
              
              {/* Recent Matches */}
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-[#253858]">
                    <Calendar className="h-5 w-5" aria-hidden="true" />
                    Recent Matches
                  </h3>
                  <div className="space-y-2">
                    {mockPlayerData.matches.map((match) => (
                      <button
                        key={match.id}
                        onClick={() => setSelectedMatch(match)}
                        className="w-full p-3 rounded-lg border hover:border-[#0E6B64] hover:bg-[#0E6B64]/5 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-[#0E6B64] focus:ring-offset-2"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">vs {match.opponent}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            match.result.startsWith('W') 
                              ? 'bg-[#0E6B64] text-white' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {match.result}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span>•</span>
                          <span>{match.goals}G {match.assists}A</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3" aria-hidden="true" />
                            {match.rating}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* PDF Export */}
            <div data-pdf-export>
              <PDFExport 
                playerId={mockPlayerData.id} 
                playerName={mockPlayerData.name} 
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Heatmap */}
              <Heatmap 
                data={mockPlayerData.heatmap} 
                colorBlindMode={colorBlindMode}
              />

              {/* Shot Map */}
              <ShotMap 
                data={mockPlayerData.shotMap} 
                colorBlindMode={colorBlindMode}
              />
            </div>

            {/* Radar Chart - Full Width */}
            <RadarChartComponent 
              data={mockPlayerData.radar} 
              colorBlindMode={colorBlindMode}
            />

            {/* Time Series Chart */}
            <TimeSeriesChart 
              data={mockPlayerData.timeSeries} 
              colorBlindMode={colorBlindMode}
            />

            {/* Small Multiples */}
            <SmallMultiples 
              data={mockPlayerData.timeSeries} 
              colorBlindMode={colorBlindMode}
            />

            {/* Scatter Chart */}
            <ScatterChart 
              data={mockPlayerData.timeSeries} 
              colorBlindMode={colorBlindMode}
            />

            {/* Media Gallery */}
            <MediaGallery media={mockPlayerData.media} />

            {/* Visual Variant Showcase */}
            <Card className="p-6 bg-gradient-to-br from-[#0E6B64]/5 to-[#FF6B6B]/5">
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#253858]">Visual Variants</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose your preferred design style from the header
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setVisualVariant('energetic')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      visualVariant === 'energetic'
                        ? 'border-[#FF6B6B] bg-[#FF6B6B]/10'
                        : 'border-gray-200 hover:border-[#FF6B6B]/50'
                    }`}
                  >
                    <div className="w-full h-24 rounded bg-gradient-to-br from-[#FF6B6B] to-[#FFC857] mb-2" />
                    <div className="text-center">
                      <div>Energetic</div>
                      <div className="text-xs text-muted-foreground">Bold & Dynamic</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setVisualVariant('elegant')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      visualVariant === 'elegant'
                        ? 'border-[#FFC857] bg-[#FFC857]/10'
                        : 'border-gray-200 hover:border-[#FFC857]/50'
                    }`}
                  >
                    <div className="w-full h-24 rounded bg-gradient-to-br from-[#253858] to-[#0E6B64] mb-2" />
                    <div className="text-center">
                      <div>Elegant</div>
                      <div className="text-xs text-muted-foreground">Refined & Professional</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setVisualVariant('sporty')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      visualVariant === 'sporty'
                        ? 'border-[#0E6B64] bg-[#0E6B64]/10'
                        : 'border-gray-200 hover:border-[#0E6B64]/50'
                    }`}
                  >
                    <div className="w-full h-24 rounded bg-gradient-to-br from-[#0E6B64] to-[#253858] mb-2" />
                    <div className="text-center">
                      <div>Sporty</div>
                      <div className="text-xs text-muted-foreground">Athletic & Clean</div>
                    </div>
                  </button>
                </div>
              </div>
            </Card>

            {/* Accessibility Info */}
            <Card className="p-6 border-[#0E6B64] border-l-4">
              <div className="space-y-3">
                <h4>Accessibility Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0E6B64] mt-0.5">✓</span>
                    <span><strong>Color-blind mode:</strong> Toggle in header for deuteranopia-friendly palette</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0E6B64] mt-0.5">✓</span>
                    <span><strong>Text summaries:</strong> Every chart includes descriptive text for screen readers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0E6B64] mt-0.5">✓</span>
                    <span><strong>Keyboard navigation:</strong> All interactive elements are keyboard accessible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0E6B64] mt-0.5">✓</span>
                    <span><strong>ARIA labels:</strong> Comprehensive labels for assistive technologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0E6B64] mt-0.5">✓</span>
                    <span><strong>Focus states:</strong> Clear visual indicators for keyboard navigation</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Match Modal */}
      <MatchModal
        match={selectedMatch}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Football Player Portfolio • Season {season}</p>
            <p className="text-xs">
              Built with React, TypeScript, Tailwind CSS, and Recharts • Accessible & Print-Ready
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
