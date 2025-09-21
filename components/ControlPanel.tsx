
import React from 'react';
import { CATEGORIES, DIFFICULTY_LEVELS } from '../constants';
import { SparklesIcon } from './IconComponents';

interface ControlPanelProps {
  category: string;
  setCategory: (category: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  onFetchWords: () => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  category,
  setCategory,
  difficulty,
  setDifficulty,
  onFetchWords,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col">
        <label htmlFor="category" className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLoading}
          className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:opacity-50"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="difficulty" className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Difficulty</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isLoading}
          className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:opacity-50"
        >
          {DIFFICULTY_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col justify-end">
        <button
          onClick={onFetchWords}
          disabled={isLoading}
          className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          <SparklesIcon className="w-5 h-5" />
          {isLoading ? 'Generating...' : 'New Words'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
