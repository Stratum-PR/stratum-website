import React, { useState, useEffect } from 'react';

interface RotatingTextProps {
  words: string[];
  colors?: string[];
  className?: string;
  baseText?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  words,
  colors = ['#E6E08E', '#266AB2', '#1E2B7E'], // accent, secondary, primary
  className = '',
  baseText = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  const currentColor = colors[currentWordIndex % colors.length];
  
  // Find the longest word to set minimum width (only on desktop)
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), '');
  const desktopMinWidth = `${longestWord.length * 0.7}ch`;

  return (
    <span className={className} style={{ display: 'block' }}>
      {baseText && <span style={{ display: 'block' }} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light">{baseText}</span>}
      <span 
        style={{ 
          color: currentColor, 
          display: 'block',
          height: '1.2em',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }} 
        className="font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight"
      >
        <style>{`
          @media (min-width: 768px) {
            .rotating-text-container {
              min-width: ${desktopMinWidth};
            }
          }
        `}</style>
        <span className="rotating-text-container" style={{ display: 'inline-block' }}>
          {currentText || '\u00A0'} {/* Non-breaking space when empty to maintain height */}
          <span className="animate-pulse opacity-70" style={{ color: currentColor }}>|</span>
        </span>
      </span>
    </span>
  );
};

export default RotatingText;

