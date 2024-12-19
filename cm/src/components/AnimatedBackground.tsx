export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950" />
      
      {/* Floating circles */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-200/30 dark:bg-pink-800/30 rounded-full blur-xl animate-float" />
      <div className="absolute top-3/4 left-2/3 w-40 h-40 bg-purple-200/30 dark:bg-purple-800/30 rounded-full blur-xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-200/30 dark:bg-blue-800/30 rounded-full blur-xl animate-float-slow" />
    </div>
  );
} 