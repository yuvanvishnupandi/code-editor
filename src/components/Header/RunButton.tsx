import { Play } from 'lucide-react';
import { useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface RunButtonProps {
  onRun: () => void;
  isRunning: boolean;
}

export function RunButton({ onRun, isRunning }: RunButtonProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isRunning) {
          onRun();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRun, isRunning]);

  return (
    <button
      onClick={onRun}
      disabled={isRunning}
      className={twMerge(
        clsx(
          'flex items-center gap-2 px-4 py-1.5 rounded-md font-medium text-sm text-white transition-all',
          isRunning
            ? 'bg-slate-500 cursor-not-allowed opacity-70'
            : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
        )
      )}
    >
      <Play className={clsx("w-4 h-4", isRunning && "animate-pulse")} />
      <span>{isRunning ? 'Running...' : 'Run Code'}</span>
      <div className="hidden sm:flex items-center gap-1 ml-2 pl-2 border-l border-white/20 text-xs text-white/80 font-mono">
        <span>Ctrl</span>+<span>Enter</span>
      </div>
    </button>
  );
}
