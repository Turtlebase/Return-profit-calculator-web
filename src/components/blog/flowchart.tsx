
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
    let base = "border-2 rounded-lg p-4 text-center shadow-lg min-w-[200px] min-h-[80px] flex items-center justify-center transition-all duration-300 mx-auto";
    if (type === 'input') {
      return `${base} bg-green-500/10 border-green-500/80 text-green-300 font-bold transform -skew-x-12`;
    }
    if (type === 'output') {
      return `${base} bg-blue-500/10 border-blue-500/80 rounded-full`;
    }
    return `${base} bg-card border-border hover:shadow-primary/20 hover:border-primary`;
  };
  
  const getEdgeClasses = (edge: Edge, index: number, total: number) => {
    const base = "absolute top-1/2 -translate-y-1/2 flex flex-col items-center w-1/3";
    const positions = ['left-0', 'left-1/3', 'left-2/3', 'right-0'];
    let positionClass = '';
    
    if (total === 1) positionClass = 'left-1/3';
    else if (total === 2) positionClass = index === 0 ? 'left-[16.67%]' : 'right-[16.67%]';
    else if (total === 3) positionClass = ['left-0', 'left-1/3', 'right-0'][index];
  
    return `${base} ${positionClass}`;
  };

export function Flowchart({ title, data }: FlowchartProps) {
    const fromNode = data.nodes.find(n => n.id === '3');
    if (!fromNode) return null;
  
    const childEdges = data.edges.filter(e => e.from === fromNode.id);
  
    return (
      <div className="my-12 p-6 bg-card/50 rounded-xl border border-border/50 shadow-2xl overflow-hidden">
        <h4 className="text-xl font-bold text-center mb-8 text-foreground">{title}</h4>
        <div className="space-y-4">
          {/* Render initial nodes */}
          {data.nodes.slice(0, 3).map((node) => (
            <React.Fragment key={node.id}>
              <div className={getNodeClasses(node.type)}>
                <p className="font-semibold text-sm">{node.label}</p>
              </div>
              {data.edges.find((edge) => edge.from === node.id && edge.to !== '4' && edge.to !== '5' && edge.to !== '6') && (
                <div className="relative h-12 w-full flex items-center justify-center">
                  <div className="absolute top-0 bottom-0 w-0.5 bg-border"></div>
                  <div className="absolute text-muted-foreground -bottom-2">&#x25BC;</div>
                </div>
              )}
            </React.Fragment>
          ))}
  
          {/* Fork section */}
          <div className="relative pt-12 mt-8">
            {/* Horizontal line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-12 w-0.5 bg-border"></div>
            <div className="absolute top-12 left-[15%] right-[15%] h-0.5 bg-border"></div>
  
            <div className="flex justify-around items-start">
              {childEdges.map((edge, index) => {
                const toNode = data.nodes.find(n => n.id === edge.to);
                if (!toNode) return null;
  
                return (
                  <div key={edge.to} className="w-1/3 px-2 flex flex-col items-center gap-2">
                     {/* Vertical connecting line */}
                    <div className="h-12 w-0.5 bg-border"></div>
                    <div className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-md border">{edge.label}</div>
                    <div className={getNodeClasses(toNode.type)}>
                      <p className="font-semibold text-sm">{toNode.label}</p>
                    </div>
                    {/* Arrow to final output */}
                    <div className="relative h-12 w-full flex items-center justify-center">
                        <div className="absolute top-0 bottom-0 w-0.5 bg-border"></div>
                        <div className="absolute text-muted-foreground -bottom-2">&#x25BC;</div>
                    </div>
                     <div className={getNodeClasses(data.nodes.find(n => n.id === data.edges.find(e => e.from === toNode.id)?.to)?.type)}>
                       <p className="font-semibold text-sm">{data.nodes.find(n => n.id === data.edges.find(e => e.from === toNode.id)?.to)?.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
