import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[450px] bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Editor Settings</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Appearance</h3>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-primary)] text-sm font-medium">Font Size</span>
              <select className="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md px-3 py-1.5 outline-none focus:border-[var(--lc-green)]">
                <option>12px</option>
                <option selected>14px</option>
                <option>16px</option>
                <option>18px</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-primary)] text-sm font-medium">Tab Size</span>
              <select className="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md px-3 py-1.5 outline-none focus:border-[var(--lc-green)]">
                <option>2 Spaces</option>
                <option selected>4 Spaces</option>
                <option>8 Spaces</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Keybindings</h3>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-primary)] text-sm font-medium">Editor Keymap</span>
              <select className="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md px-3 py-1.5 outline-none focus:border-[var(--lc-green)]">
                <option selected>Standard</option>
                <option>Vim</option>
                <option>Emacs</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-tertiary)] flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[var(--lc-green)] hover:opacity-90 text-white text-sm font-semibold rounded-lg transition-opacity"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
