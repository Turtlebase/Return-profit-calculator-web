
'use client';

import React from 'react';

interface Node {
  id: string;
  label: string;
  type?: 'input' | 'output';
}

interface Edge {
  from: string;
  to: string;
  label?: string;
}

interface FlowchartData {
  nodes: Node[];
  edges: Edge[];
}

interface FlowchartProps {
  title: string;
  data: FlowchartData;
}

const getNodeClasses = (type?: 'input' | 'output') => {
  let base = "border-2 rounded-lg p-4 text-center shadow-lg min-w-[180px] min-h-[80px] flex items-center justify-center transition-all duration-300";
  if (type === 'input') {
    return `${base} bg-green-500/10 border-green-500 text-green-300 transform -skew-x-12`;
  }
  if (type === 'output') {
    return `${base} bg-blue-500/10 border-blue-500 rounded-full`;
  }
  return `${base} bg-card border-border hover:shadow-primary/20 hover:border-primary`;
};

export function Flowchart({ title, data }: FlowchartProps) {
  return (
    <div className="my-12 p-6 bg-card/50 rounded-xl border border-border/50 shadow-2xl overflow-hidden">
      <h4 className="text-xl font-bold text-center mb-8 text-foreground">{title}</h4>
      <div className="flex flex-col items-center gap-8">
        {data.nodes.map((node) => (
          <React.Fragment key={node.id}>
            <div className={getNodeClasses(node.type)}>
              <p className="font-semibold text-sm">{node.label}</p>
            </div>
            {data.edges.find((edge) => edge.from === node.id) && (
              <div className="relative h-12 w-full flex items-center justify-center">
                <div className="absolute top-0 bottom-0 w-0.5 bg-border"></div>
                {data.edges
                  .filter((edge) => edge.from === node.id)
                  .map((edge) => (
                    <div key={`${edge.from}-${edge.to}`} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M12 5v14m-7-7h14" />
                       </svg>
                       {edge.label && <span className="text-xs text-muted-foreground mt-1 bg-background px-2 py-0.5 rounded-md">{edge.label}</span>}
                    </div>
                  ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
       <div className="mt-8 flex justify-around">
        {data.edges.map((edge) => {
            const fromNode = data.nodes.find(n => n.id === edge.from);
            const toNode = data.nodes.find(n => n.id === edge.to);
            if(!fromNode || !toNode || fromNode.type === 'output' || toNode.type === 'input') return null;

            if (edge.label) {
                return (
                    <div key={`${edge.from}-${edge.to}`} className="flex flex-col items-center text-center">
                        <p className="text-xs font-bold text-muted-foreground">{edge.label}</p>
                        <div className="h-8 w-px bg-border my-1"></div>
                        <div className={getNodeClasses(toNode.type)}>
                            <p className="font-semibold text-sm">{toNode.label}</p>
                        </div>
                    </div>
                )
            }
            return null;
        })}
       </div>
    </div>
  );
}
