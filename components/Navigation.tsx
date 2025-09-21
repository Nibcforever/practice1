
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

const Navigation: React.FC<NavigationProps> = ({ onPrev, onNext, currentIndex, total }) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <div className="flex items-center justify-between mt-8">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="flex items-center justify-center gap-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2 px-4 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeftIcon className="w-5 h-5"/>
        Prev
      </button>
      <div className="text-slate-600 dark:text-slate-400 font-medium">
        {currentIndex + 1} / {total}
      </div>
      <button
        onClick={onNext}
        disabled={isLast}
        className="flex items-center justify-center gap-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2 px-4 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRightIcon className="w-5 h-5"/>
      </button>
    </div>
  );
};

export default Navigation;
