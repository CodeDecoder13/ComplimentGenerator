import { useState } from "react";
import { Geist } from "next/font/google";
import { MoodType } from "../data/compliments";
import ComplimentModal from "../components/ComplimentModal";
import AnimatedBackground from "../components/AnimatedBackground";
import Sidebar from "../components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const moodButtons = [
  { mood: "Happy" as MoodType, emoji: "😊" },
  { mood: "Feeling Down" as MoodType, emoji: "😔" },
  { mood: "Excited" as MoodType, emoji: "🎉" },
  { mood: "Stressed" as MoodType, emoji: "😵" },
  { mood: "Loved" as MoodType, emoji: "💕" },
  { mood: "Sleepy" as MoodType, emoji: "😴" },
];

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoodClick = (mood: MoodType) => {
    setSelectedMood(mood);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMood(null);
  };

  return (
    <div className={`${geistSans.variable} min-h-screen font-[family-name:var(--font-geist-sans)] relative`}>
      <AnimatedBackground />
      <Sidebar />
      
      <main className="w-full min-h-screen p-4 pt-16 sm:p-6 md:p-8 
                     md:ml-16 lg:ml-64 transition-all duration-300
                     flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center space-y-4 mb-8 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-pink-600 to-purple-600 
                         dark:from-pink-400 dark:to-purple-400 animate-title
                         leading-tight mx-auto max-w-3xl">
              Mood-Based Compliment Generator
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 animate-fade-in
                       mt-4 mx-auto">
              Select your mood and receive a heartfelt compliment 💖
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 
                        w-full max-w-2xl mx-auto">
            {moodButtons.map(({ mood, emoji }, index) => (
              <button
                key={mood}
                onClick={() => handleMoodClick(mood)}
                className="group p-4 sm:p-6 rounded-xl backdrop-blur-sm bg-white/50 
                          dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 
                          transition-all duration-300 border border-white/20 
                          dark:border-gray-700/50 shadow-lg hover:shadow-xl 
                          hover:-translate-y-1 animate-fade-in
                          min-h-[120px] flex items-center justify-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <span className="text-4xl sm:text-5xl group-hover:scale-110 
                                transition-transform duration-300">
                    {emoji}
                  </span>
                  <span className="text-sm sm:text-base font-medium 
                                text-gray-700 dark:text-gray-200">
                    {mood}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <ComplimentModal
        mood={selectedMood}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
