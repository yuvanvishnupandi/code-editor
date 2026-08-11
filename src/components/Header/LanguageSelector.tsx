import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LANGUAGES = [
  { id: 'python', name: 'Python' },
  { id: 'js', name: 'JS' },
  { id: 'java', name: 'Java' },
  { id: 'c++', name: 'C++' },
];

export function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (langId: string) => {
    setLanguage(langId);
    setIsOpen(false);
  };

  const displayLang = LANGUAGES.find(l => l.id === language)?.name || language;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded hover:bg-[var(--bg-tertiary)] transition-colors"
      >
        <span className="text-sm font-medium text-[var(--text-primary)]">{displayLang}</span>
        <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-32 rounded-md shadow-lg bg-[var(--bg-secondary)] ring-1 ring-black ring-opacity-5 border border-[var(--border-color)] z-50 overflow-hidden">
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleSelect(lang.id)}
                className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] flex items-center justify-between transition-colors"
              >
                <span>{lang.name}</span>
                {language === lang.id && (
                  <Check className="w-4 h-4 text-[var(--lc-green)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
