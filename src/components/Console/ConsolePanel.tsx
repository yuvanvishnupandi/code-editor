import { Terminal, Bug, CheckSquare, ChevronRight } from 'lucide-react';
import { infinity } from 'ldrs';
import type { MockApiResponse } from '../../utils/mockApi';

// Register the web component
if (typeof window !== 'undefined') {
  infinity.register();
}

interface ConsolePanelProps {
  response: MockApiResponse | null;
  isLoading: boolean;
  forceErrorMode: boolean;
  setForceErrorMode: (val: boolean) => void;
}

export function ConsolePanel({
  response,
  isLoading,
  forceErrorMode,
  setForceErrorMode,
}: ConsolePanelProps) {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-console)] overflow-hidden">
      {/* Console Header Tabs */}
      <div className="flex items-center justify-between bg-[var(--bg-secondary)] text-sm font-semibold text-[var(--text-secondary)] border-b border-[var(--border-color)]">
        <div className="flex items-center">
          <div className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--bg-tertiary)] cursor-pointer transition-colors border-r border-[var(--border-color)]">
            <CheckSquare className="w-4 h-4 text-green-500" />
            <span>Testcase</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-[var(--text-primary)] border-b-2 border-[var(--text-primary)] bg-[var(--bg-console)]">
            <ChevronRight className="w-4 h-4 text-green-500" />
            <span>Test Result</span>
          </div>
        </div>
        <div className="px-2">
          <button
            onClick={() => setForceErrorMode(!forceErrorMode)}
            className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium border rounded transition-colors ${
              forceErrorMode
                ? 'bg-red-500/10 text-red-500 border-red-500/30'
                : 'bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-tertiary)]'
            }`}
            title="Toggle to test the Error State mock"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>Mock Error</span>
          </button>
        </div>
      </div>

      {/* Console Content */}
      <div className="flex-1 overflow-y-auto p-4 text-sm font-mono text-[var(--text-primary)]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <l-infinity
              size="55"
              stroke="4"
              stroke-length="0.15"
              bg-opacity="0.1"
              speed="1.3"
              color="var(--text-primary)"
            ></l-infinity>
            <div className="flex flex-col items-center gap-1 mt-2">
              <h3 className="text-[var(--text-primary)] font-medium text-base">Executing Testcases...</h3>
              <p className="text-[var(--text-secondary)] text-xs">Waiting for Xyzon Backend</p>
            </div>
          </div>
        ) : !response ? (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)] font-sans gap-3">
            <div className="bg-[var(--bg-secondary)] p-4 rounded-full border border-[var(--border-color)]">
              <Terminal className="w-8 h-8 opacity-50" />
            </div>
            <p className="font-medium">Run your code to see results</p>
          </div>
        ) : response.status === 'COMPILE_ERROR' ? (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold font-sans" style={{ color: 'var(--lc-red)' }}>Compile Error</h2>
            <div className="p-4 rounded-md whitespace-pre-wrap break-all border" style={{ backgroundColor: 'color-mix(in srgb, var(--lc-red) 10%, transparent)', color: 'var(--lc-red)', borderColor: 'color-mix(in srgb, var(--lc-red) 20%, transparent)' }}>
              {response.error}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 font-sans">
            <h2 className="font-bold text-lg" style={{ color: response.overallResult === 'PASS' ? 'var(--lc-green)' : 'var(--lc-red)' }}>
              {response.overallResult === 'PASS' ? 'Accepted' : 'Wrong Answer'}
            </h2>
            
            <div className="flex flex-col gap-6">
              {response.results.map((res, idx) => {
                const isPass = res.passed;
                return (
                  <div key={res.testCaseId} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-sm">Case {idx + 1}</span>
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" 
                        style={{ 
                          backgroundColor: isPass ? 'color-mix(in srgb, var(--lc-green) 15%, transparent)' : 'color-mix(in srgb, var(--lc-red) 15%, transparent)',
                          color: isPass ? 'var(--lc-green)' : 'var(--lc-red)'
                        }}
                      >
                        {isPass ? 'Passed' : 'Failed'}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] ml-auto">
                        {res.executionTimeMs}ms • {(res.memoryUsedKb / 1024).toFixed(1)}MB
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      {/* Input */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">Input</span>
                        <div className="px-3 py-2 bg-[var(--bg-secondary)] rounded-lg font-mono text-sm border border-[var(--border-color)] whitespace-pre-wrap">
                          {res.input || 'N/A'}
                        </div>
                      </div>
                      
                      {/* Expected Output */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">Expected Output</span>
                        <div className="px-3 py-2 bg-[var(--bg-secondary)] rounded-lg font-mono text-sm border border-[var(--border-color)] whitespace-pre-wrap">
                          {res.expectedOutput || 'N/A'}
                        </div>
                      </div>

                      {/* Actual Output */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">Actual Output</span>
                        <div className="px-3 py-2 bg-[var(--bg-secondary)] rounded-lg font-mono text-sm border border-[var(--border-color)] whitespace-pre-wrap">
                          {res.actualOutput}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
