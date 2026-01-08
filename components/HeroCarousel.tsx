import React, { useState, useEffect } from 'react';

interface HeroCarouselProps {
  images: string[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Slightly faster rotation (4 seconds)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-linear ${
              index === currentIndex ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>
      ))}
      {/* Overlay is now handled in App.tsx for better layering control */}
    </div>
  );
};