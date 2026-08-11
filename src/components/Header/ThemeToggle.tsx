import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function ThemeToggle({ isDark, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border-color)] transition-colors"
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[var(--text-secondary)] hover:text-amber-400 transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--text-secondary)] hover:text-slate-900 transition-colors" />
      )}
    </button>
  );
}
