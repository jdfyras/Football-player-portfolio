import React from 'react';
import { Button } from './ui/button';
import { Eye, Menu } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface HeaderProps {
  colorBlindMode: boolean;
  onColorBlindToggle: (value: boolean) => void;
  visualVariant: 'energetic' | 'elegant' | 'sporty';
  onVariantChange: (value: 'energetic' | 'elegant' | 'sporty') => void;
  season: string;
  onSeasonChange: (value: string) => void;
}

export function Header({
  colorBlindMode,
  onColorBlindToggle,
  visualVariant,
  onVariantChange,
  season,
  onSeasonChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-[#253858]">Player Portfolio</h1>
            
            {/* Season Filter */}
            <div className="hidden md:flex items-center gap-2">
              <Label htmlFor="season-select" className="sr-only">
                Select Season
              </Label>
              <Select value={season} onValueChange={onSeasonChange}>
                <SelectTrigger id="season-select" className="w-[140px]">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/25">2024/25</SelectItem>
                  <SelectItem value="2023/24">2023/24</SelectItem>
                  <SelectItem value="2022/23">2022/23</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Visual Variant Selector */}
            <div className="hidden lg:flex items-center gap-2">
              <Label htmlFor="variant-select" className="text-sm text-muted-foreground">
                Style:
              </Label>
              <Select value={visualVariant} onValueChange={onVariantChange}>
                <SelectTrigger id="variant-select" className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  <SelectItem value="elegant">Elegant</SelectItem>
                  <SelectItem value="sporty">Sporty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Color Blind Mode Toggle */}
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Label htmlFor="colorblind-mode" className="sr-only">
                Enable color-blind friendly mode
              </Label>
              <Switch
                id="colorblind-mode"
                checked={colorBlindMode}
                onCheckedChange={onColorBlindToggle}
                aria-label="Toggle color-blind friendly mode"
              />
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Accessible
              </span>
            </div>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
