import React from 'react';
import { PlayerData } from '../data/mockPlayerData';
import { Button } from './ui/button';
import { Download, Mail, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

interface HeroSectionProps {
  player: PlayerData;
  variant: 'energetic' | 'elegant' | 'sporty';
  onDownloadPDF: () => void;
}

export function HeroSection({ player, variant, onDownloadPDF }: HeroSectionProps) {
  const variantStyles = {
    energetic: {
      gradient: 'from-[#FF6B6B] to-[#FFC857]',
      accentColor: '#FF6B6B',
      textColor: 'text-white',
    },
    elegant: {
      gradient: 'from-[#253858] to-[#0E6B64]',
      accentColor: '#FFC857',
      textColor: 'text-white',
    },
    sporty: {
      gradient: 'from-[#0E6B64] to-[#253858]',
      accentColor: '#0E6B64',
      textColor: 'text-white',
    },
  };

  const style = variantStyles[variant];

  return (
    <div className={`relative bg-gradient-to-br ${style.gradient} overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <div className={`space-y-6 ${style.textColor}`}>
            <div className="space-y-2">
              <Badge 
                variant="secondary" 
                className="bg-white/20 backdrop-blur-sm text-white border-white/30"
              >
                Season {player.season}
              </Badge>
              <h1 
                className="text-5xl md:text-6xl"
                style={{ lineHeight: '1.1' }}
              >
                {player.name}
              </h1>
              <div className="flex items-center gap-3 text-xl opacity-90">
                <span>{player.position}</span>
                <span>•</span>
                <span>#{player.age}</span>
                <span>•</span>
                <span>{player.nationality}</span>
              </div>
            </div>

            {/* Club */}
            <div className="flex items-center gap-4 py-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2">
                <ImageWithFallback
                  src={player.clubBadge}
                  alt={`${player.club} badge`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-sm opacity-75">Current Club</div>
                <div className="text-xl">{player.club}</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                onClick={onDownloadPDF}
                size="lg"
                className="bg-white text-[#253858] hover:bg-white/90"
              >
                <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                Download PDF
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => window.location.href = 'mailto:contact@example.com'}
              >
                <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                Contact
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                Watch Highlights
              </Button>
            </div>
          </div>

          {/* Right: Portrait */}
          <div className="relative">
            <div 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
              style={{
                transform: 'perspective(1000px) rotateY(-5deg)',
              }}
            >
              <ImageWithFallback
                src={player.portrait}
                alt={`${player.name} portrait`}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-3xl">{player.kpis.goals}</div>
                    <div className="text-xs opacity-75">GOALS</div>
                  </div>
                  <div>
                    <div className="text-3xl">{player.kpis.assists}</div>
                    <div className="text-xs opacity-75">ASSISTS</div>
                  </div>
                  <div>
                    <div className="text-3xl">{player.kpis.matches}</div>
                    <div className="text-xs opacity-75">MATCHES</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div 
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
              style={{ backgroundColor: style.accentColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
