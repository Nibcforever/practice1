
import React, { useState, useEffect, useCallback } from 'react';
import { Word } from './types';
import { CATEGORIES, DIFFICULTY_LEVELS } from './constants';
import { fetchFrenchWords } from './services/geminiService';
import Flashcard from './components/Flashcard';
import ControlPanel from './components/ControlPanel';
import Navigation from './components/Navigation';
import Loader from './components/Loader';
import { BookOpenIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [difficulty, setDifficulty] = useState<string>(DIFFICULTY_LEVELS[1]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchWords = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newWords = await fetchFrenchWords(category, difficulty);
      if (newWords.length === 0) {
        setError("Could not generate words. Please try a different category or difficulty.");
        setWords([]);
      } else {
        setWords(newWords);
        setCurrentIndex(0);
      }
    } catch (err) {
      setError('Failed to fetch words. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [category, difficulty]);

  useEffect(() => {
    handleFetchWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const currentWord = words[currentIndex];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpenIcon className="w-10 h-10 text-sky-500" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">French Flashcards AI</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">프랑스어 단어를 AI와 함께 배워보세요!</p>
        </header>

        <main className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8">
          <ControlPanel
            category={category}
            setCategory={setCategory}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            onFetchWords={handleFetchWords}
            isLoading={isLoading}
          />

          <div className="mt-8 h-64 flex items-center justify-center">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="text-center text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="font-semibold">An Error Occurred</p>
                <p>{error}</p>
              </div>
            ) : words.length > 0 && currentWord ? (
              <Flashcard
                key={currentIndex}
                frenchWord={currentWord.french}
                englishWord={currentWord.english}
              />
            ) : (
              <div className="text-center text-slate-500">
                <p>No words to display.</p>
                <p>Try generating a new set of words.</p>
              </div>
            )}
          </div>
          
          {words.length > 0 && !isLoading && !error && (
            <Navigation
              onPrev={handlePrev}
              onNext={handleNext}
              currentIndex={currentIndex}
              total={words.length}
            />
          )}
        </main>

        <footer className="text-center mt-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Powered by Gemini API
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
