import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { EditorPane } from './components/Editor/EditorPane';
import { ConsolePanel } from './components/Console/ConsolePanel';
import { SplitPane } from './components/Layout/SplitPane';
import { ProblemDescription } from './components/Problem/ProblemDescription';
import { mockExecuteCode, type MockApiResponse } from './utils/mockApi';

const INITIAL_CODE = `def solve(a, b):
    # Write your solution here
    return a + b

print(solve(5, 3))`;

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(INITIAL_CODE);
  
  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [response, setResponse] = useState<MockApiResponse | null>(null);
  
  // Dev toggles
  const [forceErrorMode, setForceErrorMode] = useState(false);

  // Initialize theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Run Code: Ctrl+Enter or Cmd+Enter
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('run-button')?.click();
      }
      
      // Command Palette: F1
      if (e.key === 'F1') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-command-palette'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const handleRun = async () => {
    setIsRunning(true);
    setResponse(null);
    try {
      const res = await mockExecuteCode(language, code, forceErrorMode);
      setResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        onRun={handleRun}
        isRunning={isRunning}
      />
      
      <main className="flex-1 overflow-hidden relative">
        <SplitPane
          problem={<ProblemDescription />}
          editor={
            <EditorPane 
              code={code} 
              setCode={setCode} 
              language={language}
              setLanguage={setLanguage}
              isDark={isDark}
            />
          }
          console={
            <ConsolePanel
              response={response}
              isLoading={isRunning}
              forceErrorMode={forceErrorMode}
              setForceErrorMode={setForceErrorMode}
            />
          }
        />
      </main>
    </div>
  );
}

export default App;
