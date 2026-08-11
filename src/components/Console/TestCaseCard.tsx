import { CheckCircle, XCircle } from 'lucide-react';
import type { MockResult } from '../../utils/mockApi';

interface TestCaseCardProps {
  result: MockResult;
}

export function TestCaseCard({ result }: TestCaseCardProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md font-mono text-sm">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 mb-1">
        <div className="flex items-center gap-2">
          {result.passed ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500" />
          )}
          <span className="font-semibold">Test Case: {result.testCaseId}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          <span>{result.executionTimeMs} ms</span>
          <span>{(result.memoryUsedKb / 1024).toFixed(2)} MB</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 text-[var(--text-primary)]">
        <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Output:</span>
        <div className="px-2 py-1.5 bg-[var(--bg-secondary)] rounded border border-[var(--border-color)]">
          {result.actualOutput}
        </div>
      </div>
    </div>
  );
}
