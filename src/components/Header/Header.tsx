import { useState } from 'react';
import { SquareTerminal, Zap, Send, Sun, Moon, Settings, Search } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  onRun: () => void;
  isRunning: boolean;
}

export function Header({ isDark, toggleTheme, onRun, isRunning }: HeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="relative flex items-center justify-between px-2 sm:px-4 h-12 md:h-14 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] shrink-0 overflow-x-auto no-scrollbar">
        {/* Left: Logo & Problem List */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2 text-[var(--lc-orange)] font-bold text-lg">
            <SquareTerminal className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] cursor-pointer transition-colors">
            <span className="hidden sm:inline">Challenges</span>
          </div>

          {/* Search / Command Palette Trigger */}
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="ml-2 sm:ml-4 flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all group"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-xs font-medium">Search Commands</span>
            <div className="hidden sm:flex items-center gap-0.5 ml-2">
              <kbd className="font-mono text-[9px] px-1 bg-[var(--bg-secondary)] rounded border border-[var(--border-color)] group-hover:border-[var(--text-secondary)] transition-colors">F1</kbd>
            </div>
          </button>
        </div>

        {/* Center: Run & Submit Actions */}
        <div className="flex items-center gap-1 sm:gap-2 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <button
            id="run-button"
            onClick={onRun}
            disabled={isRunning}
            title="Run Code (Ctrl + Enter)"
            className={twMerge(
              clsx(
                'group relative flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg font-medium text-sm transition-all',
                isRunning
                  ? 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] cursor-not-allowed'
                  : 'bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] text-[var(--text-primary)]'
              )
            )}
          >
            <Zap className={clsx("w-4 h-4 text-[var(--text-secondary)]", isRunning && "animate-pulse")} />
            <span className="hidden sm:inline">Run</span>
            
            {/* Tooltip */}
            <div className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Run Code <kbd className="font-mono bg-[var(--text-secondary)] text-[var(--bg-primary)] px-1 rounded ml-1">Ctrl</kbd>+<kbd className="font-mono bg-[var(--text-secondary)] text-[var(--bg-primary)] px-1 rounded ml-0.5">Enter</kbd>
            </div>
          </button>
          <button
            onClick={onRun}
            disabled={isRunning}
            className={twMerge(
              clsx(
                'flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg font-medium text-sm transition-all text-[var(--lc-green)] bg-[var(--lc-green)] bg-opacity-10 hover:bg-opacity-20',
                isRunning && 'cursor-not-allowed opacity-50'
              )
            )}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Submit Solution</span>
          </button>
        </div>

        {/* Right: Settings & Theme */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}
