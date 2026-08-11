import { useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { CodeXml } from 'lucide-react';
import { LanguageSelector } from '../Header/LanguageSelector';

interface EditorPaneProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  isDark: boolean;
}

export function EditorPane({ code, setCode, language, setLanguage, isDark }: EditorPaneProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const handleOpenCommandPalette = () => {
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.trigger('anyString', 'editor.action.quickCommand', null);
      }
    };

    window.addEventListener('open-command-palette', handleOpenCommandPalette);
    return () => window.removeEventListener('open-command-palette', handleOpenCommandPalette);
  }, []);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  // Map our language names to monaco language ids
  const getMonacoLanguage = (lang: string) => {
    const map: Record<string, string> = {
      'c++': 'cpp',
      'python3': 'python',
      'c#': 'csharp',
    };
    return map[lang.toLowerCase()] || lang.toLowerCase();
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] shrink-0 text-sm font-semibold text-[var(--text-primary)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[var(--lc-green)]">
            <CodeXml className="w-4 h-4" />
            <span>Editor</span>
          </div>
          <div className="w-px h-4 bg-[var(--border-color)]"></div>
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>
      </div>
      
      <div className="flex-1 relative bg-[var(--bg-primary)] min-h-0">
        <MonacoEditor
          height="100%"
          language={getMonacoLanguage(language)}
          theme={isDark ? 'vs-dark' : 'light'}
          value={code}
          onChange={(val) => setCode(val || '')}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'var(--font-mono)',
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
            renderLineHighlight: 'all',
            lineNumbersMinChars: 3,
            lineDecorationsWidth: 10,
            contextmenu: false,
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            }
          }}
          loading={
            <div className="flex items-center justify-center h-full text-[var(--text-secondary)]">
              Loading editor...
            </div>
          }
        />
      </div>
    </div>
  );
}
