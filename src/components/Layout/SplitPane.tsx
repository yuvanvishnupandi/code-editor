import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';

interface SplitPaneProps {
  problem: ReactNode;
  editor: ReactNode;
  console: ReactNode;
}

export function SplitPane({ problem, editor, console }: SplitPaneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <PanelGroup orientation={isMobile ? "vertical" : "horizontal"} className="h-full w-full bg-[var(--bg-primary)]">
      {/* Left Pane: Problem Description */}
      <Panel defaultSize={isMobile ? 30 : 40} minSize={20} className="bg-[var(--bg-secondary)] overflow-hidden">
        {problem}
      </Panel>

      <PanelResizeHandle className={`hover:bg-[var(--lc-green)] transition-colors flex-shrink-0 bg-[var(--border-color)] ${isMobile ? 'h-1 cursor-row-resize' : 'w-1 cursor-col-resize'}`} />

      {/* Right Pane: Code Editor & Console */}
      <Panel defaultSize={isMobile ? 70 : 60} minSize={30} className="bg-[var(--bg-secondary)] overflow-hidden">
        <PanelGroup orientation="vertical" className="h-full w-full">
          <Panel defaultSize={60} minSize={20} className="overflow-hidden flex flex-col">
            {editor}
          </Panel>

          <PanelResizeHandle className="h-1 hover:bg-[var(--lc-green)] transition-colors cursor-row-resize flex-shrink-0 bg-[var(--border-color)]" />

          <Panel defaultSize={40} minSize={10} className="overflow-hidden flex flex-col">
            {console}
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}
