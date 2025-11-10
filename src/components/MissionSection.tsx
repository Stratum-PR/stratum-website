import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const MissionSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [
    "/img/IMG_6772.jpeg",
    "/img/IMG_6837.jpeg",
    "/img/IMG_6847.jpeg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500); // fade out duration
    }, 7000); // 7 seconds (2 seconds slower than before)
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    if (index !== currentImageIndex) {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setFade(true);
      }, 500);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white via-secondary/5 to-white relative">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03] animate-gradient-flow pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(38, 106, 178, 0.1) 0%, transparent 50%)`,
        backgroundSize: '200% 200%'
      }}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-telegraf font-bold text-2xl md:text-3xl text-primary mb-4">
              {t('about.mission.title')}
            </h2>
            <p className="font-telegraf text-base text-gray-600 mb-4 leading-relaxed">
              {t('about.mission.description1')}
            </p>
            <p className="font-telegraf text-base text-gray-600 leading-relaxed">
              {t('about.mission.description2')}
            </p>
          </div>
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={images[currentImageIndex]}
                alt="Team collaboration"
                className={`w-full h-full object-cover transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 md:gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`!min-w-0 !min-h-0 w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] md:w-2 md:h-2 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
