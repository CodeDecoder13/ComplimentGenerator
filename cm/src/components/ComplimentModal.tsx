import { useState } from 'react';
import { MoodType, compliments } from '../data/compliments';

interface ComplimentModalProps {
  mood: MoodType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ComplimentModal({ mood, isOpen, onClose }: ComplimentModalProps) {
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  if (!isOpen || !mood) return null;

  const moodCompliments = compliments[mood];
  const currentCompliment = moodCompliments[complimentIndex];

  const getNewCompliment = () => {
    setIsChanging(true);
    setTimeout(() => {
      const nextIndex = (complimentIndex + 1) % moodCompliments.length;
      setComplimentIndex(nextIndex);
      setIsChanging(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center 
                    justify-center p-3 sm:p-4 z-50 animate-fade-in">
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 sm:p-8 
                    w-full max-w-[calc(100vw-32px)] sm:max-w-sm 
                    shadow-2xl backdrop-blur-md animate-scale-up">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent 
                       bg-gradient-to-r from-pink-600 to-purple-600">
            {mood}
          </h2>
          <p className={`text-center text-base sm:text-lg py-2 sm:py-4 
                      transition-opacity duration-300 
                      ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
            {currentCompliment}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={getNewCompliment}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 
                       bg-gradient-to-r from-pink-500 to-purple-500 text-white 
                       rounded-full hover:from-pink-600 hover:to-purple-600 
                       transition-all duration-300 transform hover:scale-105 
                       active:scale-95 shadow-lg text-sm sm:text-base"
            >
              Get Another Compliment
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 
                       border border-gray-300 dark:border-gray-600 rounded-full
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition-all 
                       duration-300 transform hover:scale-105 active:scale-95
                       text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 