
import React, { useState, useEffect } from 'react';

interface FlashcardProps {
  frenchWord: string;
  englishWord: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ frenchWord, englishWord }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [frenchWord]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full h-full cursor-pointer group"
      onClick={handleFlip}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front of the card (French) */}
        <div className="absolute w-full h-full bg-white dark:bg-slate-700 border-2 border-sky-200 dark:border-sky-800 rounded-lg flex flex-col items-center justify-center p-6 text-center shadow-md" style={{ backfaceVisibility: 'hidden' }}>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">French</p>
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white">{frenchWord}</h2>
          <p className="absolute bottom-4 text-xs text-slate-400 dark:text-slate-500">Click to flip</p>
        </div>

        {/* Back of the card (English) */}
        <div className="absolute w-full h-full bg-sky-100 dark:bg-sky-900/50 border-2 border-sky-200 dark:border-sky-800 rounded-lg flex flex-col items-center justify-center p-6 text-center shadow-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <p className="text-sm text-sky-600 dark:text-sky-400 mb-4">English</p>
          <h2 className="text-4xl font-semibold text-sky-800 dark:text-sky-200">{englishWord}</h2>
          <p className="absolute bottom-4 text-xs text-sky-500 dark:text-sky-600">Click to flip</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
