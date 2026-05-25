import { useEffect, useState } from "react";

interface UploadProgressBarProps {
  isUploading: boolean;
  onComplete?: () => void;
}

function UploadProgressBar({ isUploading, onComplete }: UploadProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isUploading) {
      setProgress(0);
      return;
    }

    // Simulate progressive upload
    const intervals = [
      { time: 100, value: 20 },
      { time: 300, value: 40 },
      { time: 500, value: 60 },
      { time: 700, value: 75 },
      { time: 900, value: 85 },
      { time: 1100, value: 95 },
    ];

    const timers = intervals.map(({ time, value }) =>
      setTimeout(() => setProgress(value), time)
    );

    return () => timers.forEach(clearTimeout);
  }, [isUploading]);

  useEffect(() => {
    if (progress === 100 && onComplete) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  if (!isUploading && progress === 0) return null;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>Uploading contact...</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default UploadProgressBar;
