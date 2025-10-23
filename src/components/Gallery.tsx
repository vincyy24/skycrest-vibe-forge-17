import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import media files
import reel1Low from "@/assets/reels/reel1_low.mp4";
import reel1High from "@/assets/reels/reel1_high.mp4";
import reel2Low from "@/assets/reels/reel2_low.mp4";
import reel2High from "@/assets/reels/reel2_high.mp4";
import img1 from "@/assets/gallery-images/img1.webp";
import img2 from "@/assets/gallery-images/img2.webp";
import img3 from "@/assets/gallery-images/img3.webp";
import img4 from "@/assets/gallery-images/img4.webp";
import img5 from "@/assets/gallery-images/img5.webp";
import img6 from "@/assets/gallery-images/img6.webp";
import img7 from "@/assets/gallery-images/img7.webp";
import reel1_poster from "@/assets/reels/thumbnails/reel1.png";
import reel2_poster from "@/assets/reels/thumbnails/reel2.png";
import NavigatorWithConnection from "@/types/NavigatorWithConnection";

// Media items configuration
const MEDIA_ITEMS = [
  { type: "video", lowSrc: reel1Low, highSrc: reel1High, poster: reel1_poster },
  { type: "video", lowSrc: reel2Low, highSrc: reel2High, poster: reel2_poster },
  { type: "image", src: img1 },
  { type: "image", src: img2 },
  { type: "image", src: img3 },
  { type: "image", src: img4 },
  { type: "image", src: img5 },
  { type: "image", src: img6 },
  { type: "image", src: img7 },
];

const Gallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomedMedia, setZoomedMedia] = useState<number | null>(null);
  const [isHighQuality, setIsHighQuality] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detect network quality
  useEffect(() => {
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      setIsHighQuality(effectiveType !== "slow-2g" && effectiveType !== "2g" && effectiveType !== "3g");
    }
  }, []);

  // Handle video playback based on active index
  const handleVideoPlayback = useCallback((index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index && MEDIA_ITEMS[i].type === "video") {
          video.play().catch(() => { });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, []);

  // Handle video end for auto-scroll
  const handleVideoEnd = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  // Auto-scroll logic
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      handleVideoPlayback(index);

      // Clear existing timeout
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }

      // Set auto-scroll based on media type
      if (MEDIA_ITEMS[index].type === "image") {
        autoScrollTimeout.current = setTimeout(() => {
          emblaApi.scrollNext();
        }, 3000);
      }
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }
    };
  }, [emblaApi, handleVideoPlayback]);

  const handleMediaClick = (index: number) => {
    // If clicked item is not the main/centered one, scroll to it first
    if (index !== selectedIndex && emblaApi) {
      emblaApi.scrollTo(index);
    } else {
      // Only zoom if it's already the main item
      setZoomedMedia(index);
    }
  };

  const closeZoom = () => {
    setZoomedMedia(null);
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="gallery" className="relative pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden bg-background">
      {/* Vignette Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-8 neon-text">
          Gallery
        </h2>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:border-primary/40"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:border-primary/40"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 md:gap-4 pl-3 md:pl-4">
            {MEDIA_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`flex-[0_0_45%] sm:flex-[0_0_35%] md:flex-[0_0_25%] lg:flex-[0_0_20%] transition-opacity duration-500 ${index === selectedIndex ? "opacity-100" : "opacity-40"
                  }`}
                onClick={() => handleMediaClick(index)}
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden glass-card cursor-pointer hover:scale-105 transition-transform duration-300">
                  {item.type === "video" ? (
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={isHighQuality ? item.highSrc : item.lowSrc}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                      loop={false}
                      onEnded={handleVideoEnd}
                      poster={item.poster}
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`Gallery item ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      <Dialog open={zoomedMedia !== null} onOpenChange={closeZoom}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-primary/20">
          <button
            onClick={closeZoom}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          {zoomedMedia !== null && (
            <div className="w-full h-full flex items-center justify-center p-4">
              {MEDIA_ITEMS[zoomedMedia].type === "video" ? (
                <video
                  src={isHighQuality ? MEDIA_ITEMS[zoomedMedia].highSrc : MEDIA_ITEMS[zoomedMedia].lowSrc}
                  className="max-w-full max-h-[90vh] rounded-lg"
                  controls
                  autoPlay
                  playsInline
                  poster={MEDIA_ITEMS[zoomedMedia].poster}
                  preload="metadata"
                />
              ) : (
                <img
                  src={MEDIA_ITEMS[zoomedMedia].src}
                  alt={`Gallery item ${zoomedMedia + 1}`}
                  className="max-w-full max-h-[90vh] rounded-lg object-contain"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
