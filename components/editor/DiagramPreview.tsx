'use client';

import { useEffect, useRef, useState } from 'react';

interface DiagramPreviewProps {
  content: string;
}

export default function DiagramPreview({ content }: DiagramPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mermaidLoaded, setMermaidLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load mermaid.js dynamically
    if (typeof window !== 'undefined' && !mermaidLoaded) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
      script.onload = () => {
        setMermaidLoaded(true);
        // Initialize mermaid with dark theme
        if (window.mermaid) {
          window.mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            themeVariables: {
              darkMode: true,
              background: '#0e0f1a',
              primaryColor: '#c9a84c',
              primaryTextColor: '#f0ede6',
              primaryBorderColor: '#1a1b2e',
              lineColor: '#6b6d7e',
              secondaryColor: '#1a1b2e',
              tertiaryColor: '#06070d',
            },
          });
        }
      };
      script.onerror = () => {
        setError('Failed to load Mermaid.js');
      };
      document.head.appendChild(script);
    }
  }, [mermaidLoaded]);

  useEffect(() => {
    if (!mermaidLoaded || !containerRef.current || !window.mermaid) return;

    const renderDiagrams = async () => {
      const container = containerRef.current;
      if (!container) return;
      try {
        // Extract mermaid code blocks
        const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
        const matches = Array.from(content.matchAll(mermaidRegex));

        if (matches.length === 0) {
          container.innerHTML = `
            <div class="text-center text-primary-secondary py-8">
              <p>Add Mermaid diagrams to see preview</p>
              <p class="text-xs mt-2">Use:</p>
              <pre class="text-xs mt-2 bg-surface-raised p-2 rounded">\`\`\`mermaid
graph TD
  A-->B
\`\`\`</pre>
            </div>
          `;
          return;
        }

        // Clear previous content
        container.innerHTML = '';

        // Render each diagram
        for (let i = 0; i < matches.length; i++) {
          const match = matches[i];
          const diagramCode = match[1].trim();
          const id = `mermaid-diagram-${Date.now()}-${i}`;

          try {
            // Generate SVG from mermaid code
            const { svg } = await window.mermaid.render(id, diagramCode);
            
            // Create container for this diagram
            const diagramContainer = document.createElement('div');
            diagramContainer.className = 'mb-6 p-4 bg-surface-raised rounded-lg border border-border-default';
            diagramContainer.innerHTML = svg;
            
            // Make SVG responsive
            const svgElement = diagramContainer.querySelector('svg');
            if (svgElement) {
              svgElement.style.maxWidth = '100%';
              svgElement.style.height = 'auto';
            }
            
            container.appendChild(diagramContainer);
          } catch (err) {
            console.error('Failed to render diagram:', err);
            const errorContainer = document.createElement('div');
            errorContainer.className = 'mb-4 p-4 bg-surface-raised rounded-lg border border-border-default';
            errorContainer.innerHTML = `
              <p class="text-red-400 text-sm">Failed to render diagram</p>
              <pre class="text-xs text-primary-secondary mt-2">${diagramCode}</pre>
            `;
            container.appendChild(errorContainer);
          }
        }
      } catch (err) {
        console.error('Error rendering diagrams:', err);
        setError('Failed to render diagrams');
      }
    };

    renderDiagrams();
  }, [content, mermaidLoaded]);

  return (
    <div className="h-full bg-surface-base border-l border-border-default flex flex-col">
      <div className="p-4 border-b border-border-default flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold text-primary-text">
          Diagram Preview
        </h3>
        {error && (
          <span className="text-xs text-red-400">{error}</span>
        )}
      </div>
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4">
        {!mermaidLoaded && (
          <div className="text-center text-primary-secondary py-8">
            <div className="animate-pulse">Loading Mermaid.js...</div>
          </div>
        )}
      </div>
    </div>
  );
}
