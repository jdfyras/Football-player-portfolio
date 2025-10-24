import React, { useState } from 'react';
import { Card } from './ui/card';
import { PlayerData } from '../data/mockPlayerData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent } from './ui/dialog';
import { Image, Video } from 'lucide-react';

interface MediaGalleryProps {
  media: PlayerData['media'];
}

export function MediaGallery({ media }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<PlayerData['media'][0] | null>(null);

  return (
    <>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-[#253858]">Media Gallery</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Photos and videos from matches and training
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {media.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0E6B64] focus:ring-offset-2"
                aria-label={`View ${item.type}: ${item.caption}`}
              >
                <ImageWithFallback
                  src={item.thumbnail || item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  {item.type === 'video' && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Video className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                  )}
                  {item.type === 'image' && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Media Viewer Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl">
          {selectedMedia && (
            <div className="space-y-4">
              {selectedMedia.type === 'image' ? (
                <ImageWithFallback
                  src={selectedMedia.url}
                  alt={selectedMedia.caption}
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Video className="h-16 w-16 text-muted-foreground" />
                  <p className="text-muted-foreground ml-4">Video player placeholder</p>
                </div>
              )}
              <p className="text-center text-sm text-muted-foreground">
                {selectedMedia.caption}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
