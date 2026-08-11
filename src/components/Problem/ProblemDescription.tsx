import { FileText } from 'lucide-react';

export function ProblemDescription() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-secondary)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm font-semibold text-[var(--text-primary)]">
        <FileText className="w-4 h-4 text-blue-400" />
        <span>Description</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 font-sans text-[var(--text-primary)]">
        <h1 className="text-2xl font-bold mb-4">1. Two Sum</h1>
        <div className="flex gap-2 mb-6">
          <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">Easy</span>
        </div>
        
        <div className="prose prose-invert max-w-none text-sm leading-relaxed text-[var(--text-primary)]">
          <p className="mb-4">
            Given an array of integers <code className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--text-primary)] text-xs font-mono">nums</code> and an integer <code className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--text-primary)] text-xs font-mono">target</code>, return indices of the two numbers such that they add up to <code className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--text-primary)] text-xs font-mono">target</code>.
          </p>
          <p className="mb-4">
            You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
          </p>
          <p className="mb-8">
            You can return the answer in any order.
          </p>

          <div className="mb-8">
            <strong className="text-[var(--text-primary)] font-semibold mb-3 block">Example 1:</strong>
            <div className="bg-[var(--bg-primary)] border-l-4 border-[var(--lc-orange)] p-4 rounded-r-lg shadow-sm">
              <pre className="font-mono text-xs whitespace-pre-wrap">
                <span className="font-bold text-[var(--text-primary)]">Input:</span> nums = [2,7,11,15], target = 9<br/>
                <span className="font-bold text-[var(--text-primary)]">Output:</span> [0,1]<br/>
                <span className="font-bold text-[var(--text-primary)]">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].
              </pre>
            </div>
          </div>
          
          <div className="mb-6">
            <strong className="text-[var(--text-primary)] font-semibold mb-3 block">Constraints:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-[var(--text-secondary)]">
              <li><code className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--text-primary)] text-xs font-mono">2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
              <li><code className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--text-primary)] text-xs font-mono">-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
              <li><code className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--text-primary)] text-xs font-mono">-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
              <li><strong className="text-[var(--text-primary)]">Only one valid answer exists.</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
