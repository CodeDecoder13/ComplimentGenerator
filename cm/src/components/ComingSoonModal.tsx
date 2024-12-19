interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 max-w-sm w-full shadow-2xl backdrop-blur-md animate-scale-up">
        <div className="flex flex-col items-center gap-6">
          <div className="text-6xl animate-bounce">🚀</div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
            Coming Soon!
          </h2>
          
          <p className="text-center text-gray-600 dark:text-gray-300">
            More exciting apps are on the way. Stay tuned!
          </p>
          
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full
                     hover:from-pink-600 hover:to-purple-600 transition-all duration-300
                     transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 