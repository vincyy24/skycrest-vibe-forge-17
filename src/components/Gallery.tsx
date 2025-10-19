import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

// Media items configuration
const MEDIA_ITEMS = [
  { type: "video", lowSrc: "/src/assets/reels/reel1_low.mp4", highSrc: "/src/assets/reels/reel1_high.mp4" },
  { type: "video", lowSrc: "/src/assets/reels/reel2_low.mp4", highSrc: "/src/assets/reels/reel2_high.mp4" },
  { type: "image", src: "/src/assets/gallery-images/img1.webp" },
  { type: "image", src: "/src/assets/gallery-images/img2.webp" },
  { type: "image", src: "/src/assets/gallery-images/img3.webp" },
  { type: "image", src: "/src/assets/gallery-images/img4.webp" },
  { type: "image", src: "/src/assets/gallery-images/img5.webp" },
  { type: "image", src: "/src/assets/gallery-images/img6.webp" },
  { type: "image", src: "/src/assets/gallery-images/img7.webp" },
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
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
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
          video.play().catch(() => {});
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
    setZoomedMedia(index);
  };

  const closeZoom = () => {
    setZoomedMedia(null);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-background">
      {/* Vignette Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-center mb-12 neon-text">
          Gallery
        </h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {MEDIA_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_50%] transition-opacity duration-500 ${
                  index === selectedIndex ? "opacity-100" : "opacity-40"
                }`}
                onClick={() => handleMediaClick(index)}
              >
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden glass-card cursor-pointer hover:scale-105 transition-transform duration-300">
                  {item.type === "video" ? (
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={isHighQuality ? item.highSrc : item.lowSrc}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                      loop={false}
                      onEnded={handleVideoEnd}
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
